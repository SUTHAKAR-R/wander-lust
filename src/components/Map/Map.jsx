import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Paper, Typography, useMediaQuery } from '@material-ui/core'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import Rating from '@material-ui/lab/Rating'

import { useDispatchContext, useStateContext } from '../../context'

import useStyles from './styles'

const Map = () => {

	const classes = useStyles()
	const { coordinates, places } = useStateContext()
	const dispatch = useDispatchContext()
	const isDesktop = useMediaQuery('(min-width:600px)')

	return (
		<div className={classes.mapContainer}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: 'AIzaSyDFmUU2KjRrD1DwQwgDt8iCI0kqdVHxQgE' }}
				defaultZoom={14}
				center={coordinates}
				margin={[50, 50, 50, 50]}
				options={''}
				onChange={e => {
					dispatch({ type: 'COORDINATES', payload: e.center })
					dispatch({ type: 'BOUNDS', payload: e.marginBounds })
				}}
				onChildClick={child => dispatch({ type: 'CHILD', payload: child })}
			>
				{places?.map((place, i) => (
					<div 
						key={i}
						className={classes.markerContainer}
						lat={Number(place?.latitude)}
						lng={Number(place?.longitude)}
					>
						{
							!isDesktop ? (
								<LocationOnOutlinedIcon color='primary' fontSize='large' />
							) : (
								<Paper elevation={3} className={classes.paper}>
									<Typography className={classes.Typography} variant='subtitle2' gutterBottom>
										{place?.name}
									</Typography>
									<img 
										className={classes.pointer} 
										src={place.photo?.images.large.url || 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
										alt={place?.name}
									/>
									<Rating size='small' value={Number(place?.rating)} readOnly />
								</Paper>
							)
						}
					</div>
				))}
			</GoogleMapReact>
		</div>
	)
}

export default Map