const { GH_CLIENT_ID, GH_CLIENT_SECRET, GH_CB_URL} = process.env

module.exports = {
	github: {
		clientID: GH_CLIENT_ID,
		clientSecret: GH_CLIENT_SECRET,
		callbackURL: GH_CB_URL
	}
}
