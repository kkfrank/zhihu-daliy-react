import React, { Component } from 'react'
import './index.scss'

export default class Modal extends Component{
    constructor(props){
        super(props)
        this.state = {
            confirmLoading: false
        }
        this.onOk = this.onOk.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
    }

    componentDidMount(){
        this.modalContentRef.focus();
        this.maskRef.onclick=()=>{
            this.onCancel()
        }
    }
    handleKeyDown(event){
        if(event.keyCode === 27){// esc
            this.onCancel();
        }
    }

    onOk(){
        const { confirmLoading } = this.props
        if(confirmLoading){
            return
        }
        const { onOk } = this.props
        if(typeof onOk === 'function'){
            onOk()
        }
    }

    onCancel(){
        const { onCancel } = this.props
        if(typeof onCancel === 'function'){
            onCancel()
        }
    }

    render(){
        let { title, children } = this.props
        const { visible, confirmLoading } = this.props
        title = title || '提示'
        return(
            <div className={`modal-box ${visible? '' : 'hide'}`}>
                <div className="modal-mask" ref={el=>this.maskRef = el} />
                <div className="modal-content" ref={el=>this.modalContentRef = el} tabIndex='0' onKeyDown={this.handleKeyDown}>
                    <div className='modal-header'>
                        { title }
                        <i onClick={ this.onCancel } className='right'>x</i>
                    </div>
                    <div className='modal-body'>{ children }</div>
                    <div className='modal-footer'>
                        <button onClick={ this.onCancel } className='btn default mr10'>取消</button>
                        <button onClick={ this.onOk } className={`btn ${ confirmLoading ? 'disabled' : '' }`}>确定</button>
                    </div>
                </div>
            </div>
        )
    }
}
