import React from 'react';
import './KanbanItem.css';
import { Draggable } from 'react-beautiful-dnd';
import { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addTransfer} from '../../Actions/Actions';

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
        event.dataTransfer.setData("text/plain", JSON.stringify(json))
        this.props.addTransfer(JSON.stringify(json))
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

    endDrag(event){
        event.preventDefault()
    }

    render() {
        return (
            <>
                <div className="KanbanItem" id={this.props.id} onDoubleClick={this.openEditor} draggable="true" onDragStart={this.drag} onDragEnd={this.endDrag}>
                    {this.props.text}
                </div>
                <div className="modal">
                    <Modal show={this.state.showModal} onHide={this.handleClose} >
                        <Modal.Header closeButton>
                            <Modal.Title>Edit text</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <textarea className="editor" rows="30" onChange={this.changeText}>
                                {this.props.text}
                            </textarea>

                        </Modal.Body>

                    </Modal>
                </div>
            </>
        )
    }
}

const mapDispatchToProps = {
    addTransfer: addTransfer

}


export default connect(null,mapDispatchToProps)(KanbanItem)