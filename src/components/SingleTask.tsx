import React, { useEffect, useRef, useState } from 'react';
import { Task } from '../Task';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './styles.css';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
    index: number;
    todo: Task;
    todos: Task[];
    setTodos: React.Dispatch<React.SetStateAction<Task[]>>;
}

const SingleTask = ({ index, todo, todos, setTodos }: Props) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTask, setEditTask] = useState<string>(todo.todo);

    const handleDone = (id: number) => {
        setTodos(
            todos.map((todo) => 
                todo.id === id ? { ...todo, isDone: !todo.isDone} : todo
            )
        );
    }

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    const handleEdit = (e:React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(
            todos.map((todo) => (todo.id === id ? {...todo, todo:editTask}:todo))
        );
        setEdit(false);
    }

    //Makes it so you when you click edit buttton, it auto focuses the cursor on the text. Use this syntax and add ref={inputRef} to the input you want to focus on.//
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      inputRef.current?.focus();
    }, [edit]);
    

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
        {(provided, snapshot)=>(
            <form className={`tasks_single ${snapshot.isDragging ? 'drag' : ''}`} onSubmit={(e) => handleEdit(e, todo.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                {edit ? (
                    <input ref={inputRef} value={editTask} onChange={(e) => setEditTask(e.target.value)} className='tasks_single--text'/>
                ) : todo.isDone ? (
                    <s className='tasks_single--text'>{todo.todo}</s>
                ) : (
                    <span className='tasks_single--text'>{todo.todo}</span>
                )}
                <div className='icon_container'>
                        <span className="icons edit" onClick={ () => {
                            if (!edit && !todo.isDone) {
                            setEdit(!edit);
                            }
                        }}><AiOutlineEdit /></span>
                        <span className='icons'><AiOutlineDelete onClick = { () => handleDelete(todo.id)}/></span>
                        <span className='icons done'><MdDone onClick = { () => handleDone(todo.id)} /></span>
                </div>
            </form>
        )}
    </Draggable>
  );
};

export default SingleTask;