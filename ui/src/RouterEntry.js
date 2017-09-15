import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import App from './App';
import About from './components/others/About';
import Feedback from './components/others/Feedback';
import TaggedNewsContainer from './components/news/TaggedNewssContainer';
import Article from './components/news/Article';
import Beauty from './components/others/Beauty';
const RouterEntry = (props) => {
    return (
        <Router>
            <div>
                <Route path={"/"} exact component={App}/>
                <Route path={"/beauty"} exact component={Beauty}/>
                <Route path={"/about"} exact component={About}/>
                <Route path={"/feedback"} exact component={Feedback}/>
                <Route path={"/tag/:source/:tag"} exact component={TaggedNewsContainer}/>
                <Route path={"/:source/:id"} exact component={Article}/>
            </div>
        </Router>
    )
}

export default RouterEntry;