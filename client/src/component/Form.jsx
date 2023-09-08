import React from 'react';

const FormComponent = (props) => {

    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,1}$/.test(value)) {
            props.setRepetition(value);
        }
    };
    
    return (
        <>

            <form onSubmit={props.addFunction}>

                <input type='text' placeholder='Task' onChange={(e) => props.setTask(e.target.value)} required />
                <input type='number' placeholder='Repetition' value={props.repetition} onChange={handleChange} required />
                <button type='submit'>Add Task</button>

            </form>

        </>
    );
}

export default FormComponent;