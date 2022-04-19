import { clientPlugin, defineConfig } from '@vitebook/client/node';
import { preactPlugin } from '@vitebook/preact/node';
import { defaultThemePlugin } from '@vitebook/theme-default/node';

export default defineConfig({
  include: ['src/**/*.story.{jsx,tsx}'],
  plugins: [
    preactPlugin({ appFile: 'App.jsx' }),
    clientPlugin(),
    defaultThemePlugin(),
  ],
  site: {
    title: 'guap',
    description: '',
    /** @type {(import('@vitebook/theme-default/node').DefaultThemeConfig} */
    theme: {},
  },
});
