import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import FeedBack from 'material-ui-icons/Feedback';
import {Link} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import doge from '../imgs/doge.jpg';
import {constructImgUrl} from '../client/urlConstruct';
import Info from 'material-ui-icons/Info';


const styleSheet = theme => ({
    list: {
        width: 250,
        flex: 'initial'
    }
});

class LeftDrawer extends Component {

    render() {
        const classes = this.props.classes;
        const props = this.props;
        return (
            <div>
                <Drawer anchor="left" open={props.open} onRequestClose={props.onRequestClose}>
                    <div
                        style={{
                        width: 250,
                        position: 'relative'
                    }}>
                        <img
                            src={constructImgUrl('books_drawer')}
                            style={{
                            width: "100%",
                            height: 'auto'
                        }}/>
                        <Avatar
                            src={doge}
                            style={{
                            width: '80px',
                            height: '80px',
                            position: 'absolute',
                            top: '60px',
                            left: '60px'
                        }}/>
                    </div>
                    <div>
                        <List disablePadding className={classes.list}>
                            <Link
                                exact
                                to="/beauty"
                                style={{
                                textDecoration: 'none'
                            }}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <ThumbUpIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="福利"/>
                                </ListItem>
                            </Link>
                            <Link
                                exact
                                to="/feedback"
                                style={{
                                textDecoration: 'none'
                            }}>

                                <ListItem button>
                                    <ListItemIcon>
                                        <FeedBack/>
                                    </ListItemIcon>
                                    <ListItemText primary="反馈"/>
                                </ListItem>
                            </Link>

                            <Link
                                exact
                                to="/about"
                                style={{
                                textDecoration: 'none'
                            }}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <Info/>
                                    </ListItemIcon>
                                    <ListItemText primary="About"/>
                                </ListItem>
                            </Link>
                            {/* <div>
                                <ListItem button>
                                    <ListItemIcon>
                                        <InboxIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Inbox"/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon>
                                        <StarIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Starred"/>
                                </ListItem>
                            </div> */}
                        </List>
                        {/* <Divider/>
                        <List disablePadding className={classes.list}/> */}
                        <div>
                            {/* <ListItem button>
                                <ListItemIcon>
                                    <MailIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Mail"/>
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <DeleteIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Delete"/>
                            </ListItem>
                                                   <ListItem button>
                                <ListItemIcon>
                                </ListItemIcon>
                                <ListItemText primary="反馈"/>
                            </ListItem> */}
                        </div>
                    </div>
                </Drawer>
            </div>
        )
    }
    componentDidMount() {}

    componentWillUnmount() {}
}

LeftDrawer.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styleSheet)(LeftDrawer);