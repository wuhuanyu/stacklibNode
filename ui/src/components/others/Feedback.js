import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import withAppBar from './withAppBar';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Menu, {MenuItem} from 'material-ui/Menu';
import {withStyles} from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import doge from '../../imgs/doge.jpg';
import doge2 from '../../imgs/doge2.jpg';
const postApi = "";

const CSS = () => ({});
class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [
                'UI', '内容', 'Stack太帅'
            ],
            open: false,
            el: undefined,
            category: '',
            text: '',
            cT: 0
        }
    }

    componentDidMount() {
        this.setState({
            el: findDOMNode(this.categoryAnchor)
        })
    }

    closeMenu() {
        this.setState({open: false})
    }
    openMenu() {
        this.setState({open: true})

    }
    onCategoryClick() {
        this.setState({open: true})
    }

    onCategoryItemClick(idx) {
        this.setState({cT: idx, open: false})
    }

    submitFB() {
        console.log('submit');
    }

    clearInput() {
        this.setState({text: ''})
    }
    render() {
        return (
            <div
                style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection:'column',
                justifyContent: 'center',
                height:'500px',
            }}>
                <Avatar
                    style={{
                    width: '100px',
                    height: '100px'
                }}
                    src={doge}/>
                <div style={{width:'100%'}}>
                    <Typography
                        type="title"
                        gutterBottom
                        style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '10px'
                    }}>
                        {"麻烦工作人员递上话筒"}
                    </Typography>
                    <form noValidate onSubmit={this.submitFB}>
                        <div
                            style={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingLeft: '5px'
                        }}>
                            <Typography
                                type="subheading"
                                onClick={this
                                .onCategoryClick
                                .bind(this)}>{"吐槽啥:"}</Typography>
                            <Typography
                                type="subheading"
                                style={{
                                marginLeft: '30px'
                            }}
                                ref={node => this.categoryAnchor = node}>
                                {this.state.categories[this.state.cT]}
                            </Typography>

                        </div>
                        <Menu
                            open={this.state.open}
                            anchorEl={this.state.el}
                            onRequestClose={this
                            .closeMenu
                            .bind(this)}>
                            {this
                                .state
                                .categories
                                .map((cat, idx) => {
                                    return <MenuItem
                                        key={cat}
                                        selected={idx === this.state.cT}
                                        onClick={event => this.onCategoryItemClick(idx)}>
                                        {cat}
                                    </MenuItem>
                                })
}
                        </Menu>
                        <div
                            style={{
                            marginLeft: '5px',
                            marginRight: '5px'
                        }}>
                            <TextField
                                id={"category"}
                                label={"想说啥..."}
                                multiline
                                rowsMax="10"
                                fullWidth
                                value={this.state.text}
                                onChange={e => this.setState({text: e.target.value})}/>
                        </div>
                        <div
                            style={{
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            paddingRight: '5px'
                        }}>

                            <Button type="submit">
                                {"就这样吧"}
                            </Button>
                            <Button
                                onClick={this
                                .clearInput
                                .bind(this)}>
                                {"不想说了"}
                            </Button>
                        </div>
                    </form>
                    <img src={doge2} style={{width:'100%',height:'auto',display:'block',margin:'20px,auto'}}/>
                </div>
            </div>
        )
    }
}

Feedback.PropTypes = {
    categories: PropTypes.array.isRequired
}

export default withAppBar(Feedback, "吐槽");
// export default Feedback;