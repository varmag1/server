import createPath from '../helpers/createPath.js'

const getHome = (req, res) => {
    try {
        res.render(createPath('test'))
    } catch (error) {
        console.log(error)
    }
}

export {
    getHome, 

}