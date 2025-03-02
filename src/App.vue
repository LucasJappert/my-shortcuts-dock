<script setup lang="ts">
import { IShortCut } from "./components/models/ShortCut.model";
import Shortcuts from "./components/Shortcuts.vue";

const GetJsonData = async () => {
    // intentamos obtener el json que esta en la carpeta json/my-shortcuts.json
    const jsonData = await fetch("./json/my-shortcuts.json");
    return await jsonData.json();
};

const closeButton = () => {
    window.electronAPI.closeButton();
};

const shortcuts: Array<IShortCut | null> = (await GetJsonData()) as Array<IShortCut | null>;
console.log(shortcuts);
const iconsPathNoRepeated = new Set(shortcuts.map((shortcut) => shortcut?.iconPath));
console.log(iconsPathNoRepeated);
</script>

<template>
    <Suspense>
        <template #default>
            <div class="shortcuts-container">
                <Shortcuts :items="shortcuts" />
            </div>

            <div class="btn-container">
                <!-- <v-btn
                    class=""
                    density="compact"
                    :icon="expanded ? 'mdi-unfold-less-vertical' : 'mdi-unfold-more-vertical'"
                    size="medium"
                    @click="ChangeSizeButton()"
                ></v-btn>

                <v-btn class="draggable ml-2" density="compact" icon="mdi-drag" size="small"></v-btn> -->

                <v-btn density="compact" icon="mdi-close" size="small" @click="closeButton"></v-btn>
            </div>
        </template>

        <template #fallback>
            <div>Cargando...</div>
        </template>
    </Suspense>
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
