<template>
    <div class="flex-center mx-1 pointer my-button" :class="getClasses" @click="ClickButton()" :title="shortCut.actionUrl">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ActionTypes } from "../models/ShortCut.model";

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
    },
    setup(props) {
        const ClickButton = () => {
            console.log(props.shortCut);
            if (props.shortCut.actionType == ActionTypes.openInVSCode) {
                return window.electronAPI.openFolderInVSCode(props.shortCut.actionUrl);
            }

            if (props.shortCut.actionType == ActionTypes.openWebLink) {
                return window.open(props.shortCut.actionUrl, "_blank");
            }

            if (props.shortCut.actionType == ActionTypes.openDirectory) {
                return window.electronAPI.openDirectory(props.shortCut.actionUrl);
            }

            if (props.shortCut.actionType == ActionTypes.openApp) {
                return window.electronAPI.openAppImage(props.shortCut.actionUrl);
            }
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
