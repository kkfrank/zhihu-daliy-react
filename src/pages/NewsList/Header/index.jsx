import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './index.scss'

export default class Header extends Component{
    static propTypes = {
    }

    render(){
        const date = new Date();
        const monthList = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
        return(
           <div className='news-list-header'>
               <div className='time'>
                   <div className='fw700'>{date.getDate()}</div>
                   <div>{monthList[date.getMonth()]}</div>
               </div>
                <h1>知乎日报</h1>
           </div>
        )
    }
}