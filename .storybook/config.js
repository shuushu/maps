import { configure, addDecorator } from "@storybook/vue";
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.css";
import '@mdi/font/css/materialdesignicons.css'
import { withKnobs } from '@storybook/addon-knobs';

Vue.use(Vuetify, {
    iconfont: 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
});

addDecorator(() => ({
    template: "<v-app><story/></v-app>"
}));

// automatically import all files ending in *.stories.js
const req = require.context("../stories", true, /.stories.js$/);
function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);