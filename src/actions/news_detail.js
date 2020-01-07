import http from '../utils/http'
import { showLoading, hideLoading, setErrorMsg } from "./loading_error";

import { GET_NEWS_DETAIL, GET_NEWS_EXTRA } from "../action_types/news_detail";


export function getNewsDetail(id){
    return( dispatch, getState )=>{
        dispatch(showLoading())
        http.get(`/news/${id}`)
            .then(data=>{
                dispatch({
                    type: GET_NEWS_DETAIL,
                    data: data
                })
                dispatch(hideLoading())
            }).catch(err=>{
            dispatch(setErrorMsg(err.message))
        })
    }
}

export function getNewsExtra(id){
    return( dispatch, getState )=>{
        dispatch(showLoading())
        http.get(`/story-extra/${id}`)
            .then(data=>{
                dispatch({
                    type: GET_NEWS_EXTRA,
                    data: data
                })
                dispatch(hideLoading())
            }).catch(err=>{
            dispatch(setErrorMsg(err.message))
        })
    }
}