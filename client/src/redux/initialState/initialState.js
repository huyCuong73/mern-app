export const INIT_STATE = {
    auth:{
        user: JSON.parse(localStorage.getItem("user")) || null,
        isFetching: false,
        error: false,
    },
    movie:{
        isLoading:false,
        movie: {},
        error:false
    },
    rating:{
        isLoading: false,   
        ratingData:null
    },
    searchItems:{
        isFetching: false,
        items:[]
    }
}