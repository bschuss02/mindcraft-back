function createObjectMap(objectList) {
	const map = {}
	const keys = objectList.map((object) => object._id)
	for (const object of objectList) {
		map[object._id] = object
	}
	return [keys, map]
}

function createSingleObjectMap(object) {
	if (!object) {
		return [null, {}]
	}
	const map = {}
	const key = object._id
	map[key] = object
	return [key, map]
}

function getIds(objectList) {
	return objectList.map((object) => object._id)
}

function getId(object) {
	return object ? object._id : null
}

module.exports = { createObjectMap, createSingleObjectMap, getIds, getId }
