import UserAvatar from "../UserAvatar";
import CreateComment from "./CreateComment";

const CommentSection = ({ session, postId, comments }) => {
  return (
    <>
      {/* <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <UserAvatar
              className="h-10 w-10 "
              user={{
                image: comment?.author?.image || null,
              }}
            />
            <div>
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
      </div> */}
      <CreateComment session={session} postId={postId} />
    </>
  );
};

export default CommentSection;
