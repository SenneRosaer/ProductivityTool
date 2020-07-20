import React from 'react';
import './KanbanItem.css';
import { Draggable } from 'react-beautiful-dnd';
import { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import {changeItem} from '../../Actions/Actions';

class KanbanItem extends Component {

    constructor(props) {
        super()
        this.state = {
            showModal: props.showModal
        }
        this.openEditor = this.openEditor.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.changeText = this.changeText.bind(this)
        this.drag = this.drag.bind(this)

    }

    drag(event) {
        var json = {id: event.currentTarget.id, state: this.state}
        json.state.text = this.props.text
        event.dataTransfer.setData("text", JSON.stringify(json))
    }

    openEditor() {
        const obj = this.state
        obj.showModal = true
        this.setState(obj)
    }

    handleClose() {
        const obj = this.state
        obj.showModal = false
        this.setState(obj)
    }

    changeText(event) {
        this.props.changePropText(event.currentTarget.value, this.props.id)
    }

    render() {
        return (
            <>
                <div className="KanbanItem" id={this.props.id} onDoubleClick={this.openEditor} draggable="true" onDragStart={this.drag}>
                    {this.props.text}
                </div>
                <div className="modal">
                    <Modal show={this.state.showModal} onHide={this.handleClose} >
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <textarea id="ree" className="editor" rows="30" onChange={this.changeText}>
                                {this.props.text}
                            </textarea>

                        </Modal.Body>
                        <Modal.Footer>

                        </Modal.Footer>
                    </Modal>
                </div>
            </>
        )
    }
}


export default KanbanItem