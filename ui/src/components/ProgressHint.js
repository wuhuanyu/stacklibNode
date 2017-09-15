import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CircularProgress} from 'material-ui/Progress';

export const ProgressHint = ({show}) => {
    return (
        <div
            style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)'
        }}>
            {show
                ? <CircularProgress/>
                : null
}
        </div>
    )
}