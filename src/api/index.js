import axios from 'axios'

export const fetchPlaces = async ({ queryKey }) => {

	const { bounds: { ne } } = queryKey[1]
	const { bounds: { sw } } = queryKey[1]
	const { type } = queryKey[1]

	const options = {
		method: 'GET',
		url: `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
		params: {
			bl_latitude: sw.lat,
			tr_latitude: ne.lat,
			bl_longitude: sw.lng,
			tr_longitude: ne.lng
		},
		headers: {
			'x-rapidapi-key': 'af7a7b0fc7mshe07c17b53ef1facp1b9a56jsn668528215a54',
			'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
		}
	}

	try {
		const { data: { data } } = await axios.request(options)
		return data
	} catch (e) {
		console.log(e)
	}
}