<script setup lang="ts">
import { ref, onMounted } from "vue";
import { IShortCut } from "./components/models/ShortCut.model";
import Shortcuts from "./components/Shortcuts.vue";

const shortcuts = ref<IShortCut[] | null>(null);

const GetJsonData = async () => {
    const jsonData = await fetch("/json/my-shortcuts.json");
    return await jsonData.json();
};

onMounted(async () => {
    shortcuts.value = await GetJsonData();
    console.log("shortcuts", shortcuts.value);
});

const closeButton = () => {
    window.electronAPI.closeButton();
};
</script>

<template>
    <div v-if="shortcuts" class="shortcuts-container">
        <Shortcuts :items="shortcuts" />
    </div>
    <div v-else>Cargando...</div>

    <div class="btn-container">
        <v-btn density="compact" icon="mdi-close" size="small" @click="closeButton"></v-btn>
    </div>
</template>

<style lang="scss"></style>
<style scoped lang="scss">
.shortcuts-container {
    background: #000000c0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow-x: scroll;
    box-shadow: inset 0 0 15px #000000, inset 0 0 15px #000000, inset 0 0 15px #000000, 0 0 15px #000000;
    border-radius: 30px;
    padding: 2px 10px;
}
.btn-container {
    position: relative !important;
    background: #000000c0;
    box-shadow: inset 0 0 5px #ffffff50;
    border-radius: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 10px;
    height: 60%;
    padding: 0 10px;
}
.btn {
    font-size: 0.9rem;
    line-height: 2rem;
    // background: #00000090;
    // color: var(--white) !important;
    padding: 5px;
    border-radius: 100%;
    box-shadow: inset 0 0 5px #ffffff;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 30px;
}
</style>
