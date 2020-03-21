import React from 'react'
import{ BrowserRouter, HashRouter, Link, Route } from 'react-router-dom'

import NewsDetail from '../pages/NewsDetail/NewsDetail'
import NewsList from '../pages/NewsList/NewsList'
import CommentList from '../pages/CommentList/CommentList'

export default() => (
	<HashRouter>
		<div>
            <Route exact path='/' component={ NewsList }/>
			<Route exact path='/details/:id' component={ NewsDetail }/>
			<Route path='/details/:id/comments' component={ CommentList }/>
		</div>
	</HashRouter>
)