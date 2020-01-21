import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Loading from '../../components/Loading'
import Modal from '../../components/Modal'

import Header from './Header'
import TopStories from './TopStories'

import { getLatestNews, getBeforeNews, saveScrollTop } from '../../actions/news_list'
import { clearErrorMsg } from '../../actions/loading_error'

import { parseDate, listenScrollBottom, removeListenScrollBottom } from '../../utils/utils'

import './NewsList.scss'

@connect(({newsList, loadingError})=>({
    newsList,
    loadingError
}), dispatch =>({
    getLatestNewsFunc(){
        return dispatch(getLatestNews())
    },
    getBeforeNewsFunc(){
        dispatch(getBeforeNews())
    },
    saveScrollTopFunc(scrollTop){
        dispatch(saveScrollTop(scrollTop))
    },
    clearErrorMsgFunc(){
        dispatch(clearErrorMsg())
    },

}))
export default class NewsList extends Component{
    static propTypes = {
        newsList: PropTypes.object,
        loadingError: PropTypes.object,
        getLatestNewsFunc: PropTypes.func,
        clearErrorMsgFunc: PropTypes.func,
    }

    constructor(props){
        super(props)
        this.jumpDetail = this.jumpDetail.bind(this)
        this.addEvent = this.addEvent.bind(this)
    }

    componentDidMount(){
        const { storyList, scrollTop } = this.props.newsList
        console.log('list componentDidMount', scrollTop)
        this.addEvent()

        if(storyList.length > 0){
            document.documentElement.scrollTop = scrollTop
            return
        }
        this.props.getLatestNewsFunc()
            .then(()=>{ this.props.getBeforeNewsFunc()} );
    }
    addEvent(){
        listenScrollBottom(this.props.getBeforeNewsFunc)
    }

    jumpDetail(id){
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        this.props.saveScrollTopFunc(scrollTop);
        this.props.history.push(`/details/${id}`)
    }

    toTitleDate(dateStr){
        var date = parseDate(dateStr)
        var year = date.getFullYear() === (new Date()).getFullYear() ? '' : date.getFullYear()+' 年';
        return `${year} ${date.getMonth() + 1} 月 ${date.getDate()} 日`
    }

    componentWillUnmount(){
        console.log('news list componentWillUnmount')
        removeListenScrollBottom();
        // this.props.clearCategoryFunc()
    }

    render() {
        const { loading, errorMsg } = this.props.loadingError;
        const { topStoryList, storyList } = this.props.newsList

        return (
            <div className='news-list-container'>
                {
                    errorMsg && (
                        <Modal
                            onOk={()=> this.props.clearErrorMsgFunc()}
                            onCancel={()=> this.props.clearErrorMsgFunc()}
                            title='对话框'
                            visible={ !!errorMsg }>
                            <p>{ errorMsg }</p>
                        </Modal>
                    )
                }
                { loading && <Loading/> }
                <Header/>
                { topStoryList && topStoryList.length > 0 && <TopStories topStoryList={ topStoryList }/> }
                <div className="news-list-box">
                    {
                        ( storyList || []).map((item, index, arr)=>(
                            <div className="news-item" key={ item.id }>
                                {
                                    index !== 0 && item.date !== arr[index-1].date && (
                                        <h3 className='timeline'>{ this.toTitleDate(item.date) }</h3>
                                    )
                                }
                                {/*<Link to={"/details/"+item.id} className='item-link'>*/}
                                <div className='item-link' onClick={() => this.jumpDetail(item.id)}>
                                    <img src={ item.images[0] }/>
                                    <div className='title'>{ item.title }</div>
                                    <div className='hint'>{ item.hint }</div>
                                </div>
                                {/*</Link>*/}
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}