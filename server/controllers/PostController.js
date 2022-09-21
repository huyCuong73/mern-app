import {PostModel} from "../models/PostModel.js"

export const PostController = {

    async getPost(req,res){
        try{
            await PostModel.find({
                
            })
                .then(posts => {
                    res.json(posts)
                })
                .catch()
        }catch(err){
            res.status(500).json(err)
        }},
    async createPost(req,res){

        try{
            const newPost = {...req.body};
            const post = new PostModel(newPost)
            await post.save()
        res.status(200).json(post)
        } catch(err){
            res.status(500).json(err)
        }},

    async updatePost(req,res){
        try{
            const updatePost = {...req.body};

            const post = await PostModel.findOneAndUpdate({_id: updatePost._id}, updatePost, {new : true});
            res.status(200).json(post)
        } catch (err){
            res.status(500).json(err)
        }
    }
}


