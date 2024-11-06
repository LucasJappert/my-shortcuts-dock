import { App } from 'vue';
import MyButton from './MyButton.vue';

export function RegisterGlobalComponents(app: App) {
    app.component('my-button', MyButton);
}
