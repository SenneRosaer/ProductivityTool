import React, { Component, createRef } from 'react';
import KanbanList from './Kanban/KanbanList';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "./Kanban.css"
import {addList} from '../Actions/Actions';
import {connect} from 'react-redux';

class Kanban extends Component {
    constructor() {
        super();
        this.state = {
            lists: [],
            listnames: [],
            ref_lists: [],
            moving: React.createRef(),
            from: React.createRef(),

        }

        this.addKanbanList = this.addKanbanList.bind(this)
    }

    addKanbanList() {

        const obj = this.state
        var ref = React.createRef()
        obj.ref_lists.push(ref)
        var canadd = true
        this.props.lists.forEach(element => {
            if(element.id == document.getElementById("add").value){
                canadd = false
            }
        });
        if (canadd){
        obj.listnames.push([document.getElementById("add").value,ref])
        this.props.addList(document.getElementById("add").value,document.getElementById("add").value)

        this.setState(obj)
        } else {
            window.alert("Cannot have duplicate list names")
        }
    }

    

    renderlists(){
        
        var rendering = this.props.lists.map((result) => <KanbanList toParent={this.callback} 
         moving={this.state.moving} 
        from={this.state.from} text={result.id} />)
        return rendering
    }

    render() {
        return (
            <div>
                <h1>Kanban</h1>
                <input id="add"></input>
                <button onClick={this.addKanbanList}>+</button>

                <div class="encaps">
                    {
                        this.renderlists()
                    }
                </div>
            </div>

        );
    }
}
const mapStateToProps = function(state) {
    return {
        lists: state.lists
    }
}


const mapDispatchToProps = {
    addList: addList
}



export default connect(mapStateToProps,mapDispatchToProps)(Kanban) 
