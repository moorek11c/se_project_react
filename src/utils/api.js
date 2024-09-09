const baseUrl = "http://localhost:3001";
import { handleResponse } from "./constants";

function getItems() {
  return fetch(`${baseUrl}/items`).then(handleResponse);
}

function addCardLike(_id, token) {
  console.log("addCardLike");
  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
}

function removeCardLike(_id, token) {
  console.log("removeCardLike");

  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
}

function addItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(item),
  }).then(handleResponse);
}

function deleteItem(itemId) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(handleResponse);
}

export { getItems, addCardLike, addItem, deleteItem, removeCardLike };
