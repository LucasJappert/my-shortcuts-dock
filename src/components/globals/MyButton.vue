<template>
    <div class="flex-center mx-1 pointer" :class="getClasses" @click="openFolder()" :title="folderPath">
        <span>
            <slot></slot>
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "MyButton", // Asegúrate de dar un nombre al componente
    props: {
        classes: {
            type: Array<string>,
            default: () => [],
        },
        folderPath: {
            type: String,
            default: "",
        },
    },
    computed: {
        getClasses(): string {
            return this.classes.join(" ");
        },
    },
    setup(props) {
        const openFolder = () => {
            // Usa el método expuesto en electronAPI para abrir la carpeta
            window.electronAPI.openFolder(props.folderPath);
        };

        return {
            openFolder,
        };
    },
});
</script>

<style scoped lang="scss">
div {
    border-radius: 20px;
    background: #000000d0;
    padding: 5px 10px;
    cursor: pointer;
    // animation: pulse 4s infinite linear;

    &:hover {
        background: #000000;
    }
    span {
        // filter: grayscale(100%);
    }
}
</style>
