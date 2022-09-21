import auth from './auth.js'
import user from './user.js'
import lists from './lists.js'
import movies from './movies.js'
import person from './person.js'

function route(app){
    app.use('/api/auth', auth)
    app.use('/api/users',user)
    app.use('/api/lists',lists)
    app.use('/api/movies',movies)
    app.use('/api/person',person)
}

export default route