export function serialize(obj) {
	const str = []
	for (const p in obj)
		if (Object.prototype.hasOwnProperty.call(obj, p)) {
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
		}
	return str.join("&")
}
