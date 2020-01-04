import http from '../utils/http'
import { showLoading, hideLoading, setErrorMsg } from "./loading_error";

import { GET_NEWS_DETAIL } from "../action_types/news_detail";


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