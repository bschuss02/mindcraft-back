const postFields = {
	user: 1,
	caption: 1,
	song: 1,
	numAwards: 1,
	createdAt: 1,
	updatedAt: 1,
}

const userFields = {
	username: 1,
	pfp: 1,
	expoPushToken: 1,
}

const playlistFields = {
	user: 1,
	name: 1,
	songs: 1,
	href: 1,
	uri: 1,
	spotifyPlaylistId: 1,
	cover: 1,
	createdAt: 1,
}

function getSelectedFields(model, allowedFields) {
	const addedFields = {}
	if (allowedFields) {
		allowedFields.forEach((field) => {
			addedFields[field] = 1
		})
	}
	switch (model) {
		case "Post":
			return { ...postFields, ...addedFields }

		case "User":
			return { ...userFields, ...addedFields }
		case "Playlist":
			return { ...playlistFields, ...addedFields }
	}
}

module.exports = getSelectedFields
