import { combineReducers } from 'redux'

import loadingError from './loading_error'
import newsList from './news_list'
import newsDetail from './news_detail'

export default combineReducers({
    loadingError,
    newsList,
    newsDetail
})