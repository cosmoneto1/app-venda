const express = require('express')
const bodyParser = require('body-parser') 
const jwt = require("jwt-simple")
const app = express()
const auth = require('./auth')() 
const cfg = require('./config/config')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('config/db.json')
const db = low(adapter)

var base = require('./config/base')
 
db.defaults({ mobiles: base })
  .write()

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())

app.use(express.static('public'))

app.use(auth.initialize())

app.get('/api/claro/mobile', auth.authenticate(), (req, res)=>{
    var list = db.get('mobiles').value()
    res.send(list)
})

app.get('/api/claro/mobile/:code', auth.authenticate(), (req, res)=>{
    var code = req.params.code || undefined    
    if (code) {
        var result = db.get('mobiles').find({'code': code}).value()
        res.send(result)
    } else {
        res.send([])
    }    
})

app.post('/api/claro/mobile', auth.authenticate(), (req, res)=>{
    if (req.body) {       
        let mobile = req.body;
        db.get('mobiles')
            .push(mobile)
            .write()
        res.send(req.body)    
    } else {
        res.sendStatus(500)
    }
})

app.post('/api/claro/login', (req, res)=>{
    if (req.body) {        
        var login = req.body.username
        var password = req.body.password
        
        if (login=='teste' && password=='teste') {
            var payload = {
                id: '1'
            }            
            var token = jwt.encode(payload, cfg.jwtSecret)
            res.json({
                token: token
            })
            
        } else {
            res.sendStatus(401)
        }
    } else {
        res.sendStatus(401)
    }    
})

app.listen(3000, () => console.log('app port 3000'))