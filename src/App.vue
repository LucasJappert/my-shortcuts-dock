<script setup lang="ts">
import { ref, onMounted } from "vue";
import { IShortCut } from "./components/models/ShortCut.model";
import Shortcuts from "./components/Shortcuts.vue";

// Variables para el scroll
const container = ref<HTMLElement | null>(null);

// Carga de datos
const shortcuts = ref<IShortCut[] | null>(null);
const GetJsonData = async () => {
    const jsonData = await fetch("json/my-shortcuts.json");
    const items = await jsonData.json();
    return items;
};

onMounted(async () => {
    shortcuts.value = await GetJsonData();
});

const closeButton = () => {
    window.electronAPI.closeButton();
};

// Scroll manual con botones
const scroll = (direction: "left" | "right") => {
    if (!container.value) return;
    const scrollAmount = container.value.offsetWidth * 0.6; // 60% del ancho del contenedor
    container.value.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
    });
};
</script>

<template>
    <div class="main-wrapper">
        <!-- Contenedor principal con scroll -->
        <div v-if="shortcuts" class="shortcuts-container" ref="container">
            <div class="empty-block"></div>
            <Shortcuts :items="shortcuts" />
            <div class="empty-block"></div>
        </div>

        <!-- Botones de navegación flotantes -->
        <div class="nav-buttons-container">
            <div class="nav-button left" @click="scroll('left')">
                <v-icon>mdi-chevron-left</v-icon>
            </div>
            <div class="nav-button right" @click="scroll('right')">
                <v-icon>mdi-chevron-right</v-icon>
            </div>
        </div>

        <!-- Botón de cerrar -->
        <div class="close-btn-container">
            <v-btn density="compact" icon="mdi-close" size="small" @click="closeButton"></v-btn>
        </div>
    </div>
</template>

<style scoped lang="scss">
.main-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
}

.shortcuts-container {
    flex: 1;
    background: #000000c0;
    display: flex;
    align-items: center;
    height: 100%;
    overflow-x: scroll;
    box-shadow: inset 0 0 15px #000000;
    border-radius: 30px;
    padding: 2px 10px;
    scroll-behavior: smooth;
    position: relative;
    z-index: 1;
}

.nav-buttons-container {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    right: 0;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
    z-index: 2;
}

.close-btn-container {
    position: absolute;
    right: -25px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    button {
        background-color: #000000d0 !important;
        backdrop-filter: blur(5px);
    }
}
.empty-block {
    flex-shrink: 0;
    width: 50px;
}

.nav-button {
    pointer-events: auto;
    cursor: pointer;
    position: relative;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    // Centrado perfecto del icono
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-out;
    z-index: 2;

    // Fondo oscuro fijo
    background: #0a0a0a;
    border: 2px solid transparent;

    // Capa de brillo interna
    &::before {
        content: "";
        position: absolute;
        top: 4px;
        left: 4px;
        right: 4px;
        bottom: 4px;
        border-radius: 50%;
        background: radial-gradient(circle at 50% 50%, rgba(0, 255, 224, 0.15), rgba(255, 0, 255, 0.15) 70%);
        opacity: 0.4;
        transition: opacity 0.3s;
        z-index: -1;
    }

    // Efecto hover
    &:hover {
        // Sombras más pequeñas y ajustadas
        box-shadow: 0 0 8px 1px #00ffe0, 0 0 10px 2px #ff00ff, 0 0 12px 3px rgba(255, 0, 255, 0.3);

        // Brillo interno
        &::before {
            opacity: 0.7;
            animation: rotateGlow 2s linear infinite;
        }

        // Borde animado más fino
        border: 2px solid #00ffe0;
        animation: pulseBorder 1.5s infinite;
    }

    // Icono ajustado
    .v-icon {
        color: white;
        font-size: 20px; // Tamaño reducido para mejor centrado
        position: relative;
        transition: color 0.3s;

        // Sombra ajustada
        text-shadow: 0 0 3px rgba(0, 255, 224, 0.6), 0 0 5px rgba(255, 0, 255, 0.4);

        // Eliminar márgenes innecesarios
        margin: 0 !important;
        padding: 0 !important;
        transform: none !important;
    }

    // Posiciones
    &.left {
        margin-left: 5px;
    }
    &.right {
        margin-right: 10px;
    }
}

// Animación de rotación para el brillo
@keyframes rotateGlow {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

// Animación de pulso para el borde
@keyframes pulseBorder {
    0% {
        border-color: #00ffe0;
    }
    50% {
        border-color: #ff00ff;
    }
    100% {
        border-color: #00ffe0;
    }
}
</style>
