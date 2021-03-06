import {
	SET_POSTS,
	SET_POST,
	LOADING_DATA,
	LIKE_POST,
	UNLIKE_POST,
	DELETE_POST,
	CREATE_POST,
	SUBMIT_COMMENT,
	SET_PROFILE,
	SET_LAST_VISIBLE,
	SET_POSTS_NEXT,
	LOADING_MORE_POSTS,
	DONE_LOADING_POSTS,
} from '../types';

const initialState = {
	posts: [],
	post: {},
	loading: false,
	profile: {},
	lastVisible: null,
	loadingMore: false,
	loadingMorePosts: false,
};

export default function (state = initialState, actions) {
	switch (actions.type) {
		case LOADING_DATA:
			return {
				...state,
				loading: true,
			};
		case SET_POSTS:
			return {
				...state,
				posts: actions.payload,
				loading: false,
			};
		case SET_POSTS_NEXT:
			return {
				...state,
				posts: [...state.posts, ...actions.payload],
				loadingMorePosts: true,
			};
		case SET_POST:
			return {
				...state,
				post: actions.payload,
			};
		case SET_PROFILE:
			return {
				...state,
				profile: actions.payload,
			};
		case UNLIKE_POST:
		case LIKE_POST:
			let likeIndex = state.posts.findIndex(
				(post) => post.postId === actions.payload.postId
			);
			state.posts[likeIndex] = actions.payload;
			if (state.post.postId === actions.payload.postId) {
				state.post = actions.payload;
			}
			return {
				...state,
			};
		case DELETE_POST:
			let deleteIndex = state.posts.findIndex(
				(post) => post.postId === actions.payload
			);
			state.posts.splice(deleteIndex, 1);
			return {
				...state,
			};
		case CREATE_POST:
			return {
				...state,
				posts: [actions.payload, ...state.posts],
			};
		case SUBMIT_COMMENT:
			return {
				...state,
				post: {
					...state.post,
					comments: [...state.post.comments, actions.payload],
				},
			};
		case SET_LAST_VISIBLE:
			return {
				...state,
				lastVisible: actions.payload[actions.payload.length - 1].createdAt,
			};
		case LOADING_MORE_POSTS:
			return {
				...state,
				loadingMorePosts: true,
			};
		case DONE_LOADING_POSTS:
			return {
				...state,
				loadingMorePosts: false,
			};
		default:
			return state;
	}
}
