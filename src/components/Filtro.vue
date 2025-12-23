<script setup>
    import { opciones } from '../helpers';

    defineProps(['filtro'])
    defineEmits(['update:filtro'])
</script>

<template>
    <div class="filtros contenedor sombra">
        <form>
            <div class="campo">
                <label for="filtro">Filtrar Gastos</label>
                <select 
                    id="categoria-formulario"
                    :value="filtro"
                    @input="$emit('update:filtro', $event.target.value)"
                >
                    <option value="">-- Seleccione --</option>
                    <option v-for="(value, key) in opciones" :key="key" :value="key">{{ value }}</option>
                </select>
            </div>

        </form>

    </div>
    
</template>

<style scoped>
    .filtros{
        margin-top: 5rem;
        margin-bottom: -3.5rem;
        top:1rem;
    }
    .sombra{
        padding: 2rem 3rem;
    }
    .filtros .campo{
        display:flex;
        align-items: center;
        gap: 2rem;
    }
    .filtros label{
        font-size: 3rem;
        font-weight: 900;
        color: var(--gris-oscuro);
    }
    .filtros select{
        flex: 1;
        padding: 1rem;
        border: none;
        border-radius: 1rem;
        background-color: var(--gris-claro);
        text-align: center;
    }
</style>
