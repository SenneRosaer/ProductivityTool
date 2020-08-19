import { combineReducers } from 'redux';

const initialState = {
    lists: [],
    transfer: ""
}


function reducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_ITEM':
            var tmp = Object.assign({}, state)
            for (var index = 0; index < tmp.lists.length; index++) {
                if (tmp.lists[index].id == action.list_id) {
                    tmp.lists[index].items.push({ id: action.item_id, state: { text: action.text, showModal: false } })
                    return tmp
                }
            }
            return tmp
        case 'CHANGE_ITEM':
            var tmp = Object.assign({}, state)
            for (var index = 0; index < tmp.lists.length; index++) {
                if (tmp.lists[index].id == action.list_id) {
                    for (var i = 0; i < tmp.lists[index].items.length; i++) {
                        if (tmp.lists[index].items[i].id == action.item_id) {
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
            for (var i = 0; i < state.lists.length; i++) {
                if (state.lists[i].id == action.id) {
                    tmp.lists[i].items = action.items
                    return tmp

                }
            }

        case 'REMOVE_ITEM':
            var tmp = Object.assign({}, state)
            for (var i = 0; i < tmp.lists.length; i++) {
                if (tmp.lists[i].id == action.listid) {
                    for (var j = 0; j < tmp.lists[i].items.length; j++) {
                        if (tmp.lists[i].items[j].id == action.id) {
                            tmp.lists[i].items.splice(j, 1)
                            return tmp
                        }
                    }

                }
            }

        case 'ADD_TRANSFER':
            var test = JSON.parse(action.text)
            for (var i = 0; i < state.lists.length; i++) {
                for (var j = 0; j < state.lists[i].items.length; j++) {
                    if (state.lists[i].items[j].id == test.id) {
                        test.from = state.lists[i].id
                    }
                }
            }
            return { ...state, transfer: JSON.stringify(test) }

        case 'REMOVE_LIST':
            var tmp = Object.assign({}, state)
            for (var i = 0; i < tmp.lists.length; i++) {    
                if (tmp.lists[i].id == action.id) {
                    tmp.lists.splice(i, 1)
                    return tmp
                }
            }

        case 'PLACE_BACK':
            var tmp = Object.assign({}, state)
            for(var i = 0; i < tmp.lists.length; i++){
                var tmp2 = JSON.parse(state.transfer)
                if(tmp.lists[i].id == tmp2.from){
                    tmp.transfer = ""
                    var json = JSON.parse(state.transfer)
                    delete json["from"]
                    tmp.lists[i].items.push(json)
                }
            }
            return tmp
        default:
            return state
    }
}

const rootReducer = combineReducers({
    root: reducer
})

export default rootReducer
