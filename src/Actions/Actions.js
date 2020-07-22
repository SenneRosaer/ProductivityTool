export function addItem(listid ,id, text){
    return {type: 'ADD_ITEM', list_id: listid, text: text, item_id: id}
}

export function changeItem(listid,id, text){
    return {type: 'CHANGE_ITEM', item_id: id, text: text, list_id:listid}
}

export function changeAllItems(newitems, id){
    return {type: 'CHANGE_ALL_ITEMS', items: newitems, id:id}
}

export function removeItem(id, listid){
    return {type: 'REMOVE_ITEM', id: id, listid: listid}
}

export function addList(id, text) {
    return {type: 'ADD_LIST', id, text}
}


export function addTransfer(text) {
    return {type: 'ADD_TRANSFER', text: text}
}