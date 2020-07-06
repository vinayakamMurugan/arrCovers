import React, { Component } from 'react'
import { Alert,AlertTitle } from '@material-ui/lab';
export class Toast extends Component {
    constructor(props) {
        super(props)
    
    this.state ={
        setOpen:true
    }
    }
    componentWillMount(){
        setTimeout(()=>{
            this.setState({
                setOpen:false
            })
        },4000)
    }
    componentDidUpdate(prevProps){
        if (prevProps.type!==this.props.type) {
            this.setState({
                setOpen:true
            })
        }
     
        
    }
    
    render() {
        return (
            <div>
            {this.state.setOpen
            ?<div>
          <Alert severity={this.props.type||"info"}  onClose={() => {this.setState({setOpen: false})
            }}>
            <AlertTitle>{this.props.title || "sample title"}</AlertTitle>
            {this.props.message}
          </Alert>
          </div>
            : null }     
            </div>
        )
    }
}

export default Toast
