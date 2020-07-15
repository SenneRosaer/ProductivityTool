import React from 'react';
import './KanbanList.css';
import KanbanItem from "./KanbanItem";
import { Droppable } from 'react-beautiful-dnd';
import {Component} from 'react';

class KanbanList extends Component {

    constructor (){
        super()
        this.state = {
            items : []
        }

        this.addKanbanItem = this.addKanbanItem.bind(this)
    }

    drop(event) {
        event.preventDefault()
        var data = event.dataTransfer.getData('text')
        event.currentTarget.appendChild(document.getElementById(data))
        
    }

    allowDrop(event) {
        event.preventDefault()
    }

    addKanbanItem() {
        var id = this.props.text + "" + this.state.items.length
        
        const obj = this.state
        obj.items.push(id)
        this.setState(obj)
    }

    render(){
        return (
            <div class="KanbanCanvas">
                <div class="CanvasHeading">
                <h4> {this.props.text} </h4>
                <button onClick={this.addKanbanItem}>+</button>
                </div>
                <div class="KanbanList" onDrop={this.drop} onDragOver={this.allowDrop}>
                    {this.state.items.map((number) => <KanbanItem id={number} />)}
                </div>
            </div>
        )
    }
}

export default KanbanList