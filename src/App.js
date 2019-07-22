import React, { Component } from 'react';
import PageTemplate from './components/PageTemplate';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

class App extends Component {

  state = {
    input: '',
    todos: [
      { id:0, text: '리액트 공부', done: true },
      { id:1, text: '컴포넌트 스타일링', done: false },
    ]
  }

  id = 1
  getId = () => {
    return ++this.id;
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({
      input: value
    });
  }

  //새 데이터 추가
  handleInsert = () => {
    const { todos, input } = this.state;

    //새 데이터 객체 만들기
    const newTodo = {
      text: input,
      done: false,
      id: this.getId()
    };

    //배열 안에 새 데이터 집어넣기
    this.setState({
      todos: [...todos, newTodo],
      input:''
    });
   }

  //Todo 아이템 토글
  handleToggle = (id) => {
    const { todos} = this.state;
    const index = todos.findIndex(todo => todo.id === id);

    const toggled = {
      ...todos[index],
      done: !todos[index].done
    };

    this.setState({
      todos: [
        ...todos.slice(0, index),
        toggled,
        ...todos.slice(index + 1, todos.length)
      ]
    });

  }

  //선택한 id 배열에서 제거
  handleRemove = (id) => {
    const {todos} = this.state;
    const index = todos.findIndex(todo => todo.id === id);

    this.setState({
      todos: [
        ...todos.slice(0,index),
        ...todos.slice(index + 1, todos.length)
      ]
    });
  }


  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleInsert,
      handleToggle,
      handleRemove
    } = this;

    return (
      <PageTemplate>
        <TodoInput onChange={handleChange} onInsert={handleInsert} value={input} />
        <TodoList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
      </PageTemplate>
    );
  }
}

export default App;