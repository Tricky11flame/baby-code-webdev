// src/api/mock.ts
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const mock = new AxiosMockAdapter(axios, { delayResponse: 1000 }); // 1 sec delay

const students = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", course: "Math" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", course: "Science" },
  { id: 3, name: "Charlie Lee", email: "charlie@example.com", course: "Arts" },
];

mock.onGet("/api/students").reply(200, { students });

export default axios;
