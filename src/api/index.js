import fetch from 'isomorphic-fetch'
//https://news-at.zhihu.com/api/4/news/latest
const BaseUrl='http://127.0.0.1:9001/api/4'

//获取最新消息
export function getLatestNews(){
	return fetch(BaseUrl+'/news/latest',{method:"GET"})
		.then(res=>{
			return res.json()
		}).catch(err=>{
			console.log(err)
		})
}
//获取新闻详情
export function getNewsDetail(id){
	return fetch(BaseUrl+'/news/'+id)
		.then(res=>res.json())
		.catch(err=>{
			console.log(err)
		})
}