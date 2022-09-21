import {INIT_STATE} from "../initialState/initialState"

export default function postsReducers(state = INIT_STATE.rating, action){
    switch(action.type){
        case "GET_RATING_REQUEST":
            return{
                isLoading:false
            }
            
        case "GET_RATING_SUCCESS":
            
            return{
                ...state,
                isLoading:false,
                ratingData: action.payload
            }
            
        default:
            return state

            
    }
}