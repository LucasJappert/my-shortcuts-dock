<script setup lang="ts">
import { ipcRenderer } from "electron";
import { IShortCut } from "./components/models/ShortCut.model";
import Shortcuts from "./components/Shortcuts.vue";
import whatsappIcon from "@/assets/whatsapp.png";
import { ref } from "vue";

const expanded = ref(false);

const closeButton = () => {
    window.electronAPI.closeButton();
};
const ChangeSizeButton = () => {
    expanded.value = !expanded.value;
    window.electronAPI.resizeWindow();
};

const FirstShortCuts = () => {
    const items: Array<null | IShortCut> = [];

    items.push({
        folderPath: "/home/lucas/Desktop/my-projects/maizplus_ambientaciones_api",
        classes: ["pulse-yellow"],
        iconPath: new URL("@/assets/icons/crop1.svg", import.meta.url).href,
        action: () => {
            window.electronAPI.openFolderInVSCode("/home/lucas/Desktop/my-projects/maizplus_ambientaciones_api");
        },
    });
    items.push({
        folderPath: "/home/lucas/Desktop/my-projects/maizplus-api",
        classes: ["pulse-blue"],
        iconPath: new URL("@/assets/icons/crop1.svg", import.meta.url).href,
        action: () => {
            window.electronAPI.openFolderInVSCode("/home/lucas/Desktop/my-projects/maizplus-api");
        },
    });
    items.push({
        folderPath: "/home/lucas/Desktop/my-projects/maizplus-front",
        classes: ["pulse-green"],
        iconPath: new URL("@/assets/farm.svg", import.meta.url).href,
        action: () => {
            window.electronAPI.openFolderInVSCode("/home/lucas/Desktop/my-projects/maizplus-front");
        },
    });
    items.push(null);
    items.push({
        folderPath: "/home/lucas/Desktop/my-projects/agroideas-in-api",
        classes: ["pulse-blue"],
        iconPath: new URL("@/assets/agroideas-in.svg", import.meta.url).href,
        action: () => {
            window.electronAPI.openFolderInVSCode("/home/lucas/Desktop/my-projects/agroideas-in-api");
        },
    });
    items.push({
        folderPath: "/home/lucas/Desktop/my-projects/agroideas-in-front",
        classes: ["pulse-green"],
        iconPath: new URL("@/assets/agroideas-in.svg", import.meta.url).href,
        action: () => {
            window.electronAPI.openFolderInVSCode("/home/lucas/Desktop/my-projects/agroideas-in-front");
        },
    });
    items.push(null);
    items.push({
        folderPath: "/home/lucas/Desktop/my-projects/my-shortcuts-app",
        classes: ["pulse-magenta"],
        iconPath: new URL("@/assets/shortcuts.svg", import.meta.url).href,
        action: () => {
            window.electronAPI.openFolderInVSCode("/home/lucas/Desktop/my-projects/my-shortcuts-app");
        },
    });
    items.push({
        folderPath: "/home/lucas/Desktop/my-projects/twitch-extensions",
        classes: ["pulse-purple"],
        iconPath: new URL("@/assets/twitch.svg", import.meta.url).href,
        action: () => {
            window.electronAPI.openFolderInVSCode("/home/lucas/Desktop/my-projects/twitch-extensions");
        },
    });

    return items;
};

const SecondShortCuts = () => {
    const items: Array<null | IShortCut> = [];

    items.push(null);
    items.push(null);

    items.push({
        classes: ["pulse-black"],
        iconPath: new URL("@/assets/notepad.svg", import.meta.url).href,
        linkWeb: "https://speedy-notes.netlify.app/",
        action: () => {
            window.open("https://speedy-notes.netlify.app/", "_blank");
        },
    });
    items.push({
        classes: ["pulse-black"],
        iconPath: new URL("@/assets/icons/chatgpt.jpg", import.meta.url).href,
        linkWeb: "https://chatgpt.com/",
        action: () => {
            window.open("https://chatgpt.com/", "_blank");
        },
    });
    items.push({
        classes: ["pulse-black"],
        iconPath: new URL("@/assets/icons/youtube-music.jpg", import.meta.url).href,
        action: () => {
            window.electronAPI.openAppImage("/home/lucas/Desktop/youtube-music-with-overlay.AppImage");
        },
    });
    items.push({
        classes: ["pulse-black"],
        iconPath: new URL("@/assets/whatsapp.png", import.meta.url).href,
        linkWeb: "https://web.whatsapp.com/",
        action: () => {
            window.open("https://web.whatsapp.com/", "_blank");
        },
    });

    items.push(null);
    items.push({
        classes: ["pulse-red"],
        iconPath: new URL("@/assets/gmail.svg", import.meta.url).href,
        linkWeb: "https://mail.google.com/mail/u/0/#inbox",
        action: () => {
            window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
        },
    });
    items.push({
        classes: ["pulse-white"],
        iconPath: new URL("@/assets/google-chat.svg", import.meta.url).href,
        linkWeb: "https://mail.google.com/chat/u/0/#chat/home",
        action: () => {
            window.open("https://mail.google.com/chat/u/0/#chat/home", "_blank");
        },
    });
    items.push({
        classes: ["pulse-steelblue"],
        iconPath: new URL("@/assets/azure.svg", import.meta.url).href,
        linkWeb: "https://dev.azure.com/agroideassa/Sistemas/_sprints/backlog/Sistemas Team/Sistemas/Current",
        action: () => {
            window.open("https://dev.azure.com/agroideassa/Sistemas/_sprints/backlog/Sistemas Team/Sistemas/Current", "_blank");
        },
    });

    items.push(null);
    items.push({
        classes: ["pulse-yellow"],
        iconPath: new URL("@/assets/pull-request.svg", import.meta.url).href,
        linkWeb: "https://dev.azure.com/agroideassa/Sistemas/_git/maizplus-ambientaciones-api/pullrequests?_a=mine",
        action: () => {
            window.open("https://dev.azure.com/agroideassa/Sistemas/_git/maizplus-ambientaciones-api/pullrequests?_a=mine", "_blank");
        },
    });
    items.push({
        classes: ["pulse-aqua"],
        iconPath: new URL("@/assets/pull-request.svg", import.meta.url).href,
        linkWeb: "https://dev.azure.com/agroideassa/Sistemas/_git/maizplus-api/pullrequests?_a=mine",
        action: () => {
            window.open("https://dev.azure.com/agroideassa/Sistemas/_git/maizplus-api/pullrequests?_a=mine", "_blank");
        },
    });
    items.push({
        classes: ["pulse-green"],
        iconPath: new URL("@/assets/pull-request.svg", import.meta.url).href,
        linkWeb: "https://dev.azure.com/agroideassa/Sistemas/_git/maizplus-front/pullrequests?_a=mine",
        action: () => {
            window.open("https://dev.azure.com/agroideassa/Sistemas/_git/maizplus-front/pullrequests?_a=mine", "_blank");
        },
    });

    return items;
};
</script>

<template>
    <div class="shortcuts-container">
        <Shortcuts :items="FirstShortCuts()" />
        <Shortcuts :items="SecondShortCuts()" />
    </div>

    <div class="btn-container">
        <v-btn
            class=""
            density="compact"
            :icon="expanded ? 'mdi-unfold-less-vertical' : 'mdi-unfold-more-vertical'"
            size="medium"
            @click="ChangeSizeButton()"
        ></v-btn>

        <v-btn class="draggable ml-2" density="compact" icon="mdi-drag" size="small"></v-btn>

        <v-btn class="ml-2" density="compact" icon="mdi-close" size="small" @click="closeButton"></v-btn>
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
    // background: #000000c0;
    display: flex;
    align-items: center;
    justify-content: start;
}
</style>
<style scoped lang="scss">
.shortcuts-container {
    background: #000000c0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    overflow-x: scroll;
    box-shadow: inset 0 0 5px #ffffff88;
    border-radius: 30px;
    padding: 2px;
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
    height: 90%;
    padding: 0 10px;
}
.btn {
    font-size: 0.9rem;
    line-height: 2rem;
    background: #00000090;
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
