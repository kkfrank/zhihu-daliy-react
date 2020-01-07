import { GET_NEWS_DETAIL, GET_NEWS_EXTRA } from "../action_types/news_detail"

const DEFAULT_STATE = {
    body: '',
    title: '',
    image: '',
    imageSource: '',
    extra: {
        longCommentCount: 0,
        popularityCount: 0,
        shortCommentCount:0,
        commentCount: 0
    }
}
export default (state = DEFAULT_STATE, action) => {
    switch (action.type){
        case GET_NEWS_DETAIL:
            return {
                ...state,
                body: action.data.body,
                title: action.data.title,
                image: action.data.image,
                imageSource: action.data.image_source
            }
        case GET_NEWS_EXTRA:
            return {
                ...state,
                extra: {
                    longCommentCount: action.data.long_comments,
                    popularityCount: action.data.popularity,
                    shortCommentCount: action.data.short_comments,
                    commentCount: action.data.comments,
                }
            }
        default:
            return state
    }
}