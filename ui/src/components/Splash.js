import React,{Component} from 'react'

import Splash3 from '../repository/splash/splash3.png' 

import FastForward from 'material-ui-icons/FastForward'
import  Replay from 'material-ui-icons/Replay'


class Splash extends Component{
    constructor(props){
        super(props)
    }


    handleClick(){
        window.location="/";
    }

    changeImg(){
        console.log('change image')

    }

    

    componentDidMount(){
        setTimeout(()=>{
            console.log('counting')
            // window.location="/"
        },3000)
    }
    
    render(){
        return (
            <div style={{position:'relative'}}>

                <img src={Splash3} style={{width:'auto',maxHeight:'100%'}}/>
                <div style={{position:'absolute',right:'20px',top:'30px',backgroundColor:'grey',borderRadius:'5px'}} onClick={this.handleClick}>
                    跳过
                </div>

                <div>
                    <Replay style={{position:'absolute',right:'200px',left:'200px',backgroundColor:'grey',bottom:'20px'}} onClick={this.changeImg}/>
                    {/* <FastForward/> */}
                </div>

            </div>

        )
    }

}

export default Splash