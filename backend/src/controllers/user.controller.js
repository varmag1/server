import express from 'express'
import UserRegister from '../models/UserRegister.js'


const getRegister = (req, res) => {
    try {
        const {username, password} = req.body;
        const register = new UserRegister({username, password}).save()
        .then((result) => {res.send(result)})
    } catch (error) {
        res.send(res.json({message: 'error'}))
    }
}

export {getRegister}