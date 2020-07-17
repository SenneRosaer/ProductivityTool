import React from 'react';
import './KanbanItem.css';
import { Draggable } from 'react-beautiful-dnd';
import { Component } from 'react';
import { Modal } from 'react-bootstrap';

class KanbanItem extends Component {

    constructor(props) {
        super()
        this.state = {
            text: "",
            showModal: false
        }
        this.openEditor = this.openEditor.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.changeText = this.changeText.bind(this)
        this.drag = this.drag.bind(this)

    }

    drag(event) {
        this.props.toParent(this.props.id);
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
        const obj = this.state
        obj.text = event.currentTarget.value
        this.props.text = event.currentTarget.value
        this.setState(obj)
    }

    render() {
        return (
            <>
                <div className="KanbanItem" id={this.props.id} onDoubleClick={this.openEditor} draggable="true" onDragStart={this.drag}>
                    {this.state.text}
                </div>
                <div className="modal">
                    <Modal show={this.state.showModal} onHide={this.handleClose} >
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <textarea className="editor" rows="30" onChange={this.changeText}>
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


export default KanbanItem;