import React, { Component, useState } from 'react'
import InputNumber from './InputNumber'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "aaa"
        }
    }
    handleChange = (value) => {
        this.setState({
            value
        })
    }
    render() {
        let { value } = this.state;
        return (
            <div>
                <div>
                    <h3 className="title">6、请实现支持如下代码的InputNumber组件，可以受控和非受控。</h3>
                    <pre>
                        {`function App(){
    const [value,setValue] = useState('aaa')
    return (
        <div>
            <InputNumber value={value} onChange={e => { }} />
            <InputNumber defaultValue={value} onChange={e => { }} />
        </div>
    )
}`}
                    </pre>
                    <div>结果:
                        <button onClick={() => {
                            this.setState({
                                value: "bbb"
                            })
                        }}>change</button>
                    </div>
                    <div>
                        <span>受控组件：</span>
                        <InputNumber name="control" value={value} onChange={this.handleChange} />
                    </div>
                    <div>
                        <span>非受控组件：</span>
                        <InputNumber name="notcontrol" defaultValue={value} onChange={this.handleChange} />
                    </div>
                </div>
                <div>
                    <h3 className="title">7、请写一个满足以下要求的confirm方法组件：
                    <br />
                        （1）能在任意组件(示例如下)的componentDidMount生命周期中挂载，并返回一个promise；
                    <br />
                        （2）能通过该promise返回的结果判断confirm组件是否成功挂载。
                    </h3>
                    <pre>
                        {`async componentDidMount(){
    let res = await confirm("确定删除吗")
    if(res) {
        console.log("是")
    } else {
        console.log("否")
    }
}`}
                    </pre>
                    <div>结果:</div>
                </div>
            </div>
        )
    }

}

export default App