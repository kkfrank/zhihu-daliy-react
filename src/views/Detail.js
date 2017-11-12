import React,{Component} from 'react'
import './Detail.css'
import * as API from '../api/'
class Detail extends Component{
	constructor(props){
		super(props)
		
		this.state={
			html:{
				__html:""
			}
		}
	}
	componentDidMount(){
		var id=this.props.match.params.id
		//console.log(id)
		API.getNewsDetail(id)
			.then(data=>{
				//console.log(data)
				this.setState({
					html:{
						__html:data.body
					}
				})
		})
	}
	render(){
		return(
			<div 
				dangerouslySetInnerHTML={this.state.html}
				className="detail-content-box"
				>
			</div>
		)
	}
}
export default Detail