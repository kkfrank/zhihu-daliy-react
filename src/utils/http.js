import fetch from 'isomorphic-fetch'

const corsUrl = 'https://cors-anywhere.herokuapp.com/'
//https://news-at.zhihu.com/api/4/news/latest
let BaseUrl='http://127.0.0.1:9001/api/4'

// if($NODE_ENV === 'production'){
//     BaseUrl = corsUrl + BaseUrl
// }

if(process.env.NODE_ENV === 'production'){
    BaseUrl = corsUrl + BaseUrl
}

export default {
    post(url, data, params){
        return fetch(BaseUrl + url, { method: 'POST' })
            .then(res => res.json())
            .catch(err => {
                console.log(err)
            })
    },
    get(url, params = {}){
        return fetch(BaseUrl + url, { method: 'GET' })
            .then(res => res.json())
            .catch(err => {
                console.log(err)
            })
    }
}