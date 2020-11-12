import React from 'react'
import $ from 'jquery'

const hideTasks = () => {
    $('.list').fadeToggle(200);
}

const hideTask = (props) => {
    return (
        <div className="hide">
            <input type="checkbox" className="hide_box" onChange={hideTasks} />
            <label htmlFor="hide_box">Hide all tasks</label>
        </div>
    )
}

export default hideTask;