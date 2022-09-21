import {INIT_STATE} from "../initialState/initialState"

export default function postsReducers(state = INIT_STATE.posts, action){
    switch(action.type){
        case "GET_POST_REQUEST":
            return{
                ...state,
                isLoading:true,
            }
            
        case "GET_POSTS_SUCCESS":
            
            return{
                ...state,
                isLoading: false,
                data: action.data
            }
            
        case "GET_POSTS_FAIL":
            return {
                ...state,
                isLoading: false,   
            }

        case "POST_SUCCESS":
            
            return{
                ...state,
                data: [...state.data,action.data]
            }
        case "UPDATE_SUCCESS":
            return {
                ...state,
                data : state.data.map(post => post._id === action.data._id ? action.data : post)
            }


        
        default:
            return state

            
    }
}