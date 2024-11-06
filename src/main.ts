import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import 'vuetify/styles'; // Importa los estilos de Vuetify
import "./helpers/dom.helpers";
import { RegisterGlobalComponents } from "./components/globals/global-components";

// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

const app = createApp(App);

RegisterGlobalComponents(app);

app.use(vuetify);
// app.use(router);
app.mount('#app')
    .$nextTick(() => {
        postMessage({ payload: 'removeLoading' }, '*');
    });
