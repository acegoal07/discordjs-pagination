import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
   {
      files: ['**/*.{js,mjs,cjs}'],
      languageOptions: {
         globals: globals.browser
      }
   },

   js.configs.recommended,

   eslintConfigPrettier,

   {
      files: ['**/*.js'],
      languageOptions: {
         sourceType: 'commonjs'
      }
   }
]);
