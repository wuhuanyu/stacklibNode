import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';
import {BrowserRouter as Router} from 'react-router-dom';
import TaggedNewsContainer from './components/news/TaggedNewssContainer';
import RouterEntry from './RouterEntry';
import Article from './components/news/Article';
import Feedback from './components/others/Feedback';
import About from './components/others/About';

render(
  <RouterEntry/>,
   document.getElementById('root'));
registerServiceWorker();
