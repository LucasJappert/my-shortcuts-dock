<template>
    <div class="shorcuts-container">
        <my-button color="secondary" class="flex-center mx-2 pointer btn-back-mp" @click="openFolder('/home/lucas/Desktop/my-projects/maizplus-api')">
            <!-- <img src="@/assets/icon1.png" alt="Icono 1" /> -->
            <!-- <img src="@/assets/electron.svg" class="logo electron" alt="Electron logo" /> -->
            Back 🌱
        </my-button>
        <my-button color="secondary" class="flex-center mx-2 btn-back-mp" @click="openFolder('/home/lucas/Desktop/my-projects/maizplus-front')">
            <!-- <img src="@/assets/icon2.png" alt="Icono 2" /> -->
            <!-- <img src="/test.svg" class="logo" alt="Vite logo" /> -->
            Front 🌱
        </my-button>
        <!-- Agrega más iconos según sea necesario -->
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Shortcuts",
    setup() {
        const openFolder = (folderPath: string) => {
            // Usa el método expuesto en electronAPI para abrir la carpeta
            window.electronAPI.openFolder(folderPath);
        };

        return {
            openFolder,
        };
    },
});
</script>

<style scoped lang="scss">
.shorcuts-container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 15px;
    // animation: rotate-shadow 10s infinite linear;
    // background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
}
button {
    background: none;
    border: none;
    cursor: pointer;
    animation: rotate-shadow 10s infinite linear;
    background-color: rgba(0, 0, 0, 0.6);
}
</style>
