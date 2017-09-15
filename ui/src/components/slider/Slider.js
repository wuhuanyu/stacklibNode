import React, { Component } from 'react'
import PropType from 'prop-types';
import SliderDots from './SliderDots'

import SliderItem from './SliderItem';

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0
        }
    }

    turn(n) {
        let _n = this.state.current + n;
        this.setState({
            current: _n % this.props.items.length
        })
    }

    componentDidMount() {
        this.autoPlay();
    }

    stopPlay() {
        
        clearInterval(this.flipper);
    }

    autoPlay() {
        let _this = this;
        this.flipper = setInterval(function () {
            _this.turn(1);
        }, _this.props.interval*1000);
    }



    componentWillUnmount() {
        this.stopPlay();
    }

    render() {

        let itemNodes = this.props.items.map((item, idx) => {
            return <SliderItem item={item} count={this.props.items.length} key={'item' + idx} />
        })

        return (
            <div style={{
                overflow: 'hidden',
                width: '100%',
                position: 'relative',
            }}>
                <ul
                    onMouseOver={this.stopPlay.bind(this)}
                    onMouseOut={this.autoPlay.bind(this)}
                    style={{
                        overflow: 'hidden',
                        position: 'relative',
                        height: 'auto',
                        width: this.props.items.length * 100 + '%',
                        left: -this.state.current * 100 + '%',

                        transition: 'left 1s'
                    }}>
                    {itemNodes}
                </ul>
                <SliderDots count={this.props.items.length} current={this.state.current} />
            </div>
        )
    }
}

Slider.propTypes = {
    items: PropType.array.isRequired,
    auto: PropType.bool.isRequired,
    interval: PropType.number.isRequired
}


export default Slider;