const { getSpotifyApi, configureSpotifyApi } = require("./getSpotifyApi")

function addIsAwarded(posts, user) {
	return posts.map((post) => {
		const isAwarded = user.awards.includes(post._id)
		return { ...post._doc, isAwarded }
	})
}

function addIsRequested(users, currentUser) {
	return users.map((user) => {
		const isRequestSent = currentUser.sentFriendRequests.includes(user._id)
		const isRequestReceived = currentUser.receivedFriendRequests.includes(
			user._id,
		)
		const isFriend = currentUser.friends.includes(user._id)
		return { ...user._doc, isRequestSent, isRequestReceived, isFriend }
	})
}

async function addIsAwardedAndIsSaved(posts, user) {
	const spotifyApi = await configureSpotifyApi(user)
	const songIds = posts.map((post) => post.song.songId)
	if (songIds.length === 0) return posts
	const response = await spotifyApi.containsMySavedTracks(songIds)
	const savedList = response.body
	return posts.map((post, i) => {
		const isAwarded = user.awards.includes(post._id)
		const isSaved = savedList[i]
		return { ...post._doc, isAwarded, isSaved }
	})
}

module.exports = { addIsAwarded, addIsRequested, addIsAwardedAndIsSaved }
