import {setup} from "@storybook/vue3";
import {createI18n} from "vue-i18n";
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

const i18n = createI18n({
  locale: "en",
  messages: {en},
  legacy: false,
});

setup((app) => {
  initApp(app, [], stores, en);
  app.use(i18n);
});

export default preview;
