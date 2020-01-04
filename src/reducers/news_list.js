import { GET_LATEST_NEWS, GET_BEFORE_NEWS, SAVE_SCROLLTOP } from "../action_types/news_list"

const DEFAULT_STATE = {
    nowDate: null,
    scrollTop: 0,
    topStoryList: [],
    storyList: [],
}

function addDateToStory(storyList, date){
    return storyList.map(item=>{
        return {
            ...item,
            date: date
        }
    })
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type){
        case GET_LATEST_NEWS:
            return {
                ...state,
                nowDate: action.data.date,
                topStoryList: action.data.top_stories,
                storyList: [...state.storyList, ...addDateToStory(action.data.stories, action.data.date)]
                // storyList: [...state.storyList, ...action.data],
            }
        case GET_BEFORE_NEWS:
            return {
                ...state,
                nowDate: action.data.date,
                // storyList: [...state.storyList, ...action.data.stories],
                storyList: [...state.storyList, ...addDateToStory(action.data.stories, action.data.date)]
            }
        case SAVE_SCROLLTOP:
            return {
                ...state,
                scrollTop: action.value
            }
        default:
            return state
    }
}