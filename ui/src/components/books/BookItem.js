import React from 'react';
import Card, {CardContent, CardMedia} from 'material-ui/Card';
import PropType from 'prop-types';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';
import Divider from 'material-ui/Divider';

const CSS = theme => ({
    root: {
        display: 'flex',
        marginBottom:'5px',
    },

    imageContainer: {
        width: '40%',
        height: 'auto',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
    },
    image: {
        width: '100%',
        height: 'auto',

    },

    detail: {
        width: '60%',
        // height:'200',
        flexDirection: 'column'
    },
    title: {
        flexGrow: 1
    },

    summary: {
        flexGrow: 5
    }

});

const BookItem = ({
    _id,
    crawled_at,
    title,
    img_url,
    summary,
    classes
}) => {
    return (
        <div>
            <Card className={classes.root}>
                <CardMedia className={classes.imageContainer}>
                    <img
                        src={img_url && img_url[0]}
                        alt={"Eh,Something happened"}
                        className={classes.image}/>
                </CardMedia>
                <CardContent className={classes.detail}>
                    <Typography className={classes.title} type="subheading">
                        {title}
                    </Typography>
                    <Divider/>
                    <Typography className={classes.summary}>
                        {summary}
                        {/* {summary} */}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
};

BookItem.PropType = {
    _id: PropType.string.isRequired,
    crawled_at: PropType.number.isRequired,
    title: PropType.string.isRequired,
    img_url: PropType.array.isRequired,
    summary: PropType.array.isRequired,
    classes: PropType.object.isRequired
}

export default withStyles(CSS)(BookItem);