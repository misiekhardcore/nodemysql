import express from 'express'
import connection from '../services/dbconnection.js'
import crypto from 'crypto'

const usersrouter = express()
const conn = connection

usersrouter.get('/',(req,res) =>{
    conn.query('SELECT * FROM users',(err, result)=>{
        if(err)
        res.json({status: 500, error: err, response: null})
        else if(result.length == 0)
        res.json({status: 404, error: 'not_found', response: null})
        else
        res.json({status: 200, error: null, response: result})
    })
})
usersrouter.get('/:uid',(req,res)=>{
    conn.query('SELECT * FROM users WHERE uid=?',[req.params.uid],(err, result)=>{
        if(err)
        res.json({status: 500, error: err, response: null})
        else if(result.length == 0)
        res.json({status: 404, error: 'not_found', response: null})
        else
        res.json({status: 200, error: null, response: result})
    })
})
usersrouter.post('/',(req,res)=>{
    let uid = ''
    if(!req.body.uid)
    uid = makeUid(28)
    else
    uid = req.body.uid

    conn.query('INSERT INTO users (uid, email, displayName) VALUES(?, ?, ?)',[uid, req.body.email, req.body.displayName],(err, result)=>{
        if(err)
        res.json({status: 500, error: err, response: null})
        else if(req.body.email == null || req.body.displayName == null)
        res.json({status: 400, error: 'empty_data'})
        else
        res.json({status: 200, error: null, response: result})
    })
})

usersrouter.put('/:uid',(req,res)=>{
    conn.query('UPDATE users SET email = ?, displayName = ? WHERE uid = ?',[req.body.email, req.body.displayName, req.params.uid],(err, result)=>{
        if(err)
        res.json({status: 500, error: err, response: null})
        else if(req.body.title == null || req.body.body == null)
        res.json({status: 400, error: 'empty_data'})
        else
        res.json({status: 200, error: null, response: result})
    })
})
usersrouter.delete('/:uid',(req,res)=>{
    conn.query('DELETE FROM users WHERE uid=?',[req.params.uid],(err, result)=>{
        if(err)
        res.json({status: 500, error: err, response: null})
        else
        res.json({status: 200, error: null, response: result})
    })
})

function makeUid(length){
    // const uid = crypto.randomBytes(length).toString("hex");
    // const uid = crypto.createHash("sha1").digest('hex')
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    let uid = ''

    for(let i = 0; i<length; i++){
        uid += charset[parseInt(Math.random()*(charset.length))]
    }

    return uid
}

export default usersrouter
