import pluginVue from "eslint-plugin-vue";
import defineVueEslintConfig from "@vue/eslint-config-typescript";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";

// ESLint 9 flat config，官方说明 https://eslint.org/docs/latest/use/configure/configuration-files
export default defineVueEslintConfig(
  {
    scriptSyntaxes: ['<script setup lang="ts">|<script lang="ts">'],
  },
  pluginVue.configs["flat/essential"],
  skipFormatting,
  {
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    },
  },
);
