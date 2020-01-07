import { GET_SHORT_COMMENT_LIST, GET_LONG_COMMENT_LIST, GET_SHORT_COMMENT_LIST_BEFORE, GET_LONG_COMMENT_LIST_BEFORE } from "../action_types/comment_list"

const DEFAULT_STATE = {
    shortCommentList: [],
    longCommentList: []
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type){
        case GET_SHORT_COMMENT_LIST:
            return {
                ...state,
                shortCommentList: action.data.comments
            }
        case GET_LONG_COMMENT_LIST:
            return {
                ...state,
                longCommentList: action.data.comments
            }
        case GET_SHORT_COMMENT_LIST_BEFORE:
            return {
                ...state,
                shortCommentList: [...state.shortCommentList, ...action.data.comments]
            }
        case GET_LONG_COMMENT_LIST_BEFORE:
            return {
                ...state,
                longCommentList: [...state.longCommentList, ...action.data.comments]
            }

        default:
            return state
    }
}