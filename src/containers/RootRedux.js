import homeList from '../views/HomeRedux'

const Root=(state={},action)=>{
	return {
		homeList:homeList(state.homeList,action)	
	}
}
export default Root