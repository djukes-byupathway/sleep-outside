import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert.js";

loadHeaderFooter();

// Load and display any announcement alerts
const alert = new Alert();
alert.render();


