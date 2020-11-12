import React, { Component } from 'react'
import $ from 'jquery'

const filterTasks = () => {
    $('document').ready(() => {
        var search = $('.search .searchBox').val();                       
        var tasks = $('.list li span');
            
        for(var i = 0; i<tasks.length ; i++){
            if(tasks[i].innerHTML.toLowerCase().indexOf(search) == -1)
                $(tasks[i].parentElement).hide(100);
            else    
                $(tasks[i].parentElement).show(100);
        }
    })
    
}

class SearchBox extends Component {
    state = {
        searchText: ''
    }

    render() {
        return (
            <div className="search">
                <label htmlFor="searchBox">Search :</label>
                <input type="text" className="searchBox" onKeyUp={filterTasks}/>
            </div>
        )
    }
}

export default SearchBox;