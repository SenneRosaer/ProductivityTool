import React, {Component} from 'react';
import KanbanList from './Kanban/KanbanList';

class Kanban extends Component {
    constructor () {
        super();
    }

    render() {
        return( 
            <div>
            <h1>Kanban</h1>
            
            <KanbanList />
            </div>
            
        );
    }
}

export default Kanban 
