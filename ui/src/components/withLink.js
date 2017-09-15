import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
export function withLink(WrapedComponent) {
    return class extends Component {
        static get PropTypes() {
            return WrapedComponent.PropTypes;
        }
        render() {
            return (
                <Link
                    to={WrapedComponent.to}
                    style={{
                    textDecoration: 'none'
                }}>
                    <WrapedComponent {...this.props}/>
                </Link>
            )
        }
    }
}