import React, { Component } from 'react';
import PropType from 'prop-types';
import SliderDotsCss from './slider-dots.css';

class SliderDots extends Component {
    constructor(props) {
        super(props)
    }

    handleDotClick(i) {

    }

    render() {
        let dotNodes = [];
        let { count, current } = this.props;

        for (let i = 0; i < count; i++) {
            dotNodes[i] = (
                <span
                    key={'dot' + i}
                    className={'slider-dot' + (i === current ? ' slider-dot-selected' : '')}
                    onClick={this.handleDotClick.bind(this, null)}
                />
            );
        }

        return (
            // <style>
            //     .slider-dot{
            //         display:inline-block,
                    
            //     }

            // </style>
            <div className="slider-dots-wrap" style={{
                zIndex: 99,
                width: '100%',
                position: 'absolute',
                bottom: 0,
                textAlign: 'center',
            }}>
                {dotNodes}
            </div>
        )
    }
}

SliderDots.PropType={
    current:PropType.number.isRequired,
    count :PropType.number.isRequired,
}


export default SliderDots;