import React from 'react';
import './KanbanList.css';
import KanbanItem from "./KanbanItem";

const KanbanList = () => {
    return (
        <div class="KanbanCanvas">
            <h4> First List </h4>
            <div class="KanbanList">
                <KanbanItem />
                <KanbanItem />

                <KanbanItem />
                <KanbanItem />
                <KanbanItem />
                <KanbanItem />
                <KanbanItem />
                <KanbanItem />

            </div>
        </div>
    )
}

export default KanbanList