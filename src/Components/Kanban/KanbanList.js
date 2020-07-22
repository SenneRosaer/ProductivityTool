import React from 'react';
import './KanbanList.css';
import KanbanItem from "./KanbanItem";
import { Component } from 'react';
import { connect } from 'react-redux';
import { changeItem, addItem, removeItem, changeAllItems } from '../../Actions/Actions';

class KanbanList extends Component {

    constructor() {
        super()
        this.state = {
            createdItems: 0
        }

        this.addKanbanItem = this.addKanbanItem.bind(this)
        this.drop = this.drop.bind(this)
        this.CleanEmpty = this.CleanEmpty.bind(this)
        this.createItems = this.createItems.bind(this)
        this.callback = this.callback.bind(this)
        this.getCorrectListFromRedux = this.getCorrectListFromRedux.bind(this)
    }


    drop(event) {
        event.preventDefault()
        const obj = this.state

        var transfer = JSON.parse(event.dataTransfer.getData("text"))
        var data = transfer.id

        var list = this.getCorrectListFromRedux()
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == transfer.id) {
                this.props.removeItem(transfer.id, this.props.text)

            }
        }



        var insert_index = 0
        list = this.getCorrectListFromRedux()
        if (list.length > 0) {
            var first_rect = document.getElementById(list[0].id).getBoundingClientRect()
            var last_rect = document.getElementById(list[list.length - 1].id).getBoundingClientRect()
            if (event.pageY < (first_rect.top + first_rect.bottom) / 2) {
                insert_index = 0
            } else if (event.pageY > (first_rect.top + first_rect.bottom) / 2 && event.pageY < (last_rect.top + last_rect.bottom) / 2) {
                for (var index = 0; index < list.length - 1; index++) {
                    var rect = document.getElementById(list[index].id).getBoundingClientRect()
                    var ely = (rect.top + rect.bottom) / 2

                    var rect2 = document.getElementById(list[index + 1].id).getBoundingClientRect()
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
            var newrender = [...list]
            newrender.push(transfer)
            this.props.changeAllItems(newrender, this.props.text)
            this.forceUpdate()
        } else {
            var newrender = [...list]
            newrender.splice(insert_index, 0, transfer)
            this.props.changeAllItems(newrender, this.props.text)
            this.forceUpdate()

        }


    }

    async allowDrop(event) {
        event.preventDefault()

    }


    addKanbanItem() {
        var id = this.props.text + "_item_" + this.state.createdItems
        const obj = this.state
        obj.createdItems += 1
        this.setState(obj)
        this.props.addItem(this.props.text, id, "")
    }

    getCorrectListFromRedux() {
        var text = this.props.text
        for (var i = 0; i < this.props.lists.length; i++) {
            if (this.props.lists[i].id == text) {
                return this.props.lists[i].items
            }
        }

    }

    CleanEmpty(event) {
        var transfer = JSON.parse(this.props.transfer)
        var list = this.getCorrectListFromRedux()
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == transfer.id) {
                this.props.removeItem(transfer.id, this.props.text)
                this.forceUpdate()
            }
        }

    }

    callback(text, id) {
        var list = this.getCorrectListFromRedux()
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                this.props.changeItem(this.props.text, id, text)
                this.forceUpdate()
            }
        }
    }
        
    createItems() {
        var callback = this.callback
        var test = this.props.text
        var tmp
        this.props.lists.forEach(element => {
            if (element.id == test) {
                tmp = element
            }
        });
        var render = tmp.items.map(function (element) {
            return <KanbanItem id={element.id} text={element.state.text} showModal={element.state.showModal} changePropText={callback} />


        })
        return render
    }

    render() {
        return (
            <>
                <div className="KanbanCanvas">
                    <div className="CanvasHeading">
                        <h4 class="CanvasTitle"> {this.props.text} </h4>
                        <button class="addbtn" onClick={this.addKanbanItem}><b>+</b></button>
                    </div>
                    <div className="KanbanList" id={this.props.text} onDrop={this.drop} onDragOver={this.allowDrop} onDragLeave={this.CleanEmpty}>
                        {this.createItems()}
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        lists: state.lists,
        transfer: state.transfer
    }
}

const mapDispatchToProps = {
    changeItem: changeItem,
    addItem: addItem,
    removeItem: removeItem,
    changeAllItems: changeAllItems
}

export default connect(mapStateToProps, mapDispatchToProps)(KanbanList);