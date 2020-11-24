import React from 'react';

const header = (props) => {
    return(
        <header>
            <h1>TO-DO TASKS</h1>
            <h3>Lists of Your Tasks to be done <span> { props.user ? props.user.name : null } </span></h3>
        </header>
    )
}

export default header;
