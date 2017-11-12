import fetch from 'isomorphic-fetch'
import * as API from '../api/'

const initialState={
	list:[]
}
export function getHomeLatest(){
	return function(dispatch){
		dispatch({type:"loading"})
		API.getLatestNews()
			.then(data=>{
				//console.log(data)
				dispatch({
					type:'LOAD_HOME_LIST',
					list:data.stories
				})
			})
	}
}
function homeList(state=initialState,action){
	switch(action.type){
		case 'LOAD_HOME_LIST':{
			return {
				...state,
				list:action.list
			}
		} 
		default:
			return state
	}
}
export default homeList
