import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './index.scss'

export default class TopStories extends Component{
    static propTypes = {
        topStoryList: PropTypes.array
    }

    render(){
        const { topStoryList } = this.props
        return(
            <div className='top-stories-box'>
                <div className="slider-box">
                    <div className="slider-inner">
                        {
                            topStoryList.map(story=>(
                                <Link to = {`details/${story.id}`} key = { story.id } className='slider-item'>
                                    <img src={ story.image }/>
                                    <div className='content'>
                                        <h3>{ story.title }</h3>
                                        <span>{ story.hint }</span>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                    <ul className="slider-nums">
                        {
                            topStoryList.map((item, index)=>(
                                <li key={item.id}></li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}