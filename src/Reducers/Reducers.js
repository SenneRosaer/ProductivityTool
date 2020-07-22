const { bindActionCreators } = require("redux")

const initialState = {
    lists: [],
    transfer: ""
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_ITEM':
            var tmp = Object.assign({}, state)
            for (var index = 0; index < tmp.lists.length; i++) {
                if (tmp.lists[index].id == action.list_id) {
                    tmp.lists[index].items.push({ id: action.item_id, state :{ text: action.text, showModal: false }})
                    return tmp
                }
            }
            return tmp
        case 'CHANGE_ITEM':
            var tmp = Object.assign({}, state)
            for (var index = 0; index < tmp.lists.length; i++) {
                if (tmp.lists[index].id == action.list_id) {
                    for (var i = 0; i < tmp.lists[index].items.length; i++) {
                        if (tmp.lists[index].items[i].id == action.item_id){
                            tmp.lists[index].items[i].state.text = action.text
                            return tmp

                        }
                    }
                }
            }
        case 'ADD_LIST':
            var tmp = Object.assign({}, state)
            tmp.lists.push({ id: action.id, text: action.text, items: [] })
            return tmp

        case 'CHANGE_ALL_ITEMS':
            var tmp = Object.assign({}, state)
            for(var i = 0; i < state.lists.length; i++) {
                if (state.lists[i].id == action.id){
                    tmp.lists[i].items = action.items
                    return tmp

                }
            } 
        
        case 'REMOVE_ITEM':
            var tmp = Object.assign({}, state)
            for(var i = 0; i < tmp.lists.length; i++) {
                if (tmp.lists[i].id == action.listid){
                    for(var j = 0; j < tmp.lists[i].items.length; j++){
                        if (tmp.lists[i].items[j].id == action.id){
                            tmp.lists[i].items.splice(j,1)
                            return tmp
                        }
                    }

                }
            } 

        case 'ADD_TRANSFER':
            return {...state, transfer: action.text}

        default:
            return state
    }
}

export default reducer
