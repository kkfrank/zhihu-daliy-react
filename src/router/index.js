import React from 'react'
import{ BrowserRouter, HashRouter, Link, Route } from 'react-router-dom'

// import Home from '../views/Home'
import NewsDetail from '../pages/NewsDetail/NewsDetail'
import NewsList from '../pages/NewsList/NewsList'
import CommentList from '../pages/CommentList/CommentList'

export default() => (
	<HashRouter>
		<div>
			{/*<Link to='/'>Home</Link>
			<Link to='/detail'>Detail</Link>*/}
			{/*<Route exact path='/' component={Home}/>*/}
            <Route exact path='/' component={ NewsList }/>
			<Route exact path='/details/:id' component={ NewsDetail }/>
			<Route path='/details/:id/comments' component={ CommentList }/>
		</div>
	</HashRouter>
)

/*import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export default BasicExample*/