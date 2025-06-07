import UserRegister from '../models/UserRegister.js'


const getRegister = (req, res) => {
    try {
        res.send('get response')
    } catch (error) {
        console.log('error', error)
    }
}

const postRegister = (req, res) => {
    try {
        const {username, password} = req.body;
        const register = new UserRegister({username, password})
        register.save()
        .then((result) => {res.send(result)})
    } catch (error) {
        res.send(res.json({message: 'error'}))
    }
}

export {getRegister, postRegister}