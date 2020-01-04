import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './index.scss'

export default class Footer extends Component{
    static propTypes = {
    }

    render(){
        return(
           <div className='footer'>
                {/*<a onClick={()=> this.props.goBack()}><span>&lt;</span></a>*/}
                <Link to='/'><span>&lt;</span></Link>
                <div></div>
           </div>
        )
    }
}