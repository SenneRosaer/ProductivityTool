import React, { Component } from 'react';
import KanbanList from './Kanban/KanbanList';
import "./Kanban.css"
import { addList, placeBack } from '../Actions/Actions';
import { connect } from 'react-redux';

class Kanban extends Component {
    constructor() {
        super();
        this.addKanbanList = this.addKanbanList.bind(this)
        this.drop = this.drop.bind(this)
    }

    addKanbanList() {

        const obj = this.state
        var canadd = true
        this.props.lists.forEach(element => {
            if (element.id == document.getElementById("add").value) {
                canadd = false
            }
        });
        if (canadd) {
            this.props.addList(document.getElementById("add").value, document.getElementById("add").value)
            this.forceUpdate()
        } else {
            window.alert("Cannot have duplicate list names")
        }
    }



    renderlists() {
        var rendering = this.props.lists.map((result) => <KanbanList toParent={this.callback}
             text={result.id} />)
        return rendering
    }

    drop(event) {
        event.preventDefault()
        if (event.target.className != "KanbanList" && event.target.className != "delete"){
            this.props.placeBack()
            this.forceUpdate()
        } else if (event.target.className == "delete") {
            
        }
        
    }

    onDragOver(event) {
        event.preventDefault()
    }

    async allowDrop(event) {
        event.preventDefault()

    }


    render() {
        return (
            <div onDrop={this.drop} onDragOver={this.allowDrop}>
                <h1>Kanban</h1>
                <input id="add"></input>
                <button class="addlist" onClick={this.addKanbanList}><b>+</b></button>
                <button className="delete" onDrop={this.drop} onDragOver={this.allowDrop} disabled>Delete</button>
                <div class="encaps">
                    {
                        this.renderlists()
                    }
                </div>
            </div>

        );
    }
}
const mapStateToProps = function (state) {
    return {
        lists: state.root.lists,
        amount : state.root.lists.length
    }
}


const mapDispatchToProps = {
    addList: addList,
    placeBack: placeBack
}



export default connect(mapStateToProps, mapDispatchToProps)(Kanban) 
