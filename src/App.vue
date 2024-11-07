<script setup lang="ts">
import Shortcuts from "./components/Shortcuts.vue";

const closeButton = () => {
    window.electronAPI.closeButton();
};
</script>

<template>
    <Shortcuts />

    <div class="btn-container">
        <div class="btn move-btn draggable p-relative" @click="closeButton">
            <!-- <span class="rotate-90">↔</span> -->
            <span class="p-relative">↔</span>
        </div>
        <div class="btn close-btn ml-2" @click="closeButton">✖</div>
    </div>
</template>

<style lang="scss">
#app {
    width: 100%;
    height: 100%;
    padding: 5px 20px;
    overflow: hidden;
    // overflow-x: scroll;
    border-radius: 30px;
    background: #00000090;
    display: flex;
    align-items: center;
    justify-content: start;
}
</style>
<style scoped lang="scss">
.btn-container {
    position: relative !important;
    // top: 50%;
    // right: -50px;
    // transform: translateY(-50%);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: end;
    padding-left: 10px;
}
.btn {
    font-size: 1.1rem;
    // line-height: 1.2rem;
    // margin: 0 2px;
    background: #00000090;
    color: var(--white) !important;
    padding: 5px 10px;
    border-radius: 100%;
    box-shadow: 0 0 2px #fffffff0;
    // animation: pulse 10s infinite linear;
}
.rotate-90 {
    transform: rotate(90deg) translate(-50%, -50%);
    left: 50%;
    top: 50%;
    width: 0%;
    height: 0%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
}
.move-btn {
    cursor: move !important;
}
</style>
