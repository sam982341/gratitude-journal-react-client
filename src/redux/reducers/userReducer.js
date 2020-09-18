import {
	SET_USER,
	SET_AUTHENTICATED,
	SET_UNAUTHENTICATED,
	LOADING_USER,
} from '../types';

const initialState = {
	authenticated: false,
	credentials: {},
	loading: false,
	likes: [],
	notifications: [],
};

export default function (state = initialState, actions) {
	switch (actions.type) {
		case SET_AUTHENTICATED:
			return {
				...state,
				authenticated: true,
			};
		case SET_UNAUTHENTICATED:
			return {
				initialState,
			};
		case SET_USER:
			return {
				authenticated: true,
				loading: false,
				...actions.payload,
			};
		case LOADING_USER:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
}