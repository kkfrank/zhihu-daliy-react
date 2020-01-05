import fetch from 'isomorphic-fetch'

const corsUrl = 'https://cors-anywhere.herokuapp.com/'
//https://news-at.zhihu.com/api/4/news/latest
let BaseUrl=''

if(process.env.NODE_ENV === 'production'){
    BaseUrl = corsUrl + 'https://news-at.zhihu.com/api/4'
}else{
    BaseUrl = 'http://127.0.0.1:9001/api/4'
}

export default {
    post(url, data, params){
        return new Promise((resolve, reject) => {
             fetch(BaseUrl + url, { method: 'POST' })
                .then(res => resolve(res.json()))
                .catch(err => {
                    reject({
                        message: err
                    })
                })
        })
    },
    get(url, params = {}){
        return new Promise((resolve, reject) => {
            fetch(BaseUrl + url, { method: 'GET' })
                .then(res => resolve(res.json()))
                .catch(err => reject({ message: err }))
        })
    }
}