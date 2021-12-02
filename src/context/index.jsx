import React, { createContext, useContext } from 'react'
import { useImmerReducer } from 'use-immer'

const StateContext = createContext()
const DispatchContext = createContext()

const initialState = {
	coordinates: {
		lat: 13.0827,
		lng: 80.2707
	},
	bounds: {
		ne: {
			lat: 0,
			lng: 0
		},
		sw: {
			lat: 0,
			lng: 0
		}
	},
	places: [],
	child: null
}

const reducer = (draft, { type, payload }) => {
	switch (type) {
		case 'COORDINATES':
			draft.coordinates = payload
			break

		case 'BOUNDS':
			const { ne, sw } = payload
			draft.bounds =  { ne, sw }
			break

		case 'PLACES':
			draft.places = payload
			break

		case 'CHILD':
			draft.child = payload
			break
	
		default:
			break
	}
}

export const ContextProvider = ({ children }) => {

	const [state, dispatch] = useImmerReducer(reducer, initialState)

	console.log()

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				{ children }
			</DispatchContext.Provider>
		</StateContext.Provider>
	)
}

export const useStateContext = () => {
	const { coordinates, bounds, places, child } = useContext(StateContext)
	return { coordinates, bounds, places, child }
}

export const useDispatchContext = () => useContext(DispatchContext)