import React, {Component} from 'react';
import Menu, {MenuItem} from 'material-ui/Menu';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import Book from 'material-ui-icons/Book';
import IconButton from 'material-ui/IconButton';
import ToolBar from 'material-ui/Toolbar';
const CSS = {
    root: {
        width: '100%',
        display:'block'
    },

    content: {
        display: 'flex',
        alignItems: 'center'
    },
    source: {
        display: 'inline-block'
    },
    tag: {
        display: 'inline-block'
    }

}

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sMenu: false,
            tMenu: false,
            sAnchor: undefined,
            tAnchor: undefined
        }
    }

    componentDidMount() {
        this.setState({
            sAnchor: findDOMNode(this.sMenuB),
            tAnchor: findDOMNode(this.tMenuB)
        })
    }

    componentDidUpdate() {

        // this.setState({             sAnchor:findDOMNode(this.sMenuB),
        // tAnchor:findDOMNode(this.tMenuB),         })
    }

    onSourceClick() {
        let {sMenu} = this.state;
        this.setState({sMenu: true})
    }
    onTagClick() {
        let {tMenu} = this.state;
        this.setState({tMenu: true})
    }
    onSMenuClose() {
        this.setState({sMenu: false})
    }
    onTMenuClose() {
        this.setState({tMenu: false})
    }

    onSourceItemClick(event, idx) {
        this
            .props
            .handleSourceItemClick(event, idx);
        this.onSMenuClose();
    }
    onTagItemClick(event, idx) {
        this
            .props
            .handleTagItemClick(event, idx);
        this.onTMenuClose();
    }

    render() {
        let {classes, sources, tags, cTIdx, cSIdx} = this.props;
        return (
            <div className={classes.root}>
                <AppBar color="default" position="static">
                    <div className={classes.content}>
                        <IconButton>
                            <Book/>
                        </IconButton>
                        <Button
                            onClick={this
                            .onSourceClick
                            .bind(this)}
                            ref={node => this.sMenuB = node}
                            className={classes.source}Button >
                            {sources[cSIdx]}
                        </Button>

                        <Button
                            onClick={this
                            .onTagClick
                            .bind(this)}
                            ref={node => this.tMenuB = node}
                            className={classes.tag}>
                            {tags[cTIdx]}
                        </Button>

                    </div>

                    <Menu
                        open={this.state.sMenu}
                        anchorEl={this.state.sAnchor}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                        onRequestClose={this
                        .onSMenuClose
                        .bind(this)}>
                        {sources.map((s, idx) => (
                            <MenuItem
                                key={s}
                                selected={idx === cSIdx}
                                onClick={event => this.onSourceItemClick(event, idx)}>
                                {s}
                            </MenuItem >
                        ))}
                    </Menu>

                    <Menu
                        open={this.state.tMenu}
                        anchorEl={this.state.tAnchor}
                        onRequestClose={this
                        .onTMenuClose
                        .bind(this)}>
                        {tags.map((t, idx) => (
                            <MenuItem
                                key={t}
                                selected={idx === cTIdx}
                                onClick={event => this.onTagItemClick(event, idx)}>
                                {t}
                            </MenuItem >
                        ))}
                    </Menu>
                </AppBar>
            </div>
        )
    }
}
NavBar.PropTypes = {
    sources: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired,
    cSIdx: PropTypes.number.isRequired,
    cTIdx: PropTypes.number.isRequired,
    handleSourceItemClick: PropTypes.func.isRequired,
    handleTagItemClick: PropTypes.func.isRequired
}

export default withStyles(CSS)(NavBar);