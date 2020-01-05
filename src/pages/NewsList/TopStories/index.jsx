import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './index.scss'

export default class TopStories extends Component{
    static propTypes = {
        topStoryList: PropTypes.array
    }

    constructor(props){
        super(props)
        this.jumpTo = this.jumpTo.bind(this)
        this.state = {
            timerId: null,
            activeIndex: 0
        }
    }

    componentDidMount(){
       this.addIntervalEvent()
    }

    componentWillUnmount(){
        clearInterval(this.state.timerId)
    }

    addIntervalEvent(){
        const len = this.props.topStoryList.length
        this.state.timerId = setInterval(()=>{
            console.log('linbbboooooooo')
            this.setState({
                activeIndex: (this.state.activeIndex + 1) % len
            })
        }, 3200)
    }

    jumpTo(index){
        clearInterval(this.state.timerId)
        this.setState({
            activeIndex: index
        })
        this.addIntervalEvent()
    }

    render(){
        const { topStoryList } = this.props
        const { activeIndex } = this.state
        const styleObj = {
            transform: `translateX(${activeIndex * (-100)}%)`
        }
        return(
            <div className='top-stories-box'>
                <div className="slider-box">
                    <div className="slider-inner" style = { styleObj }>
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
                                <li onClick={ () => { this.jumpTo(index) }}
                                    key={item.id} className={ activeIndex === index ? 'on' : ''}/>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}