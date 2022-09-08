import axios from "axios";
import React, { useState } from "react";
import { getEndpoint, isSuccessStatus } from "./fetch-api";
import { User } from "./types";
import styled from "styled-components";

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  margin-top: 10px;
`;

interface Props {
  setLoggedInUser: (u: User) => void;
}

type View = "login" | "create-account";

export const Login: React.FC<Props> = ({ setLoggedInUser }) => {
  const [view, setView] = useState<View>();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function createUser() {
    const response = await axios.post(getEndpoint("users"), {
      user: {
        username,
        email,
        password,
      },
    });
    console.log(response.data);

    if (isSuccessStatus(response.status) && response.data) {
      const { id, username, email } = response.data;
      setLoggedInUser({ id, username, email });
    }
  }

  async function loginUser() {
    const response = await axios.post(getEndpoint("login"), {
      email,
      password,
    });
    console.log(response.data);

    if (isSuccessStatus(response.status) && response.data) {
      setLoggedInUser(response.data);
    }
  }

  const onSubmit = async () => {
    setLoading(true);

    if (view === "create-account") {
      await createUser();
    } else {
      await loginUser();
    }

    setLoading(false);
  };

  if (!view) {
    return (
      <Column>
        <Button onClick={() => setView("create-account")}>
          Create Account
        </Button>
        <Button onClick={() => setView("login")}>Login</Button>
      </Column>
    );
  }

  return (
    <Column>
      <input
        disabled={loading}
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      {view === "create-account" && (
        <input
          disabled={loading}
          type="username"
          placeholder="username"
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
      )}
      <input
        disabled={loading}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <Button onClick={() => onSubmit()}>
        {view === "create-account" ? "Create Account" : "Login"}
      </Button>
      <Button onClick={() => setView(undefined)}>{"<- Back"}</Button>
    </Column>
  );
};
