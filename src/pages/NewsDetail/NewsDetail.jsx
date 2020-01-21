import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Loading from '../../components/Loading'
import Modal from '../../components/Modal'

import Header from '../../components/Header'

import { getNewsDetail , getNewsExtra } from '../../actions/news_detail'
import { clearErrorMsg } from '../../actions/loading_error'
import './NewsDetail.scss'

@connect(({newsDetail, loadingError})=>({
    newsDetail,
    loadingError
}), dispatch =>({
    getNewsDetailFunc(id){
        dispatch(getNewsDetail(id))
    },
    getNewsExtraFunc(id){
        dispatch(getNewsExtra(id))
    },
    clearErrorMsgFunc(){
        dispatch(clearErrorMsg())
    },

}))
export default class NewsDetail extends Component{
    static propTypes = {
        newsDetail: PropTypes.object,
        loadingError: PropTypes.object,
        getNewsDetailFunc: PropTypes.func,
        getNewsExtraFunc: PropTypes.func,
        clearErrorMsgFunc: PropTypes.func,
    }

    constructor(props){
        super(props)
        // this.handleKeyDown = this.handleKeyDown.bind(this)
    }

    componentDidMount(){
        document.documentElement.scrollTop = 0
        const { id } = this.props.match.params
        this.props.getNewsDetailFunc(id);
        this.props.getNewsExtraFunc(id);
    }

    componentWillUnmount(){
        // this.props.clearCategoryFunc()
    }

    render() {
        const { loading, errorMsg } = this.props.loadingError;
        const { title, body, image, imageSource, extra } = this.props.newsDetail
        return (
            <div className="detail-box">
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
                <Header goBack={ this.props.history.goBack } className='detail-header'>
                    <div className='line'/>
                    <div className='right ml30'>
                        <Link to={`/details/${this.props.match.params.id}/comments`} className='func-btn'>
                            <i className="fa fa-comment-o"/><span>{ extra.commentCount }</span>
                        </Link>
                        <div className = 'func-btn'><i className="fa fa-thumbs-o-up"/><span>{ extra.popularityCount }</span></div>
                    </div>
                </Header>
                <div className="detail-img-box">
                    <img src={ image }/>
                    <div className="detail-overlay"/>
                    <h2>{ title }</h2>
                    <span>{ imageSource }</span>
                </div>
                <div dangerouslySetInnerHTML={{__html: body}} className="detail-content-box"></div>
            </div>
        )
    }
}