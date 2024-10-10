import { Comment } from "../models/comment.model.js";
import { Blog } from "../models/blog.model.js";

export const getComments = async (req, res) => {
  try {
    console.log(req.params);
    console.log(req.body);

    const blog = await Blog.findOne({ slug: req.params.id });

    let limit = 10;
    let page = req.body.page || 1;
    const comments = await Comment.find({ blog_id: blog._id })
      .sort({
        commentedAt: -1,
      })
      .populate("commented_by")
      .limit(limit)
      .skip((page - 1) * limit);
    res.status(200).json({ success: true, comments, page, limit });
  } catch (error) {
    return res.status(404).send(error);
  }
};

export const removeComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, comment });
  } catch (error) {
    return res.status(404).send(error);
  }
};
