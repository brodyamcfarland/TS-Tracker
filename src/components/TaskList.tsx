import React from 'react'
import { Task } from "../Task"
import SingleTask from './SingleTask';
import "./styles.css";
import { Droppable } from "react-beautiful-dnd";

interface Props {
    todos: Task[];
    setTodos: React.Dispatch<React.SetStateAction<Task[]>>;
    completedTasks: Task[];
    setCompletedTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList:React.FC<Props> = ({ todos, setTodos, completedTasks, setCompletedTasks }) => {
  return (
    <div className="tasklist__container">
      <Droppable droppableId='TaskList'>
          {(provided, snapshot) => (
            <div className={`task__active ${snapshot.isDraggingOver ? 'dragactive' : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
              <span className="task__heading">Active</span>
              {todos.map((todo, index) => (
                  <SingleTask index={index} todo={todo} key={todo.id} todos={todos} setTodos={setTodos}/>
              ))}
              {provided.placeholder}
            </div>
          )}
      </Droppable>
      <Droppable droppableId="TaskCompleted">
          {(provided, snapshot) => (
            <div className={`task__completed ${snapshot.isDraggingOver ? 'dragcomplete' : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
            <span className="task__heading">Completed</span>
              {completedTasks.map((todo, index) => (
                  <SingleTask index={index} todo={todo} key={todo.id} todos={completedTasks} setTodos={setCompletedTasks}/>
              ))}
              {provided.placeholder}
            </div>
            )}
      </Droppable>
    </div>
  );
};

export default TaskList;