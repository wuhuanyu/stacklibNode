import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import {CardHeader, CardActions} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import Chip from 'material-ui/Chip';
import Spider from '../../repository/spider.png';
import Schedule from 'material-ui-icons/Schedule';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import {constructImgUrl} from '../../client/urlConstruct';
import MenuIcon from 'material-ui-icons/Menu';
import {AllNewsFields, AllBlogFields} from '../../constants/Constants';
import {num2Time} from '../../utility/Utils';
const CSS = theme => ({
    root: {
        marginTop: '2px',
        position: 'relative',
        height: '100%'
    },
    title: {
        marginTop: '3px',
        marginLeft: '3px'
    },
    summary: {
        marginLeft: '5px',
        marginRight: '5px'
    },
    imgContainer: {},
    img: {
        width: '100%',
        height: 'auto',
        borderRadius: '5px'
    }
})

const Text = ({t}) => (
    <Typography
        paragraph
        style={{
        marginLeft: '5px',
        marginRight: '5px'
    }}>{t}</Typography>
)

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }

    componentDidMount() {
        let {source, id} = this.props.match.params;
        let client = window.client;

        if (source !== 'medium') {
            
            client
                .getNewsById(source, id, AllNewsFields)
                .then(data => {
                    this.setState({data: data});
                })
                .catch(e => console.log(e));

        } else {
            client
                .getMediumById(id, AllBlogFields)
                .then(data => {
                    this.setState({data: data})
                })
                .catch(e => console.log(e));
        }
    }

    render() {
        let {classes} = this.props;
        let {source, id} = this.props.match.params;

        let {
            title,
            text,
            image_urls,
            timestamp,
            url,
            summary,
            _id,
            tag,
            crawled_at,
        } = this.state.data;

        let texts = null;
        if (text) {
            texts = text.map((t, idx) => {
                return <Text key={idx + _id} t={t}/>
            })
        }

        let time = timestamp||crawled_at;
        return (
            <div>
                <AppBar
                    position="static"
                    color="default"
                    style={{
                    width: '100%',
                    display: 'flex',
                    alignContent: 'center'
                }}>
                    <Toolbar disableGutters>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography
                            type="title"
                            color="inherit"
                            className={classes.flex}
                            style={{
                            flex: 1
                        }}>
                            {"News"}
                        </Typography>
                        <IconButton>
                            <ShareIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Paper elevation={2} className={classes.root}>
                    <Typography
                        type="headline"
                        component="h3"
                        gutterBottom
                        className={classes.title}>
                        {title}
                    </Typography>

                    <div
                        style={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        alignItems: 'center'
                    }}>
                        {
                             <Typography
                                    style={{
                                    marginRight: '6px'
                                }}
                                    gutterBottom>
                                    {num2Time(time)}
                                </Typography>
}
                        {tag
                            ? <Chip
                                    label={tag}
                                    style={{
                                    marginRight: '5px'
                                }}/>
                            : null
}
                    </div>

                    <Typography
                        className={classes.summary}
                        type="subheading"
                        gutterBottom
                        style={{
                        clear: 'right'
                    }}>
                        {summary
                            ? "Summary: " + summary
                            : null}
                    </Typography>
                    <div className={classes.imgContainer}>
                        <img src={image_urls && image_urls[0]||constructImgUrl('imgholder')} className={classes.img}/>
                    </div>
                    {texts}
                </Paper>
            </div>
        );
    }

}



Article.PropTypes = {
    source: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    article: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
        timestamp: PropTypes.string.isRequired,
        crawled_at: PropTypes.number.isRequired,
        image_urls: PropTypes.array.isRequired,
        text: PropTypes.array.isRequired,
        url: PropTypes.string.isRequired,
        tag: PropTypes.string.isRequired
    })
}

export default withStyles(CSS)(Article);