import { useState, useEffect } from "react";
import useStore from "../Store";
import { useParams } from "react-router-dom";

interface PostComments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface User {
  id: number;
  username: string;
}

interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Posts = () => {
  const { userId } = useParams();
  const [postCommentsState, setPostCommentsState] = useState<PostComments[]>([]);
  const [likeState, setLikeState] = useState<{ [key: number]: boolean }>({});
  const [userState, setUserState] = useState<User | null>(null);
  const { loadingPostComments, setLoadingPostComments, setPostLikeCount, likeCount, setPostLike } = useStore();

  useEffect(() => {
    const fetchPostComments = async () => {
      try {
        setLoadingPostComments(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${userId}/comments`
        );
        const postComments = await response.json();
        setPostCommentsState(postComments);

        const userResponse = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        const user = await userResponse.json();
        setUserState(user);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingPostComments(false);
      }
    };

    fetchPostComments();
  }, [userId, setLoadingPostComments]);

  const toggleLike = (comment: PostComments) => {
    setLikeState((prevLikeState) => ({
      ...prevLikeState,
      [comment.id]: !prevLikeState[comment.id],
    }));

    if (!likeState[comment.id]) {
      setPostLike({ ...comment, userId: userState?.id });
    }

    setPostLikeCount(likeState[comment.id] ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div>
      {loadingPostComments ? (
        <div>Yükleniyor...</div>
      ) : (
        postCommentsState.map((comment) => (
          <div key={comment.id}>
            <h3>{comment.name}</h3>
            <p>{comment.body}</p>
            <p>
              <em>{comment.email}</em>
            </p>
            <button className="asd" onClick={() => toggleLike(comment)}>
              <i
                className={`bi ${
                  likeState[comment.id] ? "bi-heart-fill" : "bi-heart"
                }`}
              ></i>
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Posts;
