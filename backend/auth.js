const passport = require("passport")
const passportJWT = require("passport-jwt")

const cfg = require("./config/config")
const ExtractJwt = passportJWT.ExtractJwt
const Strategy = passportJWT.Strategy
const params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

module.exports = function () {
    var strategy = new Strategy(params, function (payload, done) {
        var user = payload.id == '1' || undefined
        if (user) {
            return done(null, {
                id: '1',
                name: 'Teste'
            })
        } else {
            return done(new Error("User not found"), null)
        }
    })
    passport.use(strategy)
    return {
        initialize: function () {
            return passport.initialize()
        },
        authenticate: function () {
            return passport.authenticate('jwt', { session: false })
        }
    }
}
