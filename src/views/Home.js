import React,{Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './home.css'
import * as API from '../api/'

import {getHomeLatest} from './HomeRedux'
//import * as homeAction from './HomeRedux'
console.log(getHomeLatest)
class Home extends Component{
	constructor(props){
		super(props)
		// this.state={
		// 	stories:[]
		// }
	}
	componentDidMount(){
		//console.log(this.props.getHomeLatest)
		this.props.homeAction()
		// API.getLatestNews().then(data=>{
		// 	console.log(data)
		// 	this.setState({
		// 		stories:data.stories
		// 	})
		// })
	}
	render(){
		var s=this.props.stories
		//console.log(s)
		if(!s || s.length==0){
			return <div>null</div>
		}
		var list=this.props.stories.map(item=>(
			<div className="list-box" key={item.id}>
				<Link to={"/detail/"+item.id}>
					<div>
						<img src={item.images[0]}/>
					</div>
					<span>{item.title}</span>
				</Link>
			</div>
		))
		return(
			<div className="list-wrap">
				<h2 className="list-title">今日新闻</h2>
				{list}
			</div>
		)
	}
}
export default connect((state)=>{
	return{
		stories:state.homeList.list
	}
},(dispatch)=>{
	return{
		homeAction:bindActionCreators(getHomeLatest,dispatch)
	}
})(Home)