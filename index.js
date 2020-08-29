const express = require('express')
const session = require('express-session')
const path = require('path')
const swig = require('swig')

const { passport, isAuthorized } = require('./auth')
const { github } = require('./ids')
const { SESSION_SECRET } = process.env

const DOCS_DEFAULT_URL = `/docs/${process.env.DOCS_INDEX || 'index.html'}`
const PORT = process.env.PORT || 5000

const app = express()

app
	.use(session({
		secret: SESSION_SECRET || 'ewiuytibewiutybvewitu',
		resave: true,
		saveUninitialized: true
	}))
	.use(isAuthorized)
	.use(passport.initialize())
	.use(passport.session())
	.use(express.static(path.join(__dirname, 'public')))
	.use('/docs', express.static(path.join(__dirname, 'docs')))
  .set('views', path.join(__dirname, 'views'))
	.engine('html', new swig.Swig().renderFile)
  .set('view engine', 'html')
	.listen(PORT, () =>  {
		console.log(`GH_CB_URL: ${ github.callbackURL }`)
		console.log(`Listening on ${ PORT }`)
	})
	
app.get('/', isAuthorized, (req,res)=>{
		res.redirect(DOCS_DEFAULT_URL)
})

app.get('/docs', isAuthorized, (req,res) => {
		res.redirect(DOCS_DEFAULT_URL)
})

app.get('/login', (req,res) => {
	res.render('login', { title: 'Login' })
})

app.get('/logout', (req,res) => {
	req.logOut();
	res.redirect('/login')
})

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email', 'read:org' ] }),
  function(req, res) {
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
	}
)

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/')
	}
)
