import React from "react";
import { Container, Navbar, FormControl, Form } from "react-bootstrap";
import styled from "styled-components";
import "./NavBar.css";

const NavBar = ({ search, handleSearch, onSearch }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/portfolio" className="brand">
          MovieApp
        </Navbar.Brand>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="검색"
            className="me-3"
            aria-label="Search"
            value={search}
            onChange={onSearch}
          />
          <Button onClick={handleSearch}>검색</Button>
        </Form>
      </Container>
    </Navbar>
  );
};

export default NavBar;

const Button = styled.button`
  width: 80px;
  background: #fff;
  border: 1px solid #ccc;
  margin-right: 10px;
  border-radius: 4px;
  color: #000;
  font-size: 1em;
  font-weight: bold;
  padding: 0.25em 1em;
  cursor: pointer;
  &:hover {
    background: #337ab7;
    color: #fff;
  }
`;
