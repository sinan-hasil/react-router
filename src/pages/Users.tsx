import { Link, useLoaderData } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import "bootstrap/dist/css/bootstrap.min.css"
import styled from "styled-components";
import { Container } from "react-bootstrap";

interface UserProps {
  id: number;
  name: string;
  username: string;
  email: string;
}

export const fetchUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: UserProps[] = await response.json();
  return users;
};

const List = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 30px;

`

const Users = () => {
  const users = useLoaderData() as UserProps[];

  return (
    <>
      <Container>
      <div>
        <h1>Users</h1>
        <List>
          {users?.map((user) => (
            <li key={user.id}>
              <Nav.Link as={Link} to={`/users/${user.id}`}>{user.name}</Nav.Link>
            </li>
          ))}
        </List>
      </div>
      </Container>
    </>
  );
};

export default Users;
