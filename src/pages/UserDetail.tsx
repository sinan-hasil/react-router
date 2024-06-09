import { Link, useLoaderData, useParams } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import useStore from "./Store";

interface UserProps {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface UserPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface UserAlbum {
  userId: number;
  id: number;
  title: string;
}

interface UserTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const fetchUserLoader = async ({ params }: any) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.userId}`
  );
  const user = await response.json();
  // console.log(user)
  // console.log(params.userId)
  return user;
};

function UserDetail() {
  const user = useLoaderData() as UserProps;
  const { userId } = useParams();
  const [post, setPost] = useState<UserPost[]>();
  const [albums, setAlbums] = useState<UserAlbum[]>();
  const [todos, setTodos] = useState<UserTodo[]>();

  const {loadingPost, loadingAlbum, loadingTodo, setLoadingPost, setLoadingAlbum, setLoadingTodo} = useStore();

  useEffect(() => {
    //postlar
    const fetchData = async () => {
      try {
        setLoadingPost(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );
        const data = await response.json();
        //console.log(data);
        setPost(data);
        
      } catch (error) {
        console.error("Br hata oluştu", error);
       
      } finally {
        setLoadingPost(false);
      }
    };
    fetchData();

    //albümler
    const fetchAlbums = async () => {
      try {
        setLoadingAlbum(true);
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
        );
        const album = await res.json();
        //console.log(albums);
        setAlbums(album);
        
      } catch (err) {
        console.log(err);
       
      } finally {
        setLoadingAlbum(false);
      }
    };
    fetchAlbums();

    // todlar
    const fetchTodos = async () => {
      try {
        setLoadingTodo(true);
        const resp = await fetch(
          `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
        );
        const todo = await resp.json();
        //console.log(todo),
        setTodos(todo);
        
      } catch (e) {
        console.log(e);
        
      } finally {
        setLoadingTodo(false);
      }
    };
    fetchTodos();
  }, [userId, setLoadingPost, setLoadingAlbum, setLoadingTodo]);

  return (
    <>
      <div>
        <h1>User Detail</h1>
        <p>ID: {user.id}</p>
        <p>Name: {user.name}</p>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>

      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Post">
            {loadingPost ? 
            (<div>Yükelniyor...</div>) : 
            (post?.map((pt) => {
              return (
                <div key={pt.id}>
                  <Nav.Link as={Link} to={`userdetail/${pt.id}/posts`}>
                    <h3>{pt.title}</h3>
                    <p>{pt.body}</p>
                  </Nav.Link>
                </div>
              );
            }))}          
        </Tab>
        <Tab eventKey="profile" title="Albüm">
          {loadingAlbum ? 
          (<div>Yükleniyor...</div>) : 
          (albums?.map((album) => {
              return (
                <div key={album.id}>
                  <Nav.Link as={Link} to={`userdetail/${album.id}/albums`}>
                    <h3 style={{ marginBottom: "30px" }}>{album.title}</h3>
                  </Nav.Link>
                </div>
              );
            }))}
        </Tab>
        <Tab eventKey="contact" title="Todo">
          {loadingTodo ? 
          (<div>Yükleniyor...</div>) : 
          (todos?.map((todo) => {
              return (
                <div key={todo.id}>                  
                    <h3 style={{ marginBottom: "30px" }}>{todo.title}</h3>
                    <p>{todo.completed}</p>                  
                </div>
              );
            }))}
        </Tab>
      </Tabs>
    </>
  );
}

export default UserDetail;
