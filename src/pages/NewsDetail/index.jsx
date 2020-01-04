import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Loading from '../../components/Loading'
import Modal from '../../components/Modal'

import Footer from './Footer'

import { getNewsDetail } from '../../actions/news_detail'
import { clearErrorMsg } from '../../actions/loading_error'
import './index.scss'

@connect(({newsDetail, loadingError})=>({
    newsDetail,
    loadingError
}), dispatch =>({
    getNewsDetailFunc(id){
        dispatch(getNewsDetail(id))
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
    }

    componentWillUnmount(){
        // this.props.clearCategoryFunc()
    }

    render() {
        const { loading, errorMsg } = this.props.loadingError;
        const { title, body, image, imageSource } = this.props.newsDetail
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
                <div className="detail-img-box">
                    <img src={ image }/>
                    <div className="detail-overlay"/>
                    <h2>{ title }</h2>
                    <span>{ imageSource }</span>
                </div>
                <div dangerouslySetInnerHTML={{__html: body}} className="detail-content-box"></div>
                <Footer goBack={this.props.history.goBack}/>
            </div>
        )
    }
}