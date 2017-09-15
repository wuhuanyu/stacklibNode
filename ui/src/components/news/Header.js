import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {BrowserRouter as Router, Link, Route, NavLink} from 'react-router-dom';

const CSS = (theme) => ({
    card: {
        maxWidth: '100%',
        marginLeft: 5,
        marginRight: 5
    },
    flex: {
        flex: 1
    },
    img: {
        display: 'block',
        paddingTop:'5px',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
        height: 'auto'
    }

});

const Header = (props) => {

    const renderContent = function (props) {
        let {classes} = props;
        return (
            <Card className={classes.card} elevation={1}>
                <CardMedia
                    style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop:'5px',
                }}>
                    <div
                        style={{
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                        <img src={props.img} className={classes.img}/>
                    </div>
                </CardMedia>

                <CardContent>
                    <Typography type="headline" component="h3">
                        {props.title}
                    </Typography>
                    <Typography component="p">
                        {props.summary}
                    </Typography>
                </CardContent>
            </Card>
        );

    }

    const classes = props.classes;
    let content;
    if (props.title || props.summary) 
        content = renderContent(props);
    
    return (

        <div>
            {content}

        </div>
    )
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};
export default withStyles(CSS)(Header);