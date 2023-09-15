import React from 'react';


const FormComponent = (props) => {
    const visible = window.location.pathname === '/' ? true : false;

    const handleChange = (e) => {
        const value = e.target.value;
        props.setTime(value);
    };

    return (
        <>

            {visible ?
                <form onSubmit={props.addFunction}>

                    <input type='text' placeholder='Task' onChange={(e) => props.setTask(e.target.value)} required />
                    <input type='text' placeholder='Time' value={props.time} onChange={handleChange} required />
                    <button type='submit'>Add Task</button>

                </form> :
                <>

                    <input type='text' placeholder='Search...' value={props.searchQuery} onChange={props.handleSearchChange} required />
                    {props.searchQuery && (
                        <button onClick={() => props.setSearchQuery('')}>Clear Search</button>
                    )}

                </>}

        </>
    );
}

export default FormComponent;