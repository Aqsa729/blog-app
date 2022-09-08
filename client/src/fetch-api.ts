import React from "react";

const API_ENDPOINT = "http://localhost:3000";

export const getEndpoint = (url = "") => `${API_ENDPOINT}/${url}`;

export const isSuccessStatus = (status: number) =>
  status >= 200 && status < 300;
