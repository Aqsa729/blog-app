import axios from "axios";
import React, { useState } from "react";
import { getEndpoint, isSuccessStatus } from "./fetch-api";
import styled from "styled-components";
import { Article } from "./types";

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  margin-top: 10px;
`;

interface Props {
  onCancel: () => void;
  updateSelectedArticle: (a: Article) => void;
  user_id: number;
  article?: Article;
}

export const EditArticle: React.FC<Props> = ({
  onCancel,
  updateSelectedArticle,
  user_id,
  article,
}) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function saveArticle() {
    const newArticle = {
      title,
      description,
      user_id,
    };
    let response;
    if (article) {
      response = await axios.put(getEndpoint(`articles/${article.id}`), {
        article: newArticle,
      });
    } else {
      response = await axios.post(getEndpoint("articles"), {
        article: newArticle,
      });
    }
    console.log(response.data);

    if (isSuccessStatus(response.status) && response.data) {
      const updatedArticle = response.data;
      updateSelectedArticle({
        id: updatedArticle.id,
        title: updatedArticle.title,
        description: updatedArticle.description,
      });
    }
  }

  const onSubmit = async () => {
    setLoading(true);
    saveArticle();
    setLoading(false);
  };

  return (
    <Column>
      <input
        disabled={loading}
        placeholder="title"
        value={article?.title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <textarea
        disabled={loading}
        placeholder="description"
        value={article?.description}
        onChange={(e) => setDescription(e.currentTarget.value)}
      />
      <Button onClick={onSubmit}>
        {article ? "Update Article" : "Create Article"}
      </Button>
      <Button onClick={onCancel}>{"<- Back"}</Button>
    </Column>
  );
};
