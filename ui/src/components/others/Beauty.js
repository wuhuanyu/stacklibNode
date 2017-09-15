import React, {Component} from 'react';
import withAppBar from './withAppBar';

const api = "http://gank.io/api/data/%E7%A6%8F%E5%88%A9/5/1";



class Beauties extends Component {
    constructor(props) {
        super(props);
        this.state = {
            urls: []
        }
    }

    componentDidMount() {
        fetch(api).then(res => {
            let json = res.json();
            if (res.status === 200) 
                return json;
            else 
                throw("Error");
            }
        ).then(data => {
            let urls = data
                .results
                .map(r => r.url);
            this.setState({urls: urls})
        }).catch(e => {
            console.log(e);
        })

    }

    render() {
        let {urls} = this.state;
        return (
                <div style={{marginTop:'3px'}}>
                {urls.map(url =>< img key = {url} src = {url} style={{width:'100%',height:'auto'}}/>)}
                </div>
        )
    }
}

export default withAppBar(Beauties,"福利");