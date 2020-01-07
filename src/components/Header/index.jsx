import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './index.scss'

export default class Header extends Component{
    static propTypes = {
        // id: PropTypes.string,
        // extra: PropTypes.object
    }

    render(){
        let { className, children, title } = this.props

        return(
           <div className= {`header ${className}`}>
               {
                   this.props.goBack &&  <a className='goback' onClick={ this.props.goBack }><i className="fa fa-chevron-left"/></a>
               }
               {
                   title && <h1>{title}</h1>
               }
               { children }

                {/*<a onClick={()=> this.props.goBack()}><span>&lt;</span></a>*/}
                {/*<Link to='/'><span>&lt;</span></Link>*/}
               {/*<div className='line'/>*/}
               {/*<div className='right ml30'>*/}
                   {/*<Link to={`/details/${this.props.id}/comments`} className='mr20 func-btn'><i className="fa fa-comment-o"/><span>{this.props.extra.comments}</span></Link>*/}
                   {/*<div className = 'func-btn'><i className="fa fa-thumbs-o-up"/><span>{this.props.extra.popularity}</span></div>*/}
               {/*</div>*/}
           </div>
        )
    }
}
