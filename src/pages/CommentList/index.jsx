import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Loading from '../../components/Loading'
import Modal from '../../components/Modal'

import Header from '../../components/Header'
import { getShortCommentList, getLongCommentList, getShortCommentListBefore, getLongCommentListBefore } from '../../actions/comment_list'
import { getNewsExtra } from '../../actions/news_detail'
import { clearErrorMsg } from '../../actions/loading_error'
import { formatDate2 } from '../../utils/utils'
import { listenScrollBottom, removeListenScrollBottom } from '../../utils/utils'
import './index.scss'

@connect(({commentList, newsDetail, loadingError})=>({
    commentList,
    newsDetail,
    loadingError
}), dispatch =>({
    getShortCommentListFunc(id){
        dispatch(getShortCommentList(id))
    },
    getLongCommentListFunc(id){
        dispatch(getLongCommentList(id))
    },
    getShortCommentListBeforeFunc(storyId){
        dispatch(getShortCommentListBefore(storyId))
    },
    getLongCommentListBeforeFunc(storyId){
        dispatch(getLongCommentListBefore(storyId))
    },
    getNewsExtraFunc(id){
        dispatch(getNewsExtra(id))
    },
    clearErrorMsgFunc(){
        dispatch(clearErrorMsg())
    }
}))
export default class CommentList extends Component{
    static propTypes = {
        commentList: PropTypes.object,
        newsDetail: PropTypes.object,
        loadingError: PropTypes.object,
        getNewsExtraFunc: PropTypes.func,
        getShortCommentListFunc: PropTypes.func,
        getLongCommentListFunc: PropTypes.func,
        getShortCommentListBeforeFunc: PropTypes.func,
        getLongCommentListBeforeFunc: PropTypes.func,
        clearErrorMsgFunc: PropTypes.func,
    }

    constructor(props){
        super(props)
        // this.handleKeyDown = this.handleKeyDown.bind(this)
    }

    componentDidMount(){
        // document.documentElement.scrollTop = 0
        const { id } = this.props.match.params
        this.props.getNewsExtraFunc(id)
        this.props.getLongCommentListFunc(id)
        this.props.getShortCommentListFunc(id)

        var that = this
        listenScrollBottom(function(){
           that.props.getShortCommentListBeforeFunc(id)
        })
    }

    componentWillUnmount(){
        console.log('comment list componentWillUnmount')
        removeListenScrollBottom();
        // this.props.clearCategoryFunc()
    }

    render() {
        const { loading, errorMsg } = this.props.loadingError;
        const { longCommentList, shortCommentList } = this.props.commentList
        const { commentCount, longCommentCount, shortCommentCount } = this.props.newsDetail.extra
        const title = commentCount + ' 条评论'

        let longComment;
        if(longCommentList.length > 0){
            longComment = longCommentList.map( item => (
                <div className='comment-item' key={ item.id }>
                    <img src={item.avatar} className='avatar'/>
                    <div className='comment-detail'>
                        <div className='comment-author'>{item.author}</div>
                        <p className='comment-content'>{item.content}</p>
                        {
                            item.reply_to && (
                                <div className='replay-to'>
                                    <div>// { item.reply_to.author }: { item.reply_to.content }</div>
                                </div>
                            )
                        }
                        <div className='comment-other'>
                            <span className='time'>{ formatDate2(new Date((item.time+'000')-0)) }</span>
                            <div className='comment-judge'><i className="fa fa-comment-o"/></div>
                            <div className='comment-like'><span>{ item.likes }</span><i className="fa fa-thumbs-o-up"/></div>
                        </div>
                    </div>
                </div>
            ))
        }

        let shortComment;
        if(shortCommentList.length > 0){
            shortComment = shortCommentList.map( item => (
                <div className='comment-item' key={ item.id }>
                    <img src={item.avatar} className='avatar'/>
                    <div className='comment-detail'>
                        <div className='comment-author'>{item.author}</div>
                        <p className='comment-content'>{item.content}</p>
                        {
                            item.reply_to && (
                                <div className='replay-to'>
                                    <div>// { item.reply_to.author }: { item.reply_to.content }</div>
                                </div>
                            )
                        }

                        <div className='comment-other'>
                            <span className='time'>{ formatDate2(new Date((item.time+'000')-0)) }</span>
                            <div className='comment-judge'><i className="fa fa-comment-o"/></div>
                            <div className='comment-like'><span>{ item.likes }</span><i className="fa fa-thumbs-o-up"/></div>
                        </div>
                    </div>
                </div>
            ))
        }
        return (
            <div className="comment-container">
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
                {
                    loading && <Loading/>
                }
                <Header title = { title } goBack={ this.props.history.goBack }/>
                <div className='comment-box'>
                    {
                        longCommentList.length >0 && <div className='comment-title'>{ longCommentCount } 条长评</div>
                    }
                    {
                        longComment
                    }

                    {
                        shortCommentList.length >0 && <div className='comment-title'>{ shortCommentCount } 条短评</div>
                    }
                    {
                        shortComment
                    }
                </div>
            </div>
        )
    }
}