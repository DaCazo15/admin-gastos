<script setup>
  import { ref, reactive, watch, computed, onMounted } from 'vue';
  import { generarID } from './helpers';
  // import { obtenerTasa } from './helpers/data'
  import Presupuesto from './components/Presupuesto.vue';
  import ControlPresupuesto from './components/ControlPresupuesto.vue';
  import Gastos from './components/Gastos.vue';
  import Modal from './components/Modal.vue';
  import Filtro from './components/Filtro.vue';
  import Boton from './components/Boton.vue';

  const presupuesto = ref(0);
  const disponible = ref(0);
  const totalGasto = ref(0);
  const totalAhorro = ref(0);
  // const tasa = ref(null)
  const gastos = ref([]);
  const filtro = ref('');
  // console.log(tasa.value);
  // onMounted(async () => {
  //   tasa.value = await obtenerTasa()
  // })

  

  const modal = reactive({
    mostrar: false,
    animar: false
  });

  watch(
    gastos,
    (nuevoGastos) => {
      localStorage.setItem('gastos', JSON.stringify(gastos.value));
      const { totalGasto: tg, totalAhorro: ta } = nuevoGastos.reduce((acc, gasto) => {
          gasto.categoria === 'ahorro' ? 
          acc.totalAhorro += Number(gasto.cantidad) :
          acc.totalGasto += Number(gasto.cantidad);
          return acc;
        },{ totalGasto: 0, totalAhorro: 0 }
      );
      totalGasto.value = tg;
      totalAhorro.value = ta;
    },
    { deep: true }
  );
  watch([totalGasto, totalAhorro], () => {
        disponible.value = presupuesto.value - (totalGasto.value + totalAhorro.value)
  }, { deep: true})

  watch(modal, () => {
    if(!modal.mostrar){recetObjeto();}})

  watch([presupuesto, gastos], () => {
    localStorage.setItem('presupuesto', presupuesto.value);
  })

  onMounted(() => {
    const presupuestoStorage = localStorage.getItem('presupuesto');
    if(presupuestoStorage){
      presupuesto.value = Number(presupuestoStorage);
      disponible.value = Number(presupuestoStorage);

    }
    const gastosStorage = localStorage.getItem('gastos');
    if(localStorage.getItem('gastos')){
      gastos.value = JSON.parse(gastosStorage);
    }
  })

  const gasto = reactive({
    nombre: '',
    cantidad: 0,
    categoria: '',
    id: null,
    fecha: Date.now()
  })

  const recetearApp = () => {
    if(confirm('Estas seguro de resetear la app?')){
      presupuesto.value = 0;
      disponible.value = 0;
      gastos.value = [];
    }
  }

  const recetObjeto = () => {
    Object.assign(gasto, {
      nombre: '',
      cantidad: 0,
      categoria: '',
      id: null,
      fecha: Date.now()
    });
  };

  const guardarGasto = () => {
    if (gasto.id){
      const {id} = gasto;
      const i = gastos.value.findIndex(gasto => gasto.id === id);
      gastos.value[i] = {...gasto}
    }else{
      gastos.value.push({
      ...gasto,
      id:generarID(), 
    });
    }    
  }

  const eliminarGasto = (id) => {
    if (confirm('Estas seguro de eliminar el gasto?')){
      gastos.value = gastos.value.filter(gasto => gasto.id !== id);
    }
  }

  const definirPresupuesto = (cantidad) => {
    presupuesto.value = cantidad;
    disponible.value = disponible.value + cantidad;
  };

  const mostrarModal = () => {
    modal.mostrar= true;
    setTimeout(() => {
      modal.animar = true;
    }, 250);
  }

  const ocultarModal = () => {
    modal.animar = false;
    setTimeout(() => {
      modal.mostrar = false;
    }, 300);
  }

  
  // Seleccionar gastos / modificar gastos
  const seleccionarGasto = id => {
    const gastoEditar = gastos.value.filter(gasto => gasto.id === id)[0];
    mostrarModal();
    Object.assign(gasto, gastoEditar);
  }
  const gastosFiltrados = computed(() => {
    if(filtro.value){
      return gastos.value.filter(gasto => gasto.categoria === filtro.value)
    }
    return gastos.value
  })
  const cabeceraGastos = computed(() =>{
    if(gastosFiltrados.value.length === 0) return 'No hay gastos';
    return gastosFiltrados.value.length > 1 ? 
    `Tienes ${gastosFiltrados.value.length} gastos`:
    `Tienes ${gastosFiltrados.value.length} gasto`;
  })  
</script>

<template>
  <div
    :class="{fijar:modal.mostrar}"
  >

    <header class="">
      <h1 class="">Planificador de <span>gastos</span></h1>
      
      <div class="contenedor-header contenedor sombra">
        <Presupuesto 
          v-if="presupuesto === 0"
          @presupuesto-definido="definirPresupuesto"
          />
          <ControlPresupuesto 
            v-else
            @recetear-app="recetearApp"
            :presupuesto="presupuesto"
            :disponible="disponible"
            :totalGasto="totalGasto"
            :totalAhorro="totalAhorro"
          />
      </div>
    </header>
    <main v-if="presupuesto > 0">
      <Filtro 
        v-if="gastos.length > 0"
        v-model:filtro="filtro"
      />

      <div class="contenedor">
        <p class="cabecera-gastos">{{cabeceraGastos}}</p>
        <Gastos 
          :gastos="gastosFiltrados"
          @seleccionar-gasto="seleccionarGasto"
        />
        </div>
        
        <div class="crear-gastos">
          <Boton @click="mostrarModal">+</Boton>
      </div>
        
      <Modal 
        v-if="modal.mostrar"
        @cerrar-modal="ocultarModal"
        @guardar-gasto="guardarGasto"
        @eliminar-gasto="eliminarGasto"
        :modal="modal"
        :id="gasto.id"
        :disponible="disponible"
        v-model:nombre="gasto.nombre"
        v-model:cantidad="gasto.cantidad"
        v-model:categoria="gasto.categoria"
      />
    </main>
  </div>

</template>

<style>
  :root{
    --verde: #0f9c18;
    --rojo: #ab0a0a;
    --rojo-oscuro: #850707;
    --azul-claro: #3b82f6;
    --azul-oscuro: hsl(217, 61%, 49%);
    --blanco: #fff;
    --negro: #000;

    --gris-claro: #f5f5f5;
    --gris-oscuro: #64748b;
    --gris: #94a3b8;
  } /* :root es donde se definen las variables globales de CSS */
  html{
    font-size: 62.5%;
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after{
    box-sizing: inherit;
  }

  body{
    font-size: 1.6rem;
    font-family: "lato", sans-serif;
    color: var(--negro);
  }

  h1{
    font-size: 4rem;
  }
  h2{
    font-size: 3rem;
  }
  .fijar{
    overflow: hidden;
    height: 100vh;
  }
  header{
    background-color: var(--azul-claro);
  }
  header h1{
    padding: 3rem 0;
    margin: 0;
    color: var(--blanco);
    text-align: center;
  }
  label {
    color: var(--negro); /* o el color que quieras */
  }
  .contenedor{
    width: 90%;
    max-width: 80rem;
    margin: 0 auto;
  }

  .contenedor-header{
    margin-top: -5rem;
    transform: translateY(5rem);
    padding: 5rem;
  }
  .sombra{
    box-shadow: -14px 10px 15px -3px rgba(0,0,0,0.1);
    background-color: var(--blanco);
    border-radius: 1.2rem;
    padding: 5rem;
  }
  .crear-gastos{
    position: fixed;
    bottom: 2rem;
    right: 3rem;
  }
  .crear-gastos img{
    width: 5rem;
    cursor: pointer;
    transition: width 500ms ease;
  }
  .cabecera-gastos{
    display: flex;
    position: relative;
    top: 2.7rem;
    left: 3rem;
    font-size: 3rem;
    font-weight: 900;
    color: var(--gris-oscuro);
  }
  @media (max-width: 768px){
    h1{
      font-size: 3rem;
    }
    h2{
      font-size: 2rem;
    }
    .cabecera-gastos{
      font-size: 1.5rem;
    }
  }
</style>