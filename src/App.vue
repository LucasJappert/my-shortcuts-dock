<script setup lang="ts">
import Shortcuts from "./components/Shortcuts.vue";

const closeButton = () => {
    window.electronAPI.closeButton();
};
</script>

<template>
    <section>
        <div class="close-btn flex-center" @click="closeButton">✖</div>
        <Shortcuts />
    </section>
</template>

<style lang="scss">
.close-btn {
    position: fixed !important;
    bottom: 10px;
    right: 10px;
    font-size: 1rem;
    line-height: 1rem;
    cursor: pointer;
    color: var(--color1) !important;
    z-index: 1000;
    background: #000000;
    padding: 5px;
    border-radius: 20px;
}
</style>
