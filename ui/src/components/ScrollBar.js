import React,{Component} from   'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import AppBar from 'material-ui/AppBar'
import Tabs,{Tab} from 'material-ui/Tabs';
import LeftDrawer from './LeftDrawer';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';

const styleSheet =theme=>({
    appbar:{
        width:'100%',
        marginTop:0,
        backgroundColor:theme.palette.background.paper,
        flexDirection:'row',
    },
    flexMenu:{
        flexGrow:1,
    },
    flexTabs:{
        flexGrow:5,
    },

    list:{
        width:250,
        flex:'initial',
    }
});



class ScrollableTab extends Component{
    constructor(props){
        super(props);

        this.state={
            index:0,
            open:false,
        };
        this.handleClose=this.handleClose.bind(this);
        this.handleOpen=this.handleOpen.bind(this);
    }
    componentWillMount(){

    }

   
    handleClose(){
        this.setState({
            open: false,
        });
    }

    handleOpen(e){
        console.log('click open');
        this.setState({
            open:true,
        })
    }
    render(){
        const classes= this.props.classes;
        const props = this.props;
        const state=this.state;
        const {current} =this.props;
        return (
            <div>
                <LeftDrawer open={state.open} onRequestClose={this.handleClose}/>
                <AppBar position="static" color="default" className={classes.appbar}>
                    <IconButton color="primary" aria-label="Menu" className={classes.flexMenu} onClick={this.handleOpen}>
                        <MenuIcon/>
                    </IconButton>
                    <Tabs
                        className={classes.flexTabs}
                        value={current}
                        onChange={props.handleChange}
                        indicatorColor="contrast"
                        textColor="primary"
                        centered={false}
                        scrollable
                        scrollButtons="auto"
                    >
                        {props.sources.map((source,index)=><Tab label={source} key={index}/>)}
                        
                    </Tabs>
                </AppBar>
            </div>
        );
    }
}
ScrollableTab.propTypes={
    classes:PropTypes.object.isRequired,
    sources:PropTypes.array.isRequired,
    current:PropTypes.number.isRequired,
};

export default withStyles(styleSheet)(ScrollableTab);
