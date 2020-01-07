import { combineReducers } from 'redux'

import loadingError from './loading_error'
import newsList from './news_list'
import newsDetail from './news_detail'
import commentList from './comment_list'

export default combineReducers({
    loadingError,
    newsList,
    newsDetail,
    commentList
})