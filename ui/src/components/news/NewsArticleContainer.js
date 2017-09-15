import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {AllNewsFields} from '../../constants/Constants';
import Article from './Article';
import {num2Time} from '../../utility/Utils';

class NewsArticleContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }

    fetchData(source, _id) {
        // mockClient
        //     .getNewsById(source, _id, AllNewsFields)
        //     .then(res => {
        //         console.log(res);
        //         if(res.data.timestamp){
        //             res.data.timestamp=num2Time(res.data.timestamp);
        //         }
        //         this.setState({data: res.data})
        //     })
    };

    componentWillReceiveProps(nextProps) {
        let {nextId, nextSource, nextTag} = nextProps;
        if (nextId !== this.props._id || nextSource !== this.props.source || nextTag !== this.props.tag) {
            this.fetchData(nextSource, nextId);
        }
    };

    componentDidMount() {
       this.fetchData(this.props.source, this.props._id);
    }

    render() {
        return (<Article
            article={this.state.data}
            source={this.props.source}
            tag={this.props.tag}/>)
    }

}

NewsArticleContainer.PropTypes = {
    source: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
}

export default NewsArticleContainer;