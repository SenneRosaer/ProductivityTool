import React from 'react';
import './KanbanItem.css';
import { Draggable } from 'react-beautiful-dnd';
import {Component} from 'react';

class KanbanItem extends Component {

    constructor() {
        super()
        
    }
    
    drag(event) {
        event.dataTransfer.setData('text', event.target.id);
    }

    

    render() {
    return (
        <div class="KanbanItem" id={this.props.id}  draggable="true" onDragStart={this.drag}>
            Text            
        </div>
    )
    }
}

export default KanbanItem;