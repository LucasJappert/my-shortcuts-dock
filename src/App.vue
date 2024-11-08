<script setup lang="ts">
import { ipcRenderer } from "electron";
import { IShortCut } from "./components/models/ShortCut.model";
import Shortcuts from "./components/Shortcuts.vue";
import whatsappIcon from "@/assets/whatsapp.png";

const closeButton = () => {
    window.electronAPI.closeButton();
};

const FirstShortCuts = () => {
    const items: Array<null | IShortCut> = [];

    items.push({
        folderPath: "/home/lucas/Desktop/my-projects/maizplus-ambientaciones-api",
        classes: ["pulse-yellow"],
        iconPath: new URL("@/assets/farm.svg", import.meta.url).href,
        action: () => {
            window.electronAPI.openFolderInVSCode("/home/lucas/Desktop/my-projects/maizplus-ambientaciones-api");
        },
    });
    items.push({
        folderPath: "/home/lucas/Desktop/my-projects/maizplus-api",
        classes: ["pulse-blue"],
        iconPath: new URL("@/assets/farm.svg", import.meta.url).href,
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
        classes: ["pulse-purple"],
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
        classes: ["pulse-green"],
        iconPath: new URL("@/assets/notepad.svg", import.meta.url).href,
        linkWeb: "https://speedy-notes.netlify.app/",
        action: () => {
            window.open("https://speedy-notes.netlify.app/", "_blank");
        },
    });
    items.push({
        classes: ["pulse-green"],
        iconPath: new URL("@/assets/whatsapp.png", import.meta.url).href,
        linkWeb: "https://web.whatsapp.com/",
        action: () => {
            window.open("https://speedy-notes.netlify.app/", "_blank");
        },
    });

    items.push(null);
    items.push({
        classes: ["pulse-red"],
        iconPath: new URL("@/assets/gmail.svg", import.meta.url).href,
        linkWeb: "https://web.whatsapp.com/",
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
        classes: ["pulse-blue"],
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
    // background: #000000c0;
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
    box-shadow: 0 0 5px #ffffff;
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
.shortcuts-container {
    background: #000000c0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    overflow-x: scroll;
    box-shadow: 0 0 10px #ffffff88;
    border-radius: 30px;
    padding: 5px;
}
</style>
