import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import NavBar from '../NavBar';
import {AllNewsFields, NewsListItemFields} from '../../constants/Constants';
import {TaggedLifeNewss, TaggedCommonNewss} from './TaggedNewss';
import {Tags} from '../../constants/Constants';
import {withStyles} from 'material-ui/styles';

const CSS = {
    root: {},
    tagged: {
        marginTop: "5px",
        height: '100%'
    }
}

class TaggedNewssContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sources: [
                'bbc', 'reuters', 'cnn'
            ],
            tags: [],
            cS: 0,
            cT: 0,
            data: []
        }
    }

    fetchData(source, tag, count, fields) {
        let client = window.client;
        const _this = this;
        client
            .getNewsByTag(source, tag, count, NewsListItemFields)
            .then(datas => {
                _this.setState({data: datas})
            })
    }

    componentDidMount() {
        let {source, tag} = this.props.match.params;
        let {sources, cS, cT} = this.state;
        this.setState({
            tags: Tags[source],
            cT: Tags[source].indexOf(tag),
            cS: sources.indexOf(source)
        })
        this.fetchData(source, tag, 6, AllNewsFields);
    }

    componentWillReceiveProps(nextProps) {}
    /**
     *
     * TODO: potential bug
     * @param {*} e
     * @param {*} idx
     */

    onSMenuItemClick(e, idx) {
        let selectedSource = this.state.sources[idx];
        if (idx !== this.state.cS) {
            this.setState({cS: idx, tags: Tags[selectedSource]});
            let {sources, tags, cS, cT} = this.state;
            this.fetchData(sources[idx], tags[cT], 6, AllNewsFields);
        }

    }
    onTMenuItemClick(e, idx) {
        if (idx !== this.state.cT) {
            this.setState({cT: idx})
            let {sources, tags, cS, cT} = this.state;
            this.fetchData(sources[cS], tags[idx], 6, AllNewsFields);
        }
    }

    render() {
        let {classes} = this.props;
        let taggedNews = null;
        if (this.state.tags.length !== 0) {
            if (this.state.tags[this.state.cT].toLowerCase() === 'life') {
                taggedNews = <TaggedLifeNewss
                    source={this.state.sources[this.state.cS]}
                    tag={this.state.tags[this.state.cT]}
                    newss={this.state.data}/>;
            } else 
                taggedNews = <TaggedCommonNewss
                    source={this
                    .state
                    .sources[this.state.cS]
                    .toLowerCase()}
                    tag={this
                    .state
                    .tags[this.state.cT]
                    .toLowerCase()}
                    newss={this.state.data}/>

            return (
                <div className={classes.root}>
                    <NavBar
                        sources={this.state.sources}
                        tags={this.state.tags}
                        cSIdx={this.state.cS}
                        cTIdx={this.state.cT}
                        handleSourceItemClick={this
                        .onSMenuItemClick
                        .bind(this)}
                        handleTagItemClick={this
                        .onTMenuItemClick
                        .bind(this)}/>
                    <div className={classes.tagged}></div>
                    {taggedNews}
                </div>
            )
        } else 
            return null;
        }
    }

export default withStyles(CSS)(TaggedNewssContainer);