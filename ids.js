const { GH_CLIENT_ID, GH_CLIENT_SECRET, GH_CB_URL} = process.env

module.exports = {
	github: {
		clientID: GH_CLIENT_ID,
		clientSecret: GH_CLIENT_SECRET,
		callbackURL: GH_CB_URL
	}
}



// export GH_CLIENT_ID=e79d0819799e6406aae4
// export GH_CLIENT_SECRET=018e2e524873f7298f61e1cd4591a4e03b4102ae
// export GH_CB_URL=http://127.0.0.1:5000/auth/github/callback