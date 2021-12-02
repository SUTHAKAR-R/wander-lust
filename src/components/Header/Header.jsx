import React, { useState } from 'react'
import { AppBar, Box, Toolbar, Typography, InputBase } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { Autocomplete } from '@react-google-maps/api'

import { useDispatchContext } from '../../context'
import useStyles from './styles'

const Header = () => {

	const classes = useStyles()
	const [autocomplete, setAutocomplete] = useState(null)
	const dispatch = useDispatchContext()

	const onPlaceChanged = () => {
		const lat = autocomplete.getPlace().geometry.location.lat()
		const lng = autocomplete.getPlace().geometry.location.lng()
		dispatch({ type: 'COORDINATES', payload: { lat, lng } })
	}

	return (
		<AppBar position='static'>
			<Toolbar className={classes.toolbar}>
				<Typography variant='h5' className={classes.title}>
					Wander Lust
				</Typography>
				<Box display='flex'>
					<Typography variant='h6' className={classes.title}>
						Explore New Places
					</Typography>
					<Autocomplete onLoad={autoC => setAutocomplete(autoC)} onPlaceChanged={onPlaceChanged}>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase placeholder='Search..' classes={{ root: classes.inputRoot, input: classes.inputInput }} />
						</div>
					</Autocomplete>
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default Header