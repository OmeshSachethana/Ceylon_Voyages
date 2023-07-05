import { FETCH_ALL, CREATE, UPDATE, FETCH_POST, DELETE, LIKE, FETCH_BY_SEARCH } from '../constants/actionTypes';

export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload; // Set the state to the fetched posts
    case FETCH_BY_SEARCH:
      return action.payload; // Set the state to the searched posts
    case FETCH_POST:
      return { post: action.payload }; // Set the state to the fetched single post
    case LIKE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post)); // Update the state by replacing the liked post
    case CREATE:
      return [...posts, action.payload]; // Add the newly created post to the state
    case DELETE:
      return posts.filter((post) => post._id !== action.payload); // Remove the deleted post from the state
    case UPDATE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post)); // Update the state with the updated post
    default:
      return posts; // Return the current state if the action type is not recognized
  }
};
