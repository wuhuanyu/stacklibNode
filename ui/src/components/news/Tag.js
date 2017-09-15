import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import ButtonBase from 'material-ui/ButtonBase';

const CSS = theme => ({
    root: {
        marginTop: theme.spacing.unit * 4,
        display: 'flex',
        width: '100%',
        margin: '5px auto'
    },
    image: {
        position: 'relative',
        height: 100,
        '&:hover': {
            zIndex: 1
        },
        '&:hover $imageBackdrop': {
            opacity: 0.15
        },
        '&:hover $imageMarked': {
            opacity: 0
        },
        '&:hover $imageTitle': {
            border: '4px solid currentColor'
        }
    },
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%'
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background: theme.palette.common.black,
        opacity: 0.4,
        transition: theme
            .transitions
            .create('opacity')
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`
    },
    imageMarked: {
        height: 3,
        width: 18,
        background: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme
            .transitions
            .create('opacity')
    }
});

const Tag = (props) => (
        <ButtonBase
            focusRipple
            className={props.classes.image}
            style={{
            width: '100%'
        }}>
            <div
                className={props.classes.imageSrc}
                style={{
                backgroundImage: `url(${props.tag_img_url})`
            }}/>
            <div className={props.classes.imageBackdrop}/>
            <div className={props.classes.imageButton}>
                <Typography
                    component="h1"
                    type="headline"
                    color="inherit"
                    className={props.classes.imageTitle}>
                    {props.tag}
                    <div className={props.classes.imageMarked}/>
                </Typography>
            </div>
        </ButtonBase>
)


Tag.PropTypes={
    tag:PropTypes.string.isRequired,
    tag_img_url:PropTypes.string.isRequired,
    classes:PropTypes.object.isRequired,
}

export default withStyles(CSS)(Tag);