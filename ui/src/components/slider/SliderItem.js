import React, {Component} from 'react';
import PropType from 'prop-types';

class SliderItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {count, item} = this.props;
        let width = 100 / count + '%';
        return (
            <li
                className="slider-item"
                style={{
                display: 'inline-block',
                height: 'auto',
                width: width
            }}>

                <img
                    src={item.src}
                    alt={item.alt}
                    style={{
                    height: '250px',
                    width: '100%',
                }}/>
            </li>
        )
    }
}

SliderItem.propTypes = {
    count: PropType.number.isRequired,
    item: PropType.object.isRequired
}

export default SliderItem