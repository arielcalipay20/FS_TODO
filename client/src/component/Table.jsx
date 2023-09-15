import React from 'react';

const TableComponent = (props) => {
    // Filter the list of tasks based on the search query
    const filteredTasks = props.searchQuery
        ? props.listOfTask.filter((task) =>
            task.task.toLowerCase().includes(props.searchQuery.toLowerCase())
        )
        : props.listOfTask;

    return (
        <>

            <table>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Time</th>
                        {props.setVisible && <th>Actions</th>}
                    </tr>
                </thead>

                <tbody>
                    {filteredTasks.map((task) => {
                        const isEdited = props.editedTask.taskId === task._id;
                        return (
                            <tr key={task._id}>
                                <td>
                                    {isEdited ? (
                                        <input
                                            type='text'
                                            name='task'
                                            value={props.editedTask.task}
                                            onChange={props.handleEditChange}
                                        />
                                    ) : (
                                        task.task
                                    )}
                                </td>
                                <td>
                                    {isEdited ? (
                                        <input
                                            type='text'
                                            name='time'
                                            value={props.editedTask.time}
                                            onChange={props.handleEditChange}
                                        />
                                    ) : (
                                        `${task.time}`
                                    )}
                                </td>
                                {props.setVisible && (
                                    <td>
                                        {isEdited ? (
                                            <>
                                                <button onClick={props.updateFunction}>Update</button>
                                                <button onClick={() => props.setEditedTask({ taskId: null, task: '', time: '' })}>
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => props.handleEditTask(task)}>Edit</button>
                                                <button onClick={() => props.deleteFunction(task._id)}>Delete</button>
                                            </>
                                        )}
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default TableComponent;
