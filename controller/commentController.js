import Comment from "../models/Comments";

export const postAddComment = async (req, res) => {
    const {
      body: { comment },
      params: { id },
      user
    } = req;
    try {
        await Comment.create({
          video: id,
          creator: user.id,
          comment: comment
        });
        res.status(200);
        res.save();
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally { 
        res.end();
    }
};
export const deleteComment = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        await Comment.findOneAndDelete({ _id: id });
        const comment = await Comment.findById(id);
        if (String(comment.creator) !== String(req.user.id)) {
            throw Error();
        } else {
            res.status(200);
        }
    } catch (error) {
        res.status(400);
    } finally {
        res.end();
    }
};