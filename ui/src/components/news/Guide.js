import React, {Component} from 'react';
import PropTypes from 'prop-types';
import NewsByTag from './NewsByTag';
import Header from './Header';
import {NewsListItemFields} from '../../constants/Constants';
import {domain, host, port} from '../../constants/Constants';
import {capitalize} from '../../utility/Utils';
import {Link} from 'react-router-dom';
import {Tags} from '../../constants/Constants';

const cloneDeep = require('clone-deep');
const tag_img__base = `http://${host}:${port}/static/images/`;

class Guide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerData: {},
            listData: {}
        }
    }

    static get component() {
        return "[Guide]";
    }
    componentWillUnmount() {
        this
            .props
            .disableHintHandler();
    }

    handlerError() {
        this
            .props
            .handleError();
    }

    fetchData(source) {
        let client = window.client;
        let _this = this;
        this.setState({headerData: {}, listData: {}})
        Tags[source].forEach(tag => client.getNewsRecent(source, tag, 2, NewsListItemFields).then(datas => {
            let newListData = cloneDeep(this.state.listData);
            newListData[tag] = datas
            this.setState({listData: newListData})
        }).catch(e => {
            _this.handlerError();
        }))
        client
            .getNewsRecent(source, 'tech', 1, NewsListItemFields)
            .then(data => {
                _this
                    .props
                    .disableHintHandler();
                this.setState({headerData: data[0]});
            })
            .catch(e => {
                _this.handleError();
            })

    }
    componentWillReceiveProps(nextProps) {
        let {source} = nextProps;
        let oldSource = this.props.source;
        if (source !== oldSource) {
            this
                .props
                .enableHintHandler();
            this.fetchData(source);
        }
    }

    componentDidMount() {
        this
            .props
            .enableHintHandler();
        this.fetchData(this.props.source);
    }

    render() {
        let {listData} = this.state;
        let state = this.state;
        let {source} = this.props;
        let newsbytags = Object
            .getOwnPropertyNames(listData)
            .map(tag => {
                let dataByTag = listData[tag];
                return (<NewsByTag
                    key={tag}
                    source={source}
                    tag={capitalize(tag)}
                    newss={dataByTag}
                    tag_img_url={tag_img__base + tag + ".jpg"}/>)
            });
        return (
            <div>
                <Link
                    to={`/${source}/${state.headerData._id}`}
                    style={{
                    textDecoration: 'none'
                }}>
                    <Header
                        id={state.headerData && state.headerData._id}
                        title={state.headerData && state.headerData.title}
                        summary={state.headerData && state.headerData.summary}
                        img={state.headerData.image_urls && state.headerData.image_urls[0]}/>
                </Link>

                {newsbytags}
            </div>
        )
    }
}

Guide.propTypes = {
    source: PropTypes.string.isRequired,
    disableHintHandler: PropTypes.func.isRequired,
    enableHintHandler: PropTypes.func.isRequired
};

export default Guide;
