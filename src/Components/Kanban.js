import React, { Component } from 'react';
import KanbanList from './Kanban/KanbanList';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "./Kanban.css"
class Kanban extends Component {
    constructor() {
        super();
        this.state = {
            lists: []
        }

        this.addKanbanList = this.addKanbanList.bind(this)
    }

    addKanbanList() {

        const obj = this.state
        obj.lists.push(document.getElementById("add").value)
        this.setState(obj)
    }
    render() {
        return (
            <div>
                <h1>Kanban</h1>
                <input id="add"></input>
                <button onClick={this.addKanbanList}>+</button>

                <div class="encaps">
                        {this.state.lists.map((name) => <KanbanList text={name} />)}
                </div>
            </div>

        );
    }
}

export default Kanban 
