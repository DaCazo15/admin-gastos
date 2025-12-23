<script setup>
    import { computed } from 'vue';
    import CircleProgress from 'vue3-circle-progress';
    import "vue3-circle-progress/dist/circle-progress.css";
    import { formatearCadena } from '../helpers';

    const emir = defineEmits([
        'recetear-app'
    ]);

    const props = defineProps({
        totalGasto: {
            type: Number,
            required: true
        },
        totalAhorro: {
            type: Number,
            required: true
        },
        presupuesto: {
            type: Number,
            required: true
        },
        disponible: {
            type: Number,
            required: true
        }
    });

    const porcentaje = computed(() =>{
        return ((props.presupuesto - props.disponible)/props.presupuesto) * 100;
    })

</script>

<template>
    <div class="dos-columnas">
        <div class="contenedor-grafico">
            <CircleProgress
                :percent="porcentaje"
                :size="250"
                :border-width="30"
                :border-bg-width="23"
                fill-color="#3b82f6"
                empty-color="#e1e1e1"
            />
            <p class="porcentaje">{{ porcentaje > 0 ? `${porcentaje}%` : '' }}</p>
        </div>
        <div class="contenedor-presupuesto">
            <button 
                class="reset-app"
                @click="emir('recetear-app')"
            >Resetear App
            </button>
            <p>
                <span>Presupuesto: </span>
                {{ formatearCadena(presupuesto) }}
            </p>
            <p>
                <span>Disponible: </span>
                {{ formatearCadena(disponible) }}
            </p>
            <p>
                <span>Gastos: </span>
                {{ formatearCadena(totalGasto) }}
            </p>
            <p>
                <span>Ahorros: </span>
                {{ formatearCadena(totalAhorro) }}
            </p>
        </div>
    
    </div>
    
</template>

<style scoped>
    .dos-columnas{
        display: flex;
        flex-direction: column;
    }    
    .dos-columnas>:first-child{
        margin-bottom: 2rem;
    }
    @media (min-width: 768px){
        .dos-columnas{
            flex-direction: row;
            align-items: center;
            gap: 3rem;
        }    
        .dos-columnas>:first-child{
            margin-bottom: 0;
        }
    }   

    .reset-app{
        background-color: #b3160b;
        color: var(--blanco);
        padding: 1rem;
        border-radius: 1rem;
        text-align: center;
        border: none;
        font-weight: 900;
        text-transform: uppercase;

        width: 100%;

        transition: background-color 500ms ease;;
    }
    .reset-app:hover{
        background-color: #831008;
        cursor: pointer;
    }

    .contenedor-presupuesto{
        width: 100%;
    }
    .contenedor-presupuesto p{
        font-size: 1.7rem;
        text-align: left;
        color: var(--gris-oscuro);
    }
    
    /* @media (min-width: 768px){
        .contenedor-presupuesto p{
            font-size: 3.4rem;
        }
        
    } */
    @media (min-width: 380px){
        .contenedor-presupuesto p{
            text-align: left;
            font-size: 2.4rem;
        }
    }
    .contenedor-presupuesto span{
        font-weight: bold;
        color: var(--azul-claro);
    }
    .porcentaje{
        position: absolute;
        z-index: 100;
        top: 11rem;
        left:13rem;
        font-size: 5rem;

        font-size: 5rem;
        color: var(--azul-claro);
        font-weight: bold;
    }
</style>
