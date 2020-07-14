import React from 'react';
import './KanbanList.css';
import KanbanItem from "./KanbanItem";
import { Droppable } from 'react-beautiful-dnd';
import {Component} from 'react';

class KanbanList extends Component {

    constructor (){
        super()
    }

    drop(event) {
        event.preventDefault()
        var data = event.dataTransfer.getData('text')
        event.target.appendChild(document.getElementById(data))
    }

    allowDrop(event) {
        event.preventDefault()
    }

    render(){
        return (
            <div class="KanbanCanvas">
                <h4> First List </h4>
                <div class="KanbanList" onDrop={this.drop} onDragOver={this.allowDrop}>
                    <KanbanItem id="kb1"/>
                    <KanbanItem id="kb2"/>

                    


                </div>
            </div>
        )
    }
}

export default KanbanList