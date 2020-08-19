import React, {Component} from 'react';


class Home extends Component {
    constructor () {
        super();
    }

    render() {
        return( 
            <div>
            <h1>Home</h1>
            <br></br>
            <br></br>
            Welcome to this simple kanban board. It is by no means perfect since it was more of a learning experience to try it without any libraries.
            How it works is pretty simple. Adding lists is done by naming on the top and adding. Within the list add an item with the plus icon and edit by double clicking.
            Remove an item by dragging it to the delete button and to remove a list use the minus icon inside the list. Items can also be dragged freely between the lists. 
            </div>
        );
    }
}

export default Home 
