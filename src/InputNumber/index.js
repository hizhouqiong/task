import React, { Component } from 'react'

class InputNumber extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            value: props.defaultValue || props.value || ''
        }
    }

    // props.value总是有比内部state.value更高的优先级
    // 当props.value被设置以后，我们应该总是拿props.value来渲染而不是state.value
    // 因此可以定义一个displayValue的getter属性，并在render中使用
    get displayValue() {
        const propKey = 'defaultValue'
        const internalKey = 'value'
        return this.props[propKey] || this.state[internalKey]
    }

    // 当组件接受新的props的时候，将props.value反映给state.value
    // 非受控组件获取defaultValue
    // 受控组件获取value
    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps", this.props.name, nextProps);
        const controlledValue = nextProps.defaultValue || nextProps.value;

        if (controlledValue !== undefined && controlledValue !== this.state.value) {
            this.setState({
                value: controlledValue
            }, () => {
                this.props.onChange && this.props.onChange(controlledValue);
            });
        }
    }

    //一个受控的组件在内部state.value发生变化的时候不应该触发重新渲染
    //只有在props.value发生变化的时候才触发修改
    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate', this.props.name);
        // 当组件的props有改变时才触发render
        if (nextProps.defaultValue !== undefined) {
            // controlled, use `props.defaultValue`
            return nextProps.defaultValue !== this.props.defaultValue;
        }

        // uncontrolled, use `state.value`
        // 当state改变时 并不重新渲染
        return nextState.value !== this.state.value;
    }

    //组件中所有的变化都应该同步到内部的state.value，并通过执行props.onChange来触发父级组件的change方法
    handleChange = (event) => {
        console.log("change", this.props.name, event.target.value);
        const newVal = event.target.value
        if (newVal === this.state.value) {
            return;
        }
        this.setState({
            value: newVal
        }, () => {
            this.props.onChange && this.props.onChange(newVal);
        });
    }

    render() {
        return (
            <input
                value={this.displayValue}
                type="text"
                onChange={this.handleChange}
            />
        )
    }
}

export default InputNumber