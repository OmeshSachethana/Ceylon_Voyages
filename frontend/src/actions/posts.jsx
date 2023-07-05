import { FETCH_ALL, FETCH_BY_SEARCH, START_LOADING, FETCH_POST, END_LOADING, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import * as api from '../services/posts';

// Action Creators -> are functions that return actions


export const getPost = (id) => async (dispatch) => {
    try {
      //dispatch({ type: START_LOADING });
  
      const { data } = await api.fetchPost(id); //Fetch a post from the server
  
      dispatch({ type: FETCH_POST, payload: data });
    } catch (error) {
      console.log(error);
    }
  };



export const getPosts = () => async (dispatch) => {
    
    try {

        //dispatch({ type: START_LOADING });

        const { data } = await api.fetchPosts(); //Fetch posts from the server
    
        dispatch({ type: FETCH_ALL, payload: data }); // Dispatch an action with the fetched posts
        //dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);    
    }


};

//search action 
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        //dispatch({ type: START_LOADING });
        const data = await api.fetchPostsBySearch(searchQuery); // Fetch posts based on search query

        dispatch({ type: FETCH_BY_SEARCH, payload: data.data }); // Dispatch an action with the searched posts
        //dispatch({ type: END_LOADING });
        console.log(data)
    } catch (error) {
        console.log(error);
    }
}

  
//create action
export const createPost = (post) => async (dispatch) => {
    try {
        //dispatch({ type: START_LOADING });
        const data  = await api.createPost(post); // Send the new post data to the server and create a new post
        
        dispatch({ type: CREATE, payload: data }) // Dispatch an action with the newly created post
    } catch (error) {
        console.log(error);
    }
};

//update action
export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data} = await api.updatePost(id, post); // Send the updated post data to the server and update the post
        
        dispatch( { type: UPDATE, payload: data }); // Dispatch an action with the updated post
    } catch (error) {
        console.log(error);
    }
};

//delete action
export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id); // Send a request to the server to delete the post

        dispatch({ type: DELETE, payload: id }); // Dispatch an action to delete the post from the state
    } catch (error) {
        console.log(error);
    }
};

//like action
export const likePost = (id) => async (dispatch) => {
    try {
      const { data } = await api.likePost(id); // Send a request to the server to like the post
  
      dispatch({ type: LIKE, payload: data }); // Dispatch an action with the updated post (with the new like)
    } catch (error) {
      console.log(error.message);
    }
  };