import React from 'react';
import './KanbanList.css';
import KanbanItem from "./KanbanItem";
import EmptyItem from "./EmptyItem";
import { Droppable } from 'react-beautiful-dnd';
import { Component } from 'react';
import { ReactDOM} from 'react-dom';

class KanbanList extends Component {

    constructor() {
        super()
        this.state = {
            items: [],
            indexEmpty: -1
        }

        this.addKanbanItem = this.addKanbanItem.bind(this)
        this.allowDrop = this.allowDrop.bind(this)
    }

    drop(event) {
        event.preventDefault()
        var data = event.dataTransfer.getData('text')
        event.currentTarget.appendChild(document.getElementById(data))

    }

    async allowDrop(event) {
        event.preventDefault()
        console.log(event.pageX + " : " + event.pageY)
        var before
        var after
        

        for (var i = 0; i < this.state.items.length -1; i++){
            var tmp
            var element = this.state.items[i]

                //TODO dit properder doen met refs ofzo
            if (!("id" in element.props)){
                tmp = document.getElementById("emp").getBoundingClientRect()
            } else {
                tmp = document.getElementById(element.props.id).getBoundingClientRect()
            }

            
            var elx = (tmp.left + tmp.right)/2
            var ely = (tmp.top + tmp.bottom)/2

            var tmp2
            if (i+1 == this.state.indexEmpty){
                tmp2 = document.getElementById("emp").getBoundingClientRect()
            } else {
                tmp2 = document.getElementById(this.state.items[i+1].props.id).getBoundingClientRect()
            }
             
            if(event.pageY > ely && event.pageY < (tmp2.top + tmp2.bottom)/2){
                before = i
                after = i+1
            }

            if (this.state.indexEmpty == -1){
                const obj = this.state
                obj.indexEmpty = before
                const reee = <EmptyItem />
                obj.items.splice(before, 0, reee)
                this.setState(obj)
            } else {
                const obj = this.state
                obj.items.splice(obj.indexEmpty,1)
                obj.items.splice(before,0, <EmptyItem/>)
                obj.indexEmpty = before
                this.setState(obj)
            }
        }

        setTimeout(100)
    }

    addKanbanItem() {
        var id = this.props.text + "" + this.state.items.length

        const obj = this.state
        obj.items.push(<KanbanItem id={id}/>)
        this.setState(obj)
    }

    render() {
        return (
            <>
            <div class="KanbanCanvas">
                <div class="CanvasHeading">
                    <h4> {this.props.text} </h4>
                    <button onClick={this.addKanbanItem}>+</button>
                </div>
                <div class="KanbanList" onDrop={this.drop} onDragOver={this.allowDrop}>
                    {this.state.items.map((number) => number)}
                </div>
            </div>
            </>
        )
    }
}

export default KanbanList