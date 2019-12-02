import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Confirm extends Component {
    render() {
        return (
            <div className='loading'>
                <div className='loading__mask'></div>
                <div className='loading__content'>
                    <div className="loading__content__message">
                        {this.props.message}
                    </div>
                    <div className="loading__content__button">
                        <button onClick={this.props.ok}>确认</button>
                        <button onClick={this.props.cancel}>取消</button>
                    </div>
                </div>
            </div>
        )
    }
}

let node = null
const confirm = function (message) {
    return new Promise((resolve, reject) => {
        node = document.createElement('div')
        document.body.appendChild(node)
        ReactDOM.render(<Confirm message={message} ok={() => {
            if (node) {
                ReactDOM.unmountComponentAtNode(node)
                document.body.removeChild(node)
            }
            resolve(true)
        }} cancel={() => {
            if (node) {
                ReactDOM.unmountComponentAtNode(node)
                document.body.removeChild(node)
            }
            resolve(false)
        }} />, node)
    })
}

export default confirm