<template>
    <template v-for="(shortcut, index) in items" :key="index">
        <my-button v-if="shortcut" :shortCut="shortcut" :classes="shortcut?.classes">
            <!-- <span v-if="shortcut?.actionUrl">
                {{ shortcut.actionUrl }}
            </span> -->
            <img class="icon-image" v-if="shortcut?.iconPath" :src="shortcut?.iconPath" :alt="shortcut?.iconPath" />
        </my-button>

        <div v-if="shortcut == null" class="mx-0">|</div>
    </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IShortCut } from "./models/ShortCut.model";

export default defineComponent({
    name: "Shortcuts",
    props: {
        items: {
            type: Array<IShortCut | null>,
            default: () => [],
        },
    },
});
</script>

<style scoped lang="scss">
.my-container {
    display: flex;
    align-items: center;
    justify-content: start;
    // padding: 10px;
    border-radius: 15px;

    &.one-row {
        grid-template-columns: 1fr 1fr;
    }
}
.circle {
    border-radius: 50%;
    width: 15px;
    height: 15px;
}

$size-pulse: 3px;
// Mixin para crear animación de pulso con color variable
@mixin pulse-animation($color) {
    // animation: pulse-#{"#{$color}"} 3s infinite linear;
    border: 2px solid rgba($color, 0.9);

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
    @include pulse-animation(deepSkyBlue);
}

.pulse-green {
    @include pulse-animation(green);
}

.pulse-purple {
    @include pulse-animation(blueViolet);
}
.pulse-aqua {
    @include pulse-animation(aqua);
}
.pulse-red {
    @include pulse-animation(red);
}
.pulse-white {
    @include pulse-animation(white);
}
.pulse-black {
    @include pulse-animation(black);
}
.pulse-magenta {
    @include pulse-animation(magenta);
}
.pulse-steelblue {
    @include pulse-animation(steelblue);
}
.icon-image {
    height: 95%;
    max-height: 95%;
    max-width: 100%;
    border-radius: 100%;
}
</style>

<style lang="scss"></style>
