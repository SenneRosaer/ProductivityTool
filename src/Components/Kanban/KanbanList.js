import React from 'react';
import './KanbanList.css';
import KanbanItem from "./KanbanItem";
import EmptyItem from "./EmptyItem";
import { Droppable } from 'react-beautiful-dnd';
import { Component } from 'react';
import { ReactDOM } from 'react-dom';

class KanbanList extends Component {

    constructor() {
        super()
        this.state = {
            items: [],
            ref_list: [],
            rendering: [],
            indexEmpty: -1,
        }

        this.addKanbanItem = this.addKanbanItem.bind(this)
        this.allowDrop = this.allowDrop.bind(this)
        this.drop = this.drop.bind(this)
        this.CleanEmpty = this.CleanEmpty.bind(this)
        this.test = this.test.bind(this)
        this.createItems = this.createItems.bind(this)
    }

    drop(event) {
        event.preventDefault()
        const obj = this.state
        var tmp = this.props.moving


        var tmpstate
        for (var index = 0; index < this.props.from.current.state.ref_list.length; index++) {
            if (this.props.from.current.state.ref_list[index].current.props.id == tmp.current.props.id) {
                tmpstate = this.props.from.current.state
                tmpstate.rendering.splice(index, 1)
                tmpstate.ref_list.splice(index, 1)
                
            }
        }

        var insert_index = 0
        if (this.state.ref_list.length > 0) {
            var first_rect = document.getElementById(this.state.ref_list[0].current.props.id).getBoundingClientRect()
            var last_rect = document.getElementById(this.state.ref_list[this.state.ref_list.length - 1].current.props.id).getBoundingClientRect()
            if (event.pageY < (first_rect.top + first_rect.bottom) / 2) {
                insert_index = 0
            } else if (event.pageY > (first_rect.top + first_rect.bottom) / 2 && event.pageY < (last_rect.top + last_rect.bottom) / 2) {
                for (var index = 0; index < this.state.rendering.length - 1; index++) {
                    var rect = document.getElementById(this.state.ref_list[index].current.props.id).getBoundingClientRect()
                    var ely = (rect.top + rect.bottom) / 2

                    var rect2 = document.getElementById(this.state.ref_list[index + 1].current.props.id).getBoundingClientRect()
                    var ely2 = (rect2.top + rect2.bottom) / 2

                    if (event.pageY > ely && event.pageY < ely2) {
                        insert_index = index + 1
                        break
                    }

                }
            } else {
                insert_index = this.state.ref_list.length
            }
        }
        obj.rendering.splice(insert_index, 0, [tmp.current.props.id, tmp, tmp.current.state.text])
        obj.ref_list.splice(insert_index, 0, tmp)
        obj.indexEmpty = -1
        this.setState(obj)
        this.props.from.current.setState(tmpstate)

    }

    async allowDrop(event) {
        event.preventDefault()

    }

    test(param) {

        for (var i = 0; i < this.state.ref_list.length; i++) {
            var element = this.state.ref_list[i]
            if (element.current.props.id == param) {
                this.props.toParent(this.state.ref_list[i], this.props.text)
                break
            }
        }
    }

    addKanbanItem() {
        var id = this.props.text + "_item_" + this.state.items.length

        const obj = this.state
        var ref = React.createRef()
        obj.ref_list.push(ref)
        obj.rendering.push([id, ref, ""])
        obj.items.push(<KanbanItem ref={ref} toParent={this.test} id={id} />)
        this.setState(obj)
    }

    CleanEmpty(event) {
        event.preventDefault()

    }

    createItems() {
        var param = this.test
        var render = this.state.rendering.map(function (element) {
            return <KanbanItem ref={element[1]} toParent={param} id={element[0]} text={element[2]} />


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