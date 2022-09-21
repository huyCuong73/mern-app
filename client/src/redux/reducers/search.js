import {INIT_STATE} from "../initialState/initialState"

export default function postsReducers(state = INIT_STATE.searchItems, action){
    switch(action.type){
        case "GET_SEARCH_REQUEST":
            return{
                ...state,
                isFetching:true,
            }
            
        case "GET_SEARCH_SUCCESS":
            
            return{
                ...state,
                isFetching: false,
                items: action.movies
            }
            
        case "GET_SEARCH_FAILURE":
            return {
                isFetching: false,
                error: true,   
            }

        default:
            return {...state}

            
    }
}