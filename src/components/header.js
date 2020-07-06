import React, {Component} from 'react';
import "./header.css"
import PersistentDrawerLeft from './SideMenu';
import ArrLogo from '../resources/arrCover.jpg'

export default class Header extends Component {
    constructor(props) {
        super(props);
    }
    static defaultProps = {
        style: "sideMenu" 
    }
    render() {
        return (
            <div>
                <div className="header">
                    <div className={this.props.style}>
                        <PersistentDrawerLeft/>
                    </div>
                    <img src={ArrLogo} className='logo'></img>
                </div>
                <h4 className="title">{this.props.title}</h4>
            </div>
        )
    }
}