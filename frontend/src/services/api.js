// src/services/api.js
const API_URL = "http://localhost:5000/api";

export async function signup(userData) {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
}

export async function login(userData) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
}

export async function getBooks() {
  const res = await fetch(`${API_URL}/books`);
  return res.json();
}
