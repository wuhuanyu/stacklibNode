import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton  from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';

export default (WrappedComponent,title)=>{
    return  class extends Component{
        render(){
            return(
            <div>
            <AppBar position="static" style={{width:'100%'}} color="default">
            <Toolbar disableGutters>
                <IconButton color="default" aria-label="Menu">
                    <MenuIcon/>
                </IconButton>
                <Typography type="title" color="default">
                     {title}
                </Typography>
            </Toolbar>
        </AppBar>
        <WrappedComponent {...this.props}/>
        </div>)
        }
    }
}


