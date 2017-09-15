import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Guide from './components/news/Guide';
import Blogs from './components/blog/Blogs';
import BookList from './components/books/BookList';
import {ProgressHint} from './components/ProgressHint';
import SnackBar from 'material-ui/Snackbar';

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            source: props.source,
            isFetching: false,
            error: false
        }
    }

    disableHint() {
        this.setState({isFetching: false});
    }

    enableHint() {
        this.setState({isFetching: true});
    }

    handleError() {
        this.setState({error: true})

    }

    disableError() {
        this.setState({error: false})
    }

    renderContent(source) {
        let content;
        switch (source) {
            case 'bbc':
            case 'cnn':
            case 'reuters':
                content = <Guide
                    source={source}
                    handleError={this
                    .handleError
                    .bind(this)}
                    disableHintHandler={this
                    .disableHint
                    .bind(this)}
                    enableHintHandler={this
                    .enableHint
                    .bind(this)}/>;
                break;
            case 'medium':
                content = <Blogs/>;
                break;
            case 'mbook':
                content = <BookList/>;
                break;
            default:
                content = null;
                break;
        }
        return content;
    }
    render() {
        let {source} = this.props;
        console.log(source);
        let {isFetching} = this.state;
        return (
            <div style={{
                position: 'relative'
            }}>
                {this.renderContent(source)}
                <ProgressHint show={isFetching}/>
                <SnackBar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                    open={this.state.error}
                    SnackbarContentProps={{
                    'aria-describedby': 'message-id'
                }}
                    message={< span id = "message-id" > Oops !Terrible !Please refresh !</span>}
                    onRequestClose={this
                    .disableError
                    .bind(this)}/>
            </div>
        )
    }
}
MainContainer.PropTypes = {
    source: PropTypes
        .oneOf(['bbc', 'cnn', 'reuters', 'medium', 'book'])
        .isRequired
}
export default MainContainer;