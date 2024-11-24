<template>
    <div class="flex-center mx-1 pointer my-button" :class="getClasses" @click="ClickButton()" :title="getTitle">
        <slot></slot>
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
        shortCut: {
            type: Object,
            default: null,
        },
    },
    computed: {
        getClasses(): string {
            return this.classes.join(" ");
        },
        getTitle(): string {
            if (this.shortCut?.folderPath) return this.shortCut.folderPath;
            if (this.shortCut?.linkWeb) return this.shortCut.linkWeb;

            return "";
        },
    },
    setup(props) {
        const ClickButton = () => {
            console.log(props.shortCut);
            if (props.shortCut?.action) return props.shortCut.action();

            // if (props.folderPath) return window.electronAPI.openFolderInVSCode(props.folderPath);

            // if (props.webLink) return window.open(props.webLink, "_blank");

            // return null;
        };

        return {
            ClickButton,
        };
    },
});
</script>

<style scoped lang="scss">
.my-button {
    border-radius: 30px;
    background: rgba(0, 0, 0, 0.8156862745);
    // padding: 5px;
    height: 50px;
    max-height: 90%;
    min-width: 50px;
    max-width: 50px;
    // display: inline-flex;
    cursor: pointer;
    // animation: pulse 4s infinite linear;

    &:hover {
        background: #000000;
    }
}
</style>
