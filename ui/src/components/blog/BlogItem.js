import React, {Component} from 'react';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share'
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import List, {ListItem} from 'material-ui/List';
import Card,{CardContent, CardMedia,CardHeader,CardActions} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import ButtonBase from 'material-ui/ButtonBase';
import IconButton from 'material-ui/IconButton';
import red from 'material-ui/colors/red';


const CSS = theme=>({
    card:{
        margin:'5px 2px 1px 2px',
        radius:'20px',
        zIndex:1
    },
    image:{

        width:'100%',
        minHeight:200,
        backgroundSize:'cover',
    },

    avatar:{
        background:red[500],
    }

})

class BlogItem extends Component{
    constructor(props){
        super(props);
    }


    render(){
        let {title,crawled_at,img_urls,summary,classes}=this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader avatar={
                        <Avatar className={classes.avatar}>{title[0].toUpperCase()}</Avatar>
                    }
                    title={title}
                    subheader={crawled_at}
                    />
                    <CardMedia  className={classes.image} image={img_urls&&img_urls[0]}/>

                <CardContent>
                    <Typography component="p">
                        {summary}
                    </Typography>
                </CardContent>
                
                <CardActions disableActionSpacing>
                   <IconButton aria-label="Add to favorites">
                       <FavoriteIcon/>
                   </IconButton>
                   <IconButton aria-label="Share">
                       <ShareIcon/>
                   </IconButton>
                </CardActions>

                </Card>
            </div>
        )
    }
}



BlogItem.PropTypes={
    title:PropTypes.string.isRequrired,
    crawled_at:PropTypes.string.isRequrired,
    img_urls:PropTypes.array.isRequrired,
    summary:PropTypes.string.isRequrired,
    classes:PropTypes.object.isRequrired,
}


export default withStyles(CSS)(BlogItem);
