import express from 'express';
import mongoose from 'mongoose';
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    // check if _id is an mongoose object id
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id}, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    // check if _id is an mongoose object id
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post is deleted.'});
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    // check if the user is authenticated (get req.userId in the auth middleware)
    if (!req.userId) return res.json({ message: 'Unauthenticated' });

    // check if _id is an mongoose object id
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');

    const post = await PostMessage.findById(id);

    // if the user's id is already in the list of ids that have liked the post
    const index = post.likes.findIndex((id) => id === String(req.userId));
    // index === -1 when the user's id is not in the list, the user then like the post
    if (index === -1) {
        // push the user id to the like array
        post.likes.push(req.userId);
    // the user has already liked the post, then can only dislike the post
    } else {
        // remove the id from the like array
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    // the post created on line 61 has .likes, so just pass the post as the input
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}