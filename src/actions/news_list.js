import http from '../utils/http'
import { showLoading, hideLoading, setErrorMsg } from "./loading_error";
import { GET_BEFORE_NEWS, GET_LATEST_NEWS, SAVE_SCROLLTOP } from "../action_types/news_list";
import { formatDate } from '../utils/utils'

export function getLatestNews(){
    return function(dispatch, getState){
        dispatch(showLoading())

        http.get('/news/latest')
            .then(data=>{
                dispatch({
                    type: GET_LATEST_NEWS,
                    data: data
                })
                dispatch(hideLoading())
            })
            .catch(err=>{
                dispatch(setErrorMsg(err.message))
            })
    }
}

export function getBeforeNews(){
    return (dispatch, getState) => {
        if(getState().loadingError.loading){
            return
        }
        dispatch(showLoading())
        const nowDateStr = getState().newsList.nowDate || formatDate(new Date());
        //const yesterdayStr = formatDate(addDays(parseDate(nowDateStr),-1))

        //若果需要查询 2019 年 11 月 18 日的消息，before 后的数字应为 20191119
        http.get(`/news/before/${nowDateStr}`)
            .then(data =>{
                dispatch({
                    type: GET_BEFORE_NEWS,
                    data: data
                })
                dispatch(hideLoading())
            }).catch(err=>{
                 dispatch(setErrorMsg(err.message))
            })
    }
}

export function saveScrollTop(value){
    return{
        type: SAVE_SCROLLTOP,
        value
    }
}