<script setup>
    import { ref } from 'vue'
    import Alerta from './Alerta.vue'

    const presupuesto = ref(0)
    const error = ref('')

    const emit = defineEmits([
        'presupuesto-definido'
    ])

    const definirPresupuesto = () => {
        if(presupuesto.value <= 0 || presupuesto.value === ''){
            error.value = 'El presupuesto no es válido'
            
            setTimeout(() => {
                error.value = ''
                presupuesto.value = 0
            }, 2000);
            return
        }
        emit('presupuesto-definido', presupuesto.value)
    }
</script>

<template>
    <form
        class="presupuesto"
        @submit.prevent="definirPresupuesto"
    >

    <Alerta
    v-if="error">
        {{ error }}
    </Alerta>

        <div class="campo">
            <label for="nuevo-presupuesto">Definir presupuesto</label>

            <input 
                id="nuevo-presupuesto"
                class="nuevo-presupuesto"
                placeholder="Introduce tu presupuesto"
                type="number"
                v-model.number="presupuesto"
            />
        </div>

        <input 
            type="submit"
            value="Añadir presupuesto"
        />

    </form>
</template>

<style scoped>
    .presupuesto{
        width: 100%;
    }
    .presupuesto label{
        font-size: 2.2rem;
        text-align: center;
        color: var(--azul-claro);
    }
    .presupuesto input[type="number"]{
        background-color: var(--gris-claro);
        border-radius: 1rem;
        border: none;
        font-size: 2.2rem;
        text-align: center;
    }
    .presupuesto input[type="number"]:focus{ 
        outline: none;
        border: 2px solid var(--azul-claro);
    }
    .presupuesto input[type="submit"]{
        background-color: var(--azul-claro);
        border: none;
        padding: 1rem;
        text-align: center;
        font-size: 2rem;
        margin-top: 2rem;
        color: var(--blanco);
        width: 100%;
        font-weight: bold;
        transition: background-color 500ms ease;
    }
    .presupuesto input[type="submit"]:hover{
        background-color: var(--gris);
        cursor: pointer;
    }
    .campo {
        display: grid;
        gap: 2rem;;
    }
</style>