<template>
    <div class="shorcuts-container">
        <my-button folder-path="/home/lucas/Desktop/my-projects/maizplus-ambientaciones-api" :classes="['pulse-yellow']">
            <!-- <div class="circle bg-yellow mr-2"></div> -->
            🌽
        </my-button>
        <my-button folder-path="/home/lucas/Desktop/my-projects/maizplus-api" :classes="['pulse-aqua']">
            <!-- <div class="circle bg-aqua mr-2"></div> -->
            🌽
        </my-button>
        <my-button folder-path="/home/lucas/Desktop/my-projects/maizplus-front" :classes="['pulse-green']">
            <!-- <div class="circle bg-green mr-2"></div> -->
            🌽
        </my-button>

        <div class="mx-1">|</div>

        <my-button folder-path="/home/lucas/Desktop/my-projects/agroideas-in-api" :classes="['pulse-aqua']">
            <!-- <div class="circle bg-aqua mr-2"></div> -->
            💰
        </my-button>
        <my-button folder-path="/home/lucas/Desktop/my-projects/agroideas-in-front" :classes="['pulse-green']">
            <!-- <div class="circle bg-green mr-2"></div> -->
            💰
        </my-button>

        <div class="mx-1">|</div>

        <my-button folder-path="/home/lucas/Desktop/my-projects/my-shortcuts-app" :classes="['pulse-purple']">
            <!-- <div class="circle bg-purple mr-2"></div> -->
            ⚛️
        </my-button>
        <my-button folder-path="/home/lucas/Desktop/my-projects/twitch-extensions" :classes="['pulse-aqua']">
            <!-- <div class="circle bg-aqua mr-2"></div> -->
            🧩
        </my-button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Shortcuts",
});
</script>

<style scoped lang="scss">
.shorcuts-container {
    display: flex;
    align-items: center;
    justify-content: start;
    // padding: 10px;
    border-radius: 15px;
    width: 100%;
    overflow-x: scroll;
}
.circle {
    border-radius: 50%;
    width: 15px;
    height: 15px;
}

$size-pulse: 3px;
// Mixin para crear animación de pulso con color variable
@mixin pulse-animation($color) {
    animation: pulse-#{"#{$color}"} 3s infinite linear;
    border: 1px solid rgba($color, 0.9);

    @keyframes pulse-#{"#{$color}"} {
        0% {
            box-shadow: inset 0 0 $size-pulse var(--#{$color}), inset 0 0 $size-pulse var(--#{$color});
        }
        50% {
            box-shadow: inset 0 0 $size-pulse var(--black), inset 0 0 $size-pulse var(--black);
        }
        100% {
            box-shadow: inset 0 0 $size-pulse var(--#{$color}), inset 0 0 $size-pulse var(--#{$color});
        }
    }
}
// Clases que usan la animación de pulso con diferentes colores
.pulse-yellow {
    @include pulse-animation(yellow);
}

.pulse-blue {
    @include pulse-animation(blue);
}

.pulse-green {
    @include pulse-animation(green);
}

.pulse-purple {
    @include pulse-animation(purple);
}
.pulse-aqua {
    @include pulse-animation(aqua);
}
</style>

<style lang="scss"></style>
