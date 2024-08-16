const jwt = require("../utils/jwt")

function asureAuth(req, res, next) {
    if(!req.headers.authorization){
       return res.status(403).send({msg:" no tiene cabecera"})
    }
    
    const token = req.headers.authorization.replace("Bearer ", " ").trim();


 try{
    const payload = jwt.decoded(token)

    const { exp } = payload
    const currenData = new Date().getTime()

    console.log(exp)
    console.log(currenData)

    if (exp <= currenData) {
        return res.status(400).send({msg:"el token ha expirado"})
    }

    req.user = payload
    next()

 } catch (error) {
    return res.status(400).send({msg:"token invalido"})
 }
 
}

module.exports = {
    asureAuth
}