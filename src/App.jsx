import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { CssBaseline, Grid } from '@material-ui/core'

import { Header, List, Map } from './components'
import { useDispatchContext } from './context'

const queryClient = new QueryClient()

const App = () => {

	const dispatch = useDispatchContext()

	navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => dispatch({ type: 'COORDINATES', payload: { lat: latitude, lng: longitude } }))
	
	return (
		<QueryClientProvider client={queryClient}>
			<CssBaseline />
			<Header />
			<Grid container spacing={3} style={{ width: '100%' }}>
				<Grid item xs={12} md={4}>
					<List />
				</Grid>
				<Grid item xs={12} md={8}>
					<Map />
				</Grid>
			</Grid>
		</QueryClientProvider>
	)
}

export default App
