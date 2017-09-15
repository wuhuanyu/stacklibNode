import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BlogItem from './BlogItem';
import Divider from 'material-ui/Divider';
import {withStyles} from 'material-ui/styles';
import {capitalize, num2Time} from '../../utility/Utils';
import {Link} from 'react-router-dom';

const CSS = theme => ({});

class Blogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogsData: []
        }
    }

    componentDidMount() {
        console.log('Blog mounted');
        let client = window.client;
        let _this = this;
        client
            .getMediumRecent(5, ['title', 'id', 'summary', 'image_urls', 'crawled_at'])
            .then(res => {
                console.log(res.length);
                _this.setState({blogsData: res});
            });
    }

    componentWillUnmount() {
        // console.log('Blog umount');
    }

    render() {
        let {blogsData} = this.state;
        
        console.log(blogsData.length);
        let blogItems = blogsData.map((blog, idx) => {
            return <div>
                <Link to={`/medium/${blog._id}`} style={{textDecoration:'none'}}>
                <BlogItem
                    key={blog._id}
                    title={blog.title}
                    crawled_at={num2Time(blog.crawled_at)}
                    img_urls={blog.image_urls}
                    summary={blog.summary}/>
                    </Link>
                <Divider
                    key={idx}
                    style={{
                    marginTop: '2px'
                }}/>
            </div>
        });
        return <div>
            {blogItems}
        </div>;
    }
}

export default Blogs;

// Blogs.PropTypes = {     blogs: PropTypes.array.isRequired }