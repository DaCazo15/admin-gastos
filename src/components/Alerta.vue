<script setup>

</script>

<template>
    <div
        class="alerta"
    >
        <slot></slot>
    </div>
    
</template>

<style scoped>
    .alerta{
        color: #b91c1c;
        padding: 1rem;
        font-weight: 900;
        font-size: 1.5rem;
        text-align: center;
        text-align: center;
        text-transform: uppercase;
        border-left: .5rem solid #b91c1c;
        margin-bottom: 2rem;
    }
</style>
