import React from "react";
// import { useSelector, useDispatch } from "react-redux";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./redux/store/index";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Nav from "./components/Nav/Nav";
import Form from "./components/CreateRecipeForm/Form";
// import * as actions from "./redux/actions/index";
import axios from "axios";
//! para que corregir CORS:
if (typeof process != "undefined") {
  axios.defaults.adapter = require("axios/lib/adapters/http");
}
//!------

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    </Provider>
  );
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders a label with the text 'Title *'", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Form />
      </BrowserRouter>
    </Provider>
  );
  const formulario = screen.getByLabelText(/Title */);
  console.log(formulario);
  expect(formulario).toBeInTheDocument();
});

test("debe traer el name de la diet[9]", async () => {
  let response = await axios.get(`http://localhost:3001/diets`);
  let responseData = response.data;
  // console.log(responseData);
  expect(responseData[9].name).toBe("vegan");
});
