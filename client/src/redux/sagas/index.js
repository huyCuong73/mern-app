import {takeLatest, call, put, takeEvery} from 'redux-saga/effects'
import * as authActions from '../actions/auth'
import * as movieActions from '../actions/movie'
import * as ratingActions from '../actions/rating'
import * as searchActions from '../actions/search'
import { loginStart, fetchMovie, postRating, searchMovies} from '../../api'
import { getRatingRequest } from '../actions/rating'


const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
}

function* loginRequestSaga(action){
    try {    
        
        const user = yield call(loginStart, action.payload)
        yield call(setUser, user.data)
        yield put(authActions.loginSuccess(user.data))
        
    } catch (err){
        yield put(authActions.loginFailure())
    }
}

function* getMovieRequestSaga(action){
    
    const movie = yield call(fetchMovie,action.movieId)

    yield put(movieActions.getMovieSuccess(movie.data))
}

// function* postRatingRequestSaga(action){
//     const ratingData = yield call(postRating, action);
 
//     yield put(ratingActions.postRatingSuccess(ratingData.data))
// }

function* searchRequestSaga(action){

    const items = yield call(searchMovies, action.query)
    yield put(searchActions.getSearchSuccess(items.data))
}



function* mySaga(){

    yield takeLatest("LOGIN_REQUEST",loginRequestSaga)
    yield takeLatest("GET_MOVIE_REQUEST",getMovieRequestSaga)
    // yield takeLatest("GET_RATING_REQUEST",postRatingRequestSaga )
    yield takeLatest("GET_SEARCH_REQUEST",searchRequestSaga )
}

export default mySaga