import {INIT_STATE} from "../initialState/initialState"

export default function postsReducers(state = INIT_STATE.movie, action){
    switch(action.type){
        case "GET_MOVIE_REQUEST":
            return{
                ...state,
                isLoading:true,
            }
            
        case "GET_MOVIE_SUCCESS":
            
            return{
                ...state,
                isLoading: false,
                movie: action.movie
            }
            
        case "GET_MOVIE_FAILURE":
            return {
                isLoading: false,
                error: true,   
            }

        // case "UPDATE_RATING_SUCCESS":
            
        //     return{
        //         ...state,
        //         data: [...state.data,action.data]
        //     }
        // case "UPDATE_COMMENT_SUCCESS":
        //     return {
        //         ...state,
        //         data : state.data.map(post => post._id === action.data._id ? action.data : post)
        //     }

        default:
            return {...state}

            
    }
}