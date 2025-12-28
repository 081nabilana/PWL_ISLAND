import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { sessionManager } from "./utils/sessionManager";

const app = createApp(App);

app.use(router);

app.mount("#app");

// Initialize session manager dengan passing router
sessionManager.setupActivityListeners(router);
sessionManager.startSessionCheck(router);
