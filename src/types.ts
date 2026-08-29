export type Locations = {
	name: string
	longitude: number
	latitude: number
}

export type Venue = {
	fsq_place_id: string
	geocodes: { main: { latitude: number; longitude: number } }
}
