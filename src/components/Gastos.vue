<script setup>
  import { formatearCantidad, formatearFecha } from '../helpers';

  const props = defineProps({
    gastos: {
      type: Array,
      required: true
    }
  });

  defineEmits(['seleccionar-gasto']);


</script>

<template>
  <div 
    v-for="(value, key) in gastos" 
    :key="key" :value="key" 
    class="listado-gastos sombra" 
    @click="$emit('seleccionar-gasto', value.id)"
    :class="value.categoria === 'ahorro' ? 'ahorro' : 'gasto'"
  >
    <div class="datos" \>
    <h2>{{ value.nombre }}</h2>
    <h3>Fecha: <span>{{ formatearFecha(value.fecha) }}</span></h3>
    <h3>Categoria: <span>{{ value.categoria }}</span></h3>
    <h3>id: <span>{{ value.id }}</span></h3>
    </div>

    <div class="cantidad">
        <h3>-{{ 
            formatearCantidad(value.cantidad) 
        }}</h3>
    </div>
  </div>
</template>

<style scoped>
  .listado-gastos{
    display:flex;
    flex-direction:row;
    align-items:center;
    position:relative;
    border-radius: 1.5rem;
    margin-top: 4.5rem;
    margin-bottom: -2rem;
    padding: 1rem 2rem 1rem 3rem;
    background-color: var(--gris-claro);
    cursor: pointer;
  }
  .listado-gastos.ahorro{
    .cantidad{
      color: var(--verde);
    }
  }
  .listado-gastos.gasto{
    .cantidad{
      color: var(--rojo);
    }
  }
  .listado-gastos h3{
    margin-top: -.5em;
    text-transform: uppercase;
    font-weight: 900;
  }
  .cantidad{
    display: flex;
    position: absolute;
    right: 10rem;
    top: 10rem;

    font-size: 4rem;
    font-weight: 900;
  } 
  .listado-gastos span{
    left: .8rem;
    position: relative;
    font-size: 1.3rem;
    font-weight: 500;
    background-color: #3b82f6;
    padding: .4rem;
    border-radius: .5rem;
    color: var(--blanco);
    text-shadow: 1px 1px 4px rgba(0,0,0,0.6);
  }
  .listado-gastos h2{
    color: var(--blanco);
    text-shadow: 1px 1px 4px rgba(0,0,0,0.6);
    font-size: 3.5rem
  }   
</style>
