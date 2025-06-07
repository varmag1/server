import path from 'path'

const createPath = (page) => path.resolve(__dirname, '../../frontend', `${page}.ejs`)

export default createPath