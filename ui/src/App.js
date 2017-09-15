import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ScrollableTab from './components/ScrollBar'
import {CircularProgress} from 'material-ui/Progress';
import BlogItem from './components/blog/BlogItem';
import MainContainer from './MainContainer';
import {BrowserRouter as Router} from 'react-router-dom';
import NewsArticleContainer from './components/news/NewsArticleContainer';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    progress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)'
    }
})

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            sources: ['BBC', 'MBOOK', 'REUTERS', 'CNN','MEDIUM']
        };

    }

    handleSwitchTag(e, index) {
        this.setState({current: index});
        window.cacheClient.cache.currentSource= index;
        this.forceUpdate();
    }

    componentDidMount() {}
    render() {
        let {isFetching, sources, current} = this.state;
        return (
            <div>
                <ScrollableTab
                    sources={sources}
                    handleChange={this
                    .handleSwitchTag
                    .bind(this)}
                    current={window.cacheClient.cache.currentSource}/>
                <MainContainer source={sources[window.cacheClient.cache.currentSource].toLowerCase()}/>
            </div>

        )
    }
}

export default withStyles(styles)(App);
