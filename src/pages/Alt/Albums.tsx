import { useState, useEffect } from "react";
import useStore from "../Store";
import { Link, useParams } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { Container } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css"


interface AlbumComments {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface User {
  id: number;
  username: string;
}

interface Photos {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  userId: number;
}


const Posts = () => {
  const { userId } = useParams();
  const [albumCommentsState, setAlbumCommentsState] = useState<AlbumComments[]>([]);
  const [userState, setUserState] = useState<User | null>(null);
  const { loadingAlbumComments, setLoadingAlbumComments, likeCount, setLikeCount, addFavorite } = useStore();
  const [likeState, setLikeState] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchAlbumComments = async () => {
      try {
        setLoadingAlbumComments(true);
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${userId}/photos`);
        const albumComments = await response.json();
        setAlbumCommentsState(albumComments);

        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await userResponse.json();
        setUserState(user);

      } catch (error) {
        console.log(error);
      } finally {
        setLoadingAlbumComments(false);
      }
    };

    fetchAlbumComments();
  }, [userId, setLoadingAlbumComments]);

  const toggleLike = (photo: Photos) => {
    setLikeState((oldState) => ({
      ...oldState,
      [photo.id]: !oldState[photo.id],
    }));
  
    if (!likeState[photo.id]) {
      addFavorite({ ...photo, userId: userState?.id });
    }
  
    setLikeCount(likeState[photo.id] ? likeCount - 1 : likeCount + 1);
  };


  return (
    <Container>
      <div>
      {loadingAlbumComments ? (
        <div>Yükleniyor</div>
      ) : (
        userState && (
          <div>
            <h4>Album sahibi</h4>
            <p><Nav.Link as={Link} to={`/users/${userState.id}`}>{userState.username}</Nav.Link></p>
          </div>
        )
      )}
      {albumCommentsState.map((img) => (
          <div key={img.id}>
            <h3>{img.title}</h3>
            <div className="icons">
            <button className="asd" onClick={() => toggleLike(img)}>
              <i className={`bi ${likeState[img.id] ? 'bi-heart-fill' : 'bi-heart'}`}></i>
              </button>
            <img src={img.thumbnailUrl} />
            </div>
          </div>
        ))}
      
    </div>
    </Container>
  );
}

export default Posts;
