import React from 'react';

const TableComponent = (props) => {

    return (
        <>

            <table>

                <thead>

                    <tr>
                        <th>Task</th>
                        <th>Repetition</th>
                        {props.setVisible ?
                            <th>Actions</th>
                            : null
                        }
                    </tr>

                </thead>

                <tbody>

                    {props.listOfTask.map((task) => {
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
                                            type='number'
                                            name='repetition'
                                            value={props.editedTask.repetition}
                                            onChange={props.handleEditChange}
                                        />
                                    ) : (
                                        `${task.repetition}(x)`
                                    )}
                                </td>
                                {props.setVisible ?
                                    <td>
                                        {isEdited ? (
                                            <>
                                                <button onClick={props.updateFunction}>Update</button>
                                                <button onClick={() => props.setEditedTask({ taskId: null, task: '', repetition: '' })}>
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
                                    : null
                                }

                            </tr>
                        );
                    })}

                </tbody>

            </table>

        </>
    );
}

export default TableComponent;