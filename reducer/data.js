'use strict';
export default function data(state = [] , action) {
	switch(action.type) {
		case "MODIFY_NUM":
		  return state.map(item =>
				item.id === action.id ? Object.assign({}, item, { num: action.num}) : item
		 	)
		
		case "DELETE_ITEM":
		  return state.filter(item =>
				item.id !== action.id
		  )

    case "ADD_GOODS":
      action.json.num = action.num;
      return [action.json].concat(state)

		case "RECEIVED_POSTS":
		  return action.data

		default:
		  return state;
	}
}