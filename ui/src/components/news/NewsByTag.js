import React, {Component} from 'react';
import PropTypes from 'prop-types';
import NewsListItem from './NewsListItem';
import Tag from './Tag';
import {host, port} from '../../constants/Constants';
import {Link} from 'react-router-dom';

const tag_img_url = `http://${host}:${port}/static/images/`;

class NewsByTag extends Component {
    render() {
        let {newss, classes, tag_img_url, tag, source} = this.props;
        let items = newss.map((d, idx) => <Link
            style={{
            textDecoration: 'none'
        }}
            to={`/${source}/${d._id}`}>
            <NewsListItem
                key={d._id + idx}
                title={d.title}
                img={d.image_urls
                ? d.image_urls[0]
                : null}
                id={d._id}/>
        </Link>);
        return (
            <div
                style={{
                marginTop: '10px',
                marginLeft: '5px',
                marginRight: '5px'
            }}>
                <Link
                    style={{
                    textDecoration: 'none'
                }}
                    to={`/tag/${source}/${tag[0].toLowerCase() + tag.slice(1)}`}>
                    <Tag tag={tag} tag_img_url={tag_img_url}/>
                </Link>
                {items}
            </div>

        );
    }
}

NewsByTag.PropTypes = {
    source: PropTypes.string.isRequired,
    newss: PropTypes.array.isRequired,
    tag_img_url: PropTypes.object.isRequired,
    tag: PropTypes.string.isRequired
}

export default NewsByTag;