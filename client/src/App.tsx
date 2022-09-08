import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";
import "./App.css";
import { getEndpoint, isSuccessStatus } from "./fetch-api";
import { Article, User } from "./types";
import { Login } from "./Login";
import styled from "styled-components";
import { EditArticle } from "./EditArticle";

const AppDiv = styled.div`
  margin: 10px auto;
  max-width: 1000px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 15px 10px;
  border-bottom: 1px solid black;
`;

function App() {
  const [createArticle, setCreateArticle] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article>();
  const [user, setUser] = useState<User>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchArticles() {
    const response = await axios.get(getEndpoint("articles"));

    if (isSuccessStatus(response.status)) {
      setArticles(
        response.data.data.map((u: any) => ({ ...u.attributes, id: u.id }))
      );
    }
  }

  async function fetchUsers() {
    const response = await axios.get(getEndpoint("users"));

    if (isSuccessStatus(response.status)) {
      setUsers(
        response.data.data.map((u: any) => ({ ...u.attributes, id: u.id }))
      );
    }
  }

  async function update() {
    setLoading(true);
    await fetchUsers();
    await fetchArticles();
    setLoading(false);
    setCreateArticle(false);
  }

  function onCancelEditArticle() {
    update();
    setCreateArticle(false);
    setSelectedArticle(undefined);
  }

  function setLoggedInUser(u: User) {
    setUser(u);
    update();
  }

  if (!user) {
    return (
      <AppDiv className="App">
        <h1>Blog App</h1>
        <Login setLoggedInUser={setLoggedInUser} />
      </AppDiv>
    );
  }

  return (
    <AppDiv className="App">
      <Header>
        <span>Logged in: {user.username}</span>
        <button onClick={() => setUser(undefined)}>Log Out</button>
      </Header>
      {createArticle ? (
        <EditArticle
          article={selectedArticle}
          updateSelectedArticle={setSelectedArticle}
          onCancel={onCancelEditArticle}
          user_id={user.id}
        />
      ) : (
        <div>
          <h1>Listing All Articles</h1>
          <Table
            loading={loading}
            pagination={false}
            dataSource={articles}
            columns={[
              {
                title: "Title",
                dataIndex: "title",
                key: "title",
              },
              {
                title: "Description",
                dataIndex: "description",
                key: "description",
              },
            ]}
          />
          <button onClick={() => setCreateArticle(true)}>
            Create New Article
          </button>
        </div>
      )}
    </AppDiv>
  );
}

export default App;
