import React from 'react';
import './KanbanList.css';
import KanbanItem from "./KanbanItem";
import EmptyItem from "./EmptyItem";
import { Droppable } from 'react-beautiful-dnd';
import { Component } from 'react';
import { ReactDOM, unmountComponentAtNode } from 'react-dom';

class KanbanList extends Component {

    constructor() {
        super()
        this.state = {
            rendering: [],
            createdItems : 0
        }

        this.addKanbanItem = this.addKanbanItem.bind(this)
        this.allowDrop = this.allowDrop.bind(this)
        this.drop = this.drop.bind(this)
        this.CleanEmpty = this.CleanEmpty.bind(this)
        this.createItems = this.createItems.bind(this)
        this.callback = this.callback.bind(this)
    }

    drop(event) {
        event.preventDefault()
        const obj = this.state

        var transfer = JSON.parse(event.dataTransfer.getData("text"))
        var data = transfer.id

        for (var i = 0; i < this.state.rendering.length; i++) {
            if (this.state.rendering[i].id == transfer.id) {
                var newrender = this.state.rendering
                newrender.splice(i, 1)
                this.setState({ rendering: newrender })
            }
        }



        var insert_index = 0
        if (this.state.rendering.length > 0) {
            var first_rect = document.getElementById(this.state.rendering[0].id).getBoundingClientRect()
            var last_rect = document.getElementById(this.state.rendering[this.state.rendering.length - 1].id).getBoundingClientRect()
            if (event.pageY < (first_rect.top + first_rect.bottom) / 2) {
                insert_index = 0
            } else if (event.pageY > (first_rect.top + first_rect.bottom) / 2 && event.pageY < (last_rect.top + last_rect.bottom) / 2) {
                for (var index = 0; index < this.state.rendering.length - 1; index++) {
                    var rect = document.getElementById(this.state.rendering[index].id).getBoundingClientRect()
                    var ely = (rect.top + rect.bottom) / 2

                    var rect2 = document.getElementById(this.state.rendering[index + 1].id).getBoundingClientRect()
                    var ely2 = (rect2.top + rect2.bottom) / 2

                    if (event.pageY > ely && event.pageY < ely2) {
                        insert_index = index + 1
                        break
                    }

                }
            } else {
                insert_index = -1
            }
        }

        if (insert_index == -1) {
            var newrender = this.state.rendering
            newrender.push(transfer)
            this.setState({ rendering: newrender })
        } else {
            var newrender = this.state.rendering
            newrender.splice(insert_index, 0, transfer)
            this.setState({ rendering: newrender })
        }


    }

    async allowDrop(event) {
        event.preventDefault()

    }


    addKanbanItem() {
        var id = this.props.text + "_item_" + this.state.createdItems
        var renderingdata = { id: id, state: { text: "", showModal: false } }
        const obj = this.state
        obj.createdItems += 1
        obj.rendering.push(renderingdata)
        this.setState(obj)
    }

    CleanEmpty(event) {
        event.preventDefault()
        var transfer = JSON.parse(event.dataTransfer.getData("text"))

        for (var i = 0; i < this.state.rendering.length; i++) {
            if (this.state.rendering[i].id == transfer.id) {
                var newrender = this.state.rendering
                newrender.splice(i, 1)
                this.setState({ rendering: newrender })

            }
        }

    }

    callback (text, id) {
        for (var i = 0; i < this.state.rendering.length; i++) {
            if (this.state.rendering[i].id == id) {
                var newrender = this.state.rendering
                newrender[i].state.text = text
                this.setState({ rendering: newrender })
            }
        }
    }

    createItems() {
        var callback = this.callback
        var render = this.state.rendering.map(function (element) {
            return <KanbanItem id={element.id} text={element.state.text} showModal={element.state.showModal} changePropText={callback} />


        })
        return render
    }

    render() {  
        return (
            <>
                <div className="KanbanCanvas">
                    <div className="CanvasHeading">
                        <h4> {this.props.text} </h4>
                        <button onClick={this.addKanbanItem}>+</button>
                    </div>
                    <div className="KanbanList" id={this.props.text} onDrop={this.drop} onDragOver={this.allowDrop} onDragLeave={this.CleanEmpty}>
                        {this.createItems()}
                    </div>
                </div>
            </>
        )
    }
}

export default KanbanList