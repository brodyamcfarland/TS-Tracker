import React, { useState } from 'react';
import './App.css';
import TSLogo from './images/type_script_logo.png'
import InputField from './components/InputField';
import TaskList from './components/TaskList';
import { Task } from './Task';
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");
//TS for useState hooks <types> and importing an interface as an array.//
  const [todos, setTodos] = useState<Task[]>([]);
//This state is needed for the Draggale feature//
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos,{ id: Date.now(), todo, isDone: false}]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = completedTasks;
    // Source Logic
    if (source.droppableId === "TaskList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TaskList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTasks(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <div className='header_container'>
          <img className="tslogo" src={TSLogo} alt="Tslogo"/>
          <span className="heading">TRACKER</span>
        </div>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TaskList todos={todos} setTodos={setTodos} completedTasks={completedTasks} setCompletedTasks={setCompletedTasks} />
      </div>
    </DragDropContext>
  );
}

export default App;
 