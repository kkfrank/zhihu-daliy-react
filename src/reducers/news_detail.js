import { GET_NEWS_DETAIL } from "../action_types/news_detail"

const DEFAULT_STATE = {
    body: '',
    title: '',
    image: '',
    imageSource: ''
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
        default:
            return state
    }
}