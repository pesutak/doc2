const path = require('path')
const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
const { request } = require("@octokit/request")
const { github } = require('./ids')

passport.use( new GitHubStrategy ( {
	
	clientID: github.clientID,
	clientSecret: github.clientSecret,
	callbackURL: github.callbackURL
	},
	async function(accessToken, refreshToken, profile, cb) {
		
		// get org members
		const result = await request('GET /orgs/:org/members', {
			headers: {
				authorization: `token ${accessToken}`,
			},
			org: "excalibur-enterprise"
		});

		// check user is org member
		const user = result.data.find(u => u.login === profile.username)
		console.log(user)
		
		return cb(null, user)
	}
))

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

const isAuthorized = function (req, res, next) {
	
	if(!req.session.passport) {
		console.log(req.session)
		if(req.url.startsWith('/docs')){
			return res.redirect('/login')
		}else{
			return next()
		}
	}

	if(req.session.passport){
		if(Object.keys(req.session.passport).length === 0){
			if(req.url.startsWith('/docs')){
				return res.redirect('/login')
			}else{
				return next()
			}
		}else{
			return next()
				}
	}else{
		return next()
	}
}

module.exports = {
	isAuthorized,
	passport
}
