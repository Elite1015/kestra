import {setup} from "@storybook/vue3";
import {withThemeByClassName} from "@storybook/addon-themes";
import initApp from "../src/utils/init";
import stores from "../src/stores/store";

import "../src/styles/vendor.scss";
import "../src/styles/app.scss";
import en from "../src/translations/en.json";

window.KESTRA_BASE_PATH = "/ui";
window.KESTRA_UI_PATH = "./";

/**
 * @type {import('@storybook/vue3').Preview}
 */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByClassName({
        themes: {
          light: "light",
          dark: "dark",
        },
        defaultTheme: "light",
      })
  ]
};
window.KESTRA_BASE_PATH = "/ui";
console.log("preview", window.KESTRA_BASE_PATH);

setup((app) => {
    window.KESTRA_BASE_PATH = "/ui";
    console.log("setup", window.KESTRA_BASE_PATH);
    initApp(app, [], stores, en).then(() => {
        window.KESTRA_BASE_PATH = "/ui";
        console.log("init done", window.KESTRA_BASE_PATH);
    });
});

export default preview;
