import { BASE_URL } from "./constants";

import { handleResponse } from "./constants";

function getItems() {
  return fetch(`${BASE_URL}/items`).then(handleResponse);
}

function addCardLike(_id, token) {
  console.log("addCardLike");
  return fetch(`${BASE_URL}/items/${_id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
}

function removeCardLike(_id, token) {
  console.log("removeCardLike");

  return fetch(`${BASE_URL}/items/${_id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
}

function addItem(item) {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(item),
  }).then(handleResponse);
}

function deleteItem(itemId) {
  return fetch(`${BASE_URL}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(handleResponse);
}

export { getItems, addCardLike, addItem, deleteItem, removeCardLike };
