import React from 'react'
import { useState, useEffect } from 'react';
import Axios from 'axios';
import TableComponent from './component/Table';
import FormComponent from './component/Form';
// import Alert from './component/Alert';

const Interface = (props) => {
    const [listOfTask, setListOfTask] = useState([]);
    const [task, setTask] = useState('');
    const [repetition, setRepetition] = useState('');
    const [editedTask, setEditedTask] = useState({ taskId: null, task: '', repetition: '' });
    const visible = window.location.pathname === '/' ? true : false;

    useEffect(() => {
        Axios.get("https://fs-todo.glitch.me/getTask").then((response) => {
            setListOfTask(response.data);
        })
    }, [listOfTask]);

    const handleEditChange = (event) => {
        const { name, value } = event.target;
        if (/^\d{0,1}$/.test(value)) {
            setEditedTask({ ...editedTask, [name]: value });
        }
    };

    const handleEditTask = (task) => {
        setEditedTask({ taskId: task._id, task: task.task, repetition: task.repetition });
    };

    const createTask = () => {
        Axios.post('https://fs-todo.glitch.me/addTask', {
            task: task,
            repetition: repetition
        }).then((response) => {
            setTask('');
            setRepetition('');
            setListOfTask([...listOfTask, response.data]); // Add the new task to the list
            alert('added successfully');
        });
    }

    const deleteTask = (taskId) => {
        const confirmed = window.confirm('Are you sure you want to delete this?');
        if (confirmed) {
            Axios.delete(`https://fs-todo.glitch.me/deleteTask/${taskId}`)
                .then((response) => {
                    alert('Task deleted successfully');
                    // After successful deletion, update the list of tasks by removing the deleted task
                    setListOfTask(listOfTask.filter((task) => task._id !== taskId));
                })
                .catch((error) => {
                    console.error(error);
                    alert('Error deleting user');
                });
        } else {
            alert('Cancel Delete');
        }
    };

    const updateTask = () => {
        const { taskId, task, repetition } = editedTask;

        // Check if the task value is unchanged
        const originalTask = listOfTask.find((t) => t._id === taskId);
        if (originalTask.task === task && originalTask.repetition === repetition) {
            alert('No changes were made to the task');
            return; // Do not proceed with the update
        }

        Axios.put(`https://fs-todo.glitch.me/updateTask/${taskId}`, { task, repetition })
            .then((response) => {
                alert('Task updated successfully');
                // After successful update, update the list of tasks with the updated data
                setListOfTask(listOfTask.map((task) => (task._id === taskId ? response.data : task)));
                setEditedTask({ taskId: null, task: '', repetition: '' }); // Reset the edited task state
            })
            .catch((error) => {
                console.error(error);
                alert('Error updating task');
            });
    };


    return (

        <div className="App">

            {visible ?
                <div className='form-container'>

                    <FormComponent addFunction={createTask} setTask={setTask} setRepetition={setRepetition} repetition={repetition} />

                </div>
                : null

            }


            <div className='table-container'>

                <TableComponent deleteFunction={deleteTask} updateFunction={updateTask} listOfTask={listOfTask} editedTask={editedTask} setEditedTask={setEditedTask} handleEditChange={handleEditChange} handleEditTask={handleEditTask} setVisible={visible} />

            </div>

        </div>


    )
}

export default Interface
