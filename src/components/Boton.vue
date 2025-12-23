<script setup>

</script>

<template>
    <div class="btn">
        <slot></slot>
    </div>
</template>

<style scoped>
    .btn {
        cursor: pointer;
        border: none;
        background-color: var(--azul-claro);
        color: var(--blanco);
        padding: 1rem 2rem;
        font-size: 1.5rem;
        border-radius: 2.5rem;
        font-size: 3.5rem;
        font-weight: 900;
        transition: 1s ease;
    }
    .btn:hover {
        transition: 1s ease;
        border-radius: 2rem;
        border: solid 2.5px var(--azul-claro);
        background-color: var(--blanco);
        color: var(--azul-claro);
    }
    @media (max-width: 768px){
        .btn{
            font-size: 2rem;
            padding: 1rem 1.5rem;
        }
    }
</style>
