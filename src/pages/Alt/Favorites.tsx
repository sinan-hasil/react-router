import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link, useParams } from "react-router-dom";
import useStore from "../Store";
import { useEffect, useState } from "react";

interface UserProps {
  id: number;
  name: string;
  username: string;
  email: string;
}

const Favorites = () => {
  const [data, setData] = useState<UserProps | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        const userData = await response.json();
        setData(userData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();

    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      useStore.getState().set({ favorites: JSON.parse(storedFavorites) });
    }
  }, [userId]);

  const { favorites } = useStore();

  const deletePhoto = (photoId: number) => {
    const filteredPhoto = favorites.filter((photo) => photo.id !== photoId);
    favorites.push(filteredPhoto);
  };

  return (
    <Container>
      <Row>
        {favorites.length === 0 ? (
          <div>Henüz favorilenmiş bir öğe yok.</div>
        ) : isLoading ? (
          <div>Yükleniyor...</div>
        ) : (
          favorites.map((image) => (
            <Col key={image.id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={image.thumbnailUrl} />
                <Card.Body>
                  <Card.Title>{image.title}</Card.Title>
                  <Card.Text>
                    {data && (
                      <p>
                        <Nav.Link as={Link} to={`/albums/${data.id}`}>
                          {data.username}
                        </Nav.Link>
                      </p>
                    )}
                  </Card.Text>
                </Card.Body>
                <Button variant="danger" onClick={() => deletePhoto(image.id)}>Kaldır</Button>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Favorites;
