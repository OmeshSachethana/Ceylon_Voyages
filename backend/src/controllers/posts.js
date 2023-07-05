import express from 'express';
import mongoose from "mongoose";
import { toSuccess } from '../utils'
import PostMessage from "../models/postMessage.js";

const router = express.Router();

/*export const getPosts = async (req,res) => {
  
  try {
    const postMessage = await PostMessage.find(); //find in the database

    res.status(200).json(postMessage);
  } catch (error) {

    res.status(404).json({message: error.message});

  }
}*/

export const getPosts = async (req, res) => {
  try {
    const data = await PostMessage.find()
    return toSuccess({ res, data, message: 'Posts retrieved successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}




/*export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
      const title = new RegExp(searchQuery, "i");

      const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

      res.json({ data: posts });
  } catch (error) {    
      res.status(404).json({ message: error.message });
  }
}*/

export const getPostsBySearch = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");

    const posts = await PostMessage.find({ title });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}


export const createPost = async (req,res) => {

    const post = req.body;
    const newPost = new PostMessage(post);

    try{
        await newPost.save();

        res.status(201).json(newPost);

    } catch (error){
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;

  const post = req.body;

  //check if the id is mongoose id
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");

  
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id}, { new: true });

  res.json(updatedPost);
}

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const post = await PostMessage.findById(id);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
  
  res.json(updatedPost);
}

/*export const searchPosts = async (req, res) => {
  const { term } = req.params
  try {
    const postMessage = await PostMessage.find({
      $or: [
        { title: { $regex: term, $options: 'i' } }, // Case-insensitive regex search on tourName
       // { tourType: { $regex: term, $options: 'i' } }, // Case-insensitive regex search on tourType
       // { description: { $regex: term, $options: 'i' } } // Case-insensitive regex search on description
      ]
    })
    return toSuccess({ res, data: postMessage, message: 'Posts retrieved successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}*/



export default router;