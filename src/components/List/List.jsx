import React, { createRef, useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'

import PlaceDetails from '../PlaceDetails/PlaceDetails'
import { useDispatchContext, useStateContext } from '../../context'
import { fetchPlaces } from '../../api'
import useStyles from './styles'

const List = () => {

	const classes = useStyles()
	const [type, setType] = useState('restaurants')
	const [rating, setRating] = useState('')
	const [placeRefs, setPlaceRefs] = useState([])
	const { bounds, child } = useStateContext()
	const dispatch = useDispatchContext()

	const { isLoading, data: places } = useQuery(['fetchPlaces', { bounds, type }], fetchPlaces, {
		refetchOnWindowFocus: false,
		enabled: !!bounds || !!type,
		onSuccess: places => dispatch({ type: 'PLACES', payload: places })
	})
	
	useEffect(() => {
		const refs = Array(places?.length).fill().map((_, i) => placeRefs[i] || createRef())
		setPlaceRefs(refs)
	}, [places])

	useEffect(() => {
		dispatch({ type: 'PLACES', payload: places?.filter(place => place.rating > rating) })
	}, [rating])

	if (isLoading) return <div className={classes.loading}><CircularProgress size='5rem'/></div>

	return (
		<div className={classes.container}>
			<Typography variant='h4'>Restaurants, Hotels & Attractions...</Typography>
			<FormControl className={classes.formControl}>
				<InputLabel>Type</InputLabel>
				<Select value={type} onChange={e => setType(e.target.value)}>
					<MenuItem value='restaurants'>Restaurants</MenuItem>
					<MenuItem value='hotels'>Hotels</MenuItem>
					<MenuItem value='attractions'>Attractions</MenuItem>
				</Select>
			</FormControl>
			<FormControl className={classes.formControl}>
				<InputLabel>Rating</InputLabel>
				<Select value={rating} onChange={e => setRating(e.target.value)}>
					<MenuItem value={0}>All</MenuItem>
					<MenuItem value={3}>Above 3.0</MenuItem>
					<MenuItem value={4}>Above 4.0</MenuItem>
					<MenuItem value={4.5}>Above 4.5</MenuItem>
				</Select>
			</FormControl>
			<Grid container spacing={3} className={classes.list}>
				{places?.map((place, i) => (
					<Grid item xs={12} key={i} ref={placeRefs[i]}>
						<PlaceDetails place={place} selected={Number(child) === i} ref={placeRefs[i]} />
					</Grid>
				))}
			</Grid>
		</div>
	)
}

export default List