import React from 'react';
import {render} from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';
import RouterEntry from './RouterEntry';

render(
  <RouterEntry/>,
   document.getElementById('root'));
registerServiceWorker();
