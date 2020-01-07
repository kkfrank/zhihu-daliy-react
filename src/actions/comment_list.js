import http from '../utils/http'

import { showLoading, hideLoading, setErrorMsg } from "./loading_error";
import { GET_SHORT_COMMENT_LIST, GET_LONG_COMMENT_LIST, GET_LONG_COMMENT_LIST_BEFORE,
        GET_SHORT_COMMENT_LIST_BEFORE
    } from "../action_types/comment_list"

export function getShortCommentList(storyId){
    return (dispatch, getState) => {
        dispatch(showLoading())
        http.get(`/story/${storyId}/short-comments`)
            .then( data => {
                dispatch({
                    type: GET_SHORT_COMMENT_LIST,
                    data
                })
            dispatch(hideLoading())
            }).catch(err=>{
                 dispatch(setErrorMsg(err.message.toString()))
            })
    }
}

export function getLongCommentList(storyId){
    return (dispatch, getState) => {
        dispatch(showLoading())
        http.get(`/story/${storyId}/long-comments`)
            .then( data => {
                dispatch({
                    type: GET_LONG_COMMENT_LIST,
                    data
                })
                dispatch(hideLoading())
            }).catch(err=>{
            dispatch(setErrorMsg(err.message.toString()))
        })
    }
}


export function getShortCommentListBefore(storyId){
    return (dispatch, getState) => {
        if(getState().loadingError.loading){
            return
        }
        const { shortCommentList } = getState().commentList
        let lastCommentId;
        if(shortCommentList.length > 0){
            lastCommentId = shortCommentList[shortCommentList.length-1].id
        }
        if(!lastCommentId){
            return
        }

        dispatch(showLoading())
        http.get(`/story/${storyId}/short-comments/before/${lastCommentId}`)
            .then( data => {
                dispatch({
                    type: GET_SHORT_COMMENT_LIST_BEFORE,
                    data
                })
                dispatch(hideLoading())
            }).catch(err=>{
            dispatch(setErrorMsg(err.message.toString()))
        })
    }
}


export function getLongCommentListBefore(storyId){
    return (dispatch, getState) => {
        if(getState().loadingError.loading){
            return
        }
        const { longCommentList } = getState().commentList
        let lastCommentId;
        if(longCommentList.length > 0){
            lastCommentId = longCommentList[longCommentList.length-1].id
        }
        if(!lastCommentId){
            return
        }

        dispatch(showLoading())
        http.get(`/story/${storyId}/long-comments/before/${lastCommentId}`)
            .then( data => {
                dispatch({
                    type: GET_LONG_COMMENT_LIST_BEFORE,
                    data
                })
                dispatch(hideLoading())
            }).catch(err=>{
            dispatch(setErrorMsg(err.message.toString()))
        })
    }
}