import React, {Component} from 'react'
import './index.scss'

export default class Loading extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className={`loading-container ${ this.props.isFull? 'is-full': ''}`}>
                <div className="loading-mask"/>
                <div className="loading-box">
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                </div>
            </div>
        )
    }
}