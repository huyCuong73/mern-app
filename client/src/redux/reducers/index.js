import { combineReducers } from "redux";
import auth from './auth'
import movie from './movie'
import search from './search'
import rating from './rating'

export default combineReducers({
     auth, movie, search, rating
})