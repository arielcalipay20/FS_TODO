import React from 'react'
import '../App.scss';

const Alert = (props) => {
    const { type, message } = props;
    return (
        <div className={`alert ${type}`}>
            {message}
        </div>
    );
};

export default Alert
