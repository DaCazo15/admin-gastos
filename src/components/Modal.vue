<script setup>
    import { ref, computed } from 'vue';
    import Boton from './Boton.vue';
    import cerrarModal from '../assets/img/cerrar.svg';
    import { opciones } from '../helpers';
    import Alerta from './Alerta.vue';

    const error = ref('');

    const emit = defineEmits([
        'cerrar-modal',
        'guardar-gasto',
        'eliminar-gasto',
        'update:nombre',
        'update:cantidad',
        'update:categoria'
    ]);
    const props = defineProps({
        modal: {
            type: Object,
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        cantidad: {
            type: [Number, String],
            required: true
        },
        categoria: {
            type: String,
            required: true
        },
        disponible: {
            type: Number,
            required: true
        },id: {
            type: [String, null],
            required: false
        }
    });
    const cantidadOld = props.cantidad;
    const isEditing = computed(() => {
        return props.id
    });
    

    const agregarGasto = () => {
        const { nombre, cantidad, categoria, disponible, id } = props;
        if ([nombre, cantidad, categoria].includes('')){
            error.value = 'Todos los campos son obligatorios'
            setTimeout(() => {
                error.value = ''
            }, 2000);
            return
        }
        // Cantidad invalida, menor a 0
        if(cantidad <= 0){
            error.value = 'La cantidad no es valida'
            setTimeout(() => {
                error.value = ''
            }, 2000);
            return
        }
        // Cantidad invalida, mayor que el saldo disponible
        if(cantidad > disponible){
            if (id) {
                if (cantidad > cantidadOld + disponible) {
                    error.value = disponible === 0 ? 'No hay saldo disponible' : 'La cantidad supera el disponible'
                    setTimeout(() => {
                        error.value = ''
                    }, 2000);
                    return
                }
            }else{
                error.value = 'La cantidad supera el disponible'
                setTimeout(() => {
                    error.value = ''
                }, 2000);
                return
            }
        }
        // Cantidad valida, guardar informacion
        emit('guardar-gasto')
        emit('cerrar-modal')
    }

</script>

<template>
    <div class="modal">
        <div class="cerrar-modal">
            <img 
                :src="cerrarModal"
                alt="Cerrar modal"
                class="cerrar-modal"
                @click="$emit('cerrar-modal')"
                >
            </div>
            <div 
            class="contenedor-modal animar-modal"
            :class="[modal.animar ? 'abrir' : 'cerrar']"
            >
                <h1>{{ isEditing ? 'Actualizar Gasto' : 'Añadir Gasto' }}</h1>

                <Alerta v-if="error">{{ error }}</Alerta>

                <form class="formulario" @submit.prevent="agregarGasto">
                    <!-- Formulario para agregar nuevo gasto -->
                    <div class="campo">
                        <label for="text-formulario">Nombre del gasto</label>
                        <input 
                            type="text" 
                            id="text-formulario"
                            placeholder="Nombre del gasto"
                            :value="nombre"
                            @input="$emit('update:nombre', $event.target.value)"
                            />
                        </div>
                        <div class="campo">
                            <label for="text-formulario">Categoria</label>
                            <select 
                                id="categoria-formulario"
                                :value="categoria"
                                @input="$emit('update:categoria', $event.target.value)"
                            >
                                <option value="">-- Seleccione --</option>
                                <option v-for="(value, key) in opciones" :key="key" :value="key">{{ value }}</option>
                            </select>
                        </div>
                        <div class="campo">
                            <label for="cantidad-formulario">Cantidad del gasto</label>
                            <input 
                            type="number" 
                            id="cantidad-formulario" 
                            placeholder="Cantidad del gasto"
                            :value="cantidad"
                            @input="$emit('update:cantidad', +$event.target.value)"
                        />
                    </div>
                </form>
            <div
                @click="() => { agregarGasto(); }"
            >
                <Boton 
                    class="btn-agregar"
                >{{isEditing ? 'Actualizar Gasto' : 'Añadir Gasto'}}</Boton>
                <Boton 
                    v-if="isEditing"
                    @click="$emit('eliminar-gasto', id)"
                    class="btn-borrar" 
                >eliminar Gasto</Boton>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .modal{
        position: absolute;
        background-color: rgb(0 0 0 / 0.9);

        bottom: 0;
        top: 0;
        left: 0;
        right: 0;

        display: flex;
        flex-direction: column;
    }
    .modal h1{
        color: white;
        text-shadow: 1px 1px 4px rgba(0,0,0,0.6);
        font-size: 3rem;
        margin-bottom: 3rem;
    }
    .contenedor-modal{
        background-color: rgba(255, 255, 255, 0.5);
        padding: 3rem 5rem;
        border-radius: 1.2rem;
        box-shadow: -14px 10px 15px -3px rgba(0,0,0,0.1);
        text-align: center;
        margin: 10rem auto 0 auto;
        width: 60%;
    }

    .btn-agregar {
        font-size: 1.5rem;
        background-color: var(--azul-claro);
        border: none;
        color: white;
        text-transform: capitalize;
    }
    .btn-agregar:hover {
        color: white;
        border: solid 2.5px var(--azul-oscuro);
        background-color: var(--azul-oscuro);
    }
    .cerrar-modal{
        position: absolute;
        top: 2rem;
        right: 2rem;
        cursor: pointer;
    }
    .cerrar-modal img{
        width: 3rem;
    }

    .animar-modal{
        transition-property: all;
        transition-duration: 300ms;
        transition-timing-function: ease-in;
        opacity: 0;    
    }
    .animar-modal.abrir{
        opacity: 1;    
    }
    .animar-modal.cerrar{
        opacity: 0;    
    }

    .formulario{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        margin-bottom: 3rem;
    }
    .campo{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    .campo label{
        font-size: 1.5rem;
        font-weight: 700;
        color: white;
        text-shadow: 1px 1px 4px rgba(0,0,0,0.6);
    }
    .campo input{
        background-color: rgba(255 255 255 / 0.2);
        padding: 1rem;
        font-size: 1.5rem;
        border-radius: 0.5rem;
        border: none;
        width: 60%;
    }
    .campo input:hover{
        background-color: rgba(255 255 255 / 0.1);
        cursor: pointer;
    }
    .campo input:focus{
        outline: none;
        border-left: solid 2px var(--azul-claro);
        background-color: rgba(255 255 255 / 0.0);
        cursor:inherit;
    }
    .campo select{
        outline: none;
        background-color: rgba(255 255 255 / 0.2);
        padding: 1rem;
        font-size: 1.5rem;
        border-radius: 0.5rem;
        border: none;
        width: 60%;
    }
    .btn-borrar{
        background-color: var(--rojo);
        color: var(--blanco);
        font-size: 1.5rem;
        margin-top: 1rem;
        cursor: pointer;
        text-transform: capitalize;
    }
    .btn-borrar:hover{
        background-color: var(--rojo-oscuro);
        color: var(--blanco);
        border: solid 2.5px var(--rojo-oscuro);
        transition: 1s ease;
    }
</style>
