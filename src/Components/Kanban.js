import React, {Component} from 'react';
import KanbanList from './Kanban/KanbanList';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import "./Kanban.css"
class Kanban extends Component {
    constructor () {
        super();
    }

    render() {
        return( 
            <div>
            <h1>Kanban</h1>
            <div class="encaps">
            

            <KanbanList text="First" id="list1"/>
            <KanbanList text="Second" id="list2"/>
            </div>
            </div>
            
        );
    }
}

export default Kanban 
