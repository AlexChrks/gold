import './index.html';
import '../src/styles/styles.css';

require("@babel/polyfill");
require('es6-promise').polyfill();
require('fetch-everywhere');

import ratesApp from './scripts/ratesApp';

const wrapper = document.querySelector('.global-wrapper');

ratesApp(wrapper);
