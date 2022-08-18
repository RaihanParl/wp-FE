import React from "react";
import { getToken } from "../helper";
import ky from "ky/umd";
import { useNavigate } from "react-router-dom";

const RequestContext = React.createContext();
export const RequestContextProvider = ({ children, initialValue = {} }) => {
  const navigate = useNavigate();
  const _getReponse = async (response) => {
    const { headers, status } = response;
    console.log("masuk error", response);
    const json = await response.json();
    console.log("masuk error", json.code);
    if (json.code === "403") {
      navigate("/login");
    }

    return { headers, json, status };
  };
  const _handleError = async (response) => {
    const payload = await _getReponse(response);
    const { code } = payload;
    console.log(payload, "ini adalah payload");
    const error = new Error();
    switch (code) {
      case 403:
        error.json = payload.json;
        error.message = payload.json.message;
        error.response = response;
        throw error;
      default:
        error.message = payload.json.message;
        error.statusCode = code;
        throw error;
    }
  };
  const get = async (url, payload) => {
    console.log(getToken());
    try {
      const response = await ky.get(url, {
        ...payload,
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return _getReponse(response);
    } catch (error) {
      throw await _handleError(error);
    }
  };
  const post = async (url, payload = {}, headers = {}) => {
    try {
      const response = await ky.post(url, {
        ...payload,
        headers: { Authorization: `Bearer ${getToken()}`, ...headers },
      });
      return _getReponse(response);
    } catch (error) {
      throw await _handleError(error);
    }
  };
  return (
    <RequestContext.Provider
      value={{
        get,
        post,
        ...initialValue,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export const useRequest = () => {
  const state = React.useContext(RequestContext);
  return state;
};
