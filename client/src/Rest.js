import React from 'react'
import { useState, useEffect } from 'react';
import Axios from 'axios';
import TableComponent from './component/Table';
import FormComponent from './component/Form';
// import Alert from './component/Alert';

const Interface = (props) => {
    const [listOfTask, setListOfTask] = useState([]);
    const [task, setTask] = useState('');
    const [time, setTime] = useState('');
    const [editedTask, setEditedTask] = useState({ taskId: null, task: '', time: '' });
    const visible = window.location.pathname === '/' ? true : false;

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };


    const searchTasks = () => {
        // Filter the list of tasks based on the search query
        const filteredTasks = listOfTask.filter((task) =>
            task.task.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Update the list of tasks with the filtered results
        setListOfTask(filteredTasks);
    };

    useEffect(() => {
        Axios.get("https://fs-todo.glitch.me/getTask").then((response) => {
            setListOfTask(response.data);
        })
    }, [listOfTask]);

    // const handleEditChange = (event) => {
    //     const { name, value } = event.target;
    //     if (/^\d{0,1}$/.test(value)) {
    //         setEditedTask({ ...editedTask, [name]: value });
    //     }
    // };

    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditedTask({ ...editedTask, [name]: value });
    };

    const handleEditTask = (task) => {
        setEditedTask({ taskId: task._id, task: task.task, time: task.time });
    };

    const createTask = () => {
        Axios.post('https://fs-todo.glitch.me/addTask', {
            task: task,
            time: time
        }).then((response) => {
            setTask('');
            setTime('');
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
        const { taskId, task, time } = editedTask;

        // Check if the task value is unchanged
        const originalTask = listOfTask.find((t) => t._id === taskId);
        if (originalTask.task === task && originalTask.time === time) {
            alert('No changes were made to the task');
            return; // Do not proceed with the update
        }

        Axios.put(`https://fs-todo.glitch.me/updateTask/${taskId}`, { task, time })
            .then((response) => {
                alert('Task updated successfully');
                // After successful update, update the list of tasks with the updated data
                setListOfTask(listOfTask.map((task) => (task._id === taskId ? response.data : task)));
                setEditedTask({ taskId: null, task: '', time: '' }); // Reset the edited task state
            })
            .catch((error) => {
                console.error(error);
                alert('Error updating task');
            });
    };


    return (

        <div className="App">

            <div className='form-container'>

                <FormComponent addFunction={createTask} setTask={setTask} setTime={setTime} time={time} handleSearchChange={handleSearchChange} searchTasks={searchTasks} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            </div>



            <div className='table-container'>

                <TableComponent deleteFunction={deleteTask} updateFunction={updateTask} listOfTask={listOfTask} editedTask={editedTask} setEditedTask={setEditedTask} handleEditChange={handleEditChange} handleEditTask={handleEditTask} setVisible={visible} searchQuery={searchQuery} />

            </div>

        </div>


    )
}

export default Interface
