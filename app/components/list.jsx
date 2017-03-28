import '../styles/components/todolist.scss';
import React from 'react';

import TypeNew from './typenew';
import Todolist from './todolist';


//列表组件，展示、删除、修改数据
class List extends React.Component{
    constructor(props) {
        super(props); 
        this.state = {  //用于记录修改状态
            changenum: -1,      //记录哪一个list要修改
            changevalue: ""     //记录要修改的list值
        }
        // this.onChange = this.onChange.bind(this);
    }

    handleDel(e) {
        let rows = this.props.todo; 
        let delIndex = e.target.getAttribute('data-key'); 

        // 更新数据，并使用 onDel 更新到 TodoList 的 state 中，以便 React自动render
        rows.splice(delIndex, 1);
        this.props.onChange(rows);

        // 防止修改后按删除按钮
        this.setState({
            changenum: -1
        })
    }
    //点击修改按钮，改变state
    handleChange(e) {
        let editIndex = e.target.getAttribute('data-key'); 
        let msg = this.props.todo[editIndex];

        this.setState({
            changenum: editIndex,
            changevalue: msg
        })
    }
    //react对约束性组件的处理
    handleText(e) {
        this.setState({
            changevalue: e.target.value
        })
    }
    //保存
    handleSave() {
        let newthing = this.state.changevalue;
        let rows = this.props.todo;

        if(newthing == ""){
            alert("数据不能为空");
            return;
        }
        let index = this.state.changenum;
        rows[index] = newthing;
        this.props.onChange(rows);

        this.setState({
            changenum: -1,
            changevalue: ""
        })                
    }
    render(){
        return(
            <ul className="theList">
            {
                this.props.todo.map((item,index) => {
                    //如果点击修改，渲染成type框
                    if(this.state.changenum == index) {
                        return (
                            <li key={index}>
                                <input type="text" ref="inputnew" value={this.state.changevalue} onChange={this.handleText.bind(this)} /> 
                                <button onClick={this.handleSave.bind(this)}>确定</button>
                            </li>
                        )
                    }
                    else{
                        return(
                            <li key={index}>
                                <span>{item}</span>
                                <button onClick={this.handleDel.bind(this)} data-key={index}>删除</button>
                                <button onClick={this.handleChange.bind(this)} data-key={index}>修改</button>
                            </li>
                        ) 
                    }
                })
                /* 要获取事件的索引值并对一个函数传参但不执行这个函数时，在方法名后.bind(_this)来改变this的指向*/
            }
            </ul>
        ) 
    }
}

export default List;