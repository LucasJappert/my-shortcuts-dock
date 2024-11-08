<template>
    <div class="my-container">
        <template v-for="(shortcut, index) in items" :key="index">
            <my-button v-if="shortcut" :shortCut="shortcut" :classes="shortcut?.classes">
                <span v-if="shortcut?.title">
                    {{ shortcut.title }}
                </span>
                <img class="icon-image" v-if="shortcut?.iconPath" :src="shortcut.iconPath" :alt="shortcut.iconPath" />
            </my-button>

            <!-- <link-button v-if="shortcut?.linkWeb" :link-web="shortcut.linkWeb" :classes="shortcut.classes">
                {{ shortcut.title }}
            </link-button> -->

            <div v-if="shortcut == null" class="mx-1">|</div>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IShortCut } from "./models/ShortCut.model";

export default defineComponent({
    name: "Shortcuts",
    props: {
        items: {
            type: Array as () => IShortCut[],
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
.pulse-red {
    @include pulse-animation(red);
}
.pulse-white {
    @include pulse-animation(white);
}
.pulse-magenta {
    @include pulse-animation(magenta);
}
.pulse-steelblue {
    @include pulse-animation(steelblue);
}
.icon-image {
    height: 90%;
    max-height: 100%;
    max-width: 30px;
}
</style>

<style lang="scss"></style>
