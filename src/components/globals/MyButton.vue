<template>
    <div>
        <slot> </slot>
    </div>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "MyButton", // Asegúrate de dar un nombre al componente
});
</script>

<style scoped lang="scss">
div {
    border-radius: 20px;
    background: #00000090;
    padding: 5px;
    cursor: pointer;
    &:hover {
        background: #000000;
    }
}
</style>
