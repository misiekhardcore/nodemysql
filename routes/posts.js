import connection from '../services/dbconnection.js'
import express from 'express'

const postsrouter = express()
const conn = connection

postsrouter.get('/',(req,res)=>{
    conn.query('SELECT * FROM posts',(err, result)=>{
        if(err)
        res.json({status: 500, error: err, response: null})
        else if(result.length == 0)
        res.json({status: 404, error: 'not_found', response: null})
        else
        res.json({status: 200, error: null, response: result})
    })
})

postsrouter.get('/:id',(req,res)=>{
    conn.query('SELECT * FROM posts WHERE id=?',[req.params.id],(err, result)=>{
        if(err)
        res.json({status: 500, error: err, response: null})
        else if(result.length == 0)
        res.json({status: 404, error: 'not_found', response: null})
        else
        res.json({status: 200, error: null, response: result})
    })
})

postsrouter.post('/',(req,res)=>{
    conn.query('INSERT INTO posts (title, body) VALUES(?, ?)',[req.body.title, req.body.body],(err, result)=>{
        if(err)
        res.json({status: 500, error: err, response: null})
        else if(req.body.title == null || req.body.body == null)
        res.json({status: 400, error: 'empty_data'})
        else
        res.json({status: 200, error: null, response: result})
    })
})

postsrouter.put('/:id',(req,res)=>{
    conn.query('UPDATE posts SET title = ?, body = ? WHERE id = ?',[req.body.title, req.body.body, req.params.id],(err, result)=>{
        if(err)
        res.json({status: 500, error: err, response: null})
        else if(req.body.title == null || req.body.body == null)
        res.json({status: 400, error: 'empty_data'})
        else
        res.json({status: 200, error: null, response: result})
    })
})
postsrouter.delete('/:id',(req,res)=>{
    conn.query('DELETE FROM posts WHERE id=?',[req.params.id],(err, result)=>{
        if(err)
        res.json({status: 500, error: err, response: null})
        else
        res.json({status: 200, error: null, response: result})
    })
})

export default postsrouter
