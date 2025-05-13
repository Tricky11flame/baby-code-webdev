// src/api/mock.ts

import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

// Setup axios mock adapter with a 1-second delay
const mock = new AxiosMockAdapter(axios, { delayResponse: 1000 });

// Sample student data (initial set)
const students = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", course: "Math" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", course: "Science" },
  { id: 3, name: "Charlie Lee", email: "charlie@example.com", course: "Arts" },
];

// Simulate GET request to fetch all students
mock.onGet("/api/students").reply(200, { students });

// Simulate GET request to fetch a specific student by ID
mock.onGet(/\/api\/students\/\d+/).reply((config) => {
  const studentId = parseInt(config.url?.split("/").pop() || "", 10);
  const student = students.find((s) => s.id === studentId);
  if (student) {
    return [200, student];
  } else {
    return [404, { message: "Student not found" }];
  }
});

// Simulate POST request to add a new student
mock.onPost("/api/students").reply((config) => {
  const newStudent = JSON.parse(config.data);
  newStudent.id = students.length + 1; // Simulate auto-incremented ID
  students.push(newStudent); // Add to the list
  return [201, newStudent]; // Return the newly created student
});

// Simulate PUT request to update an existing student
mock.onPut(/\/api\/students\/\d+/).reply((config) => {
  const studentId = parseInt(config.url?.split("/").pop() || "", 10);
  const updatedStudent = JSON.parse(config.data);

  const index = students.findIndex((s) => s.id === studentId);
  if (index !== -1) {
    students[index] = { ...students[index], ...updatedStudent }; // Update the student
    return [200, students[index]]; // Return updated student
  } else {
    return [404, { message: "Student not found" }];
  }
});

// Simulate DELETE request to remove a student
mock.onDelete(/\/api\/students\/\d+/).reply((config) => {
  const studentId = parseInt(config.url?.split("/").pop() || "", 10);
  const index = students.findIndex((s) => s.id === studentId);
  if (index !== -1) {
    students.splice(index, 1); // Remove the student from the array
    return [200, { message: "Student deleted successfully" }];
  } else {
    return [404, { message: "Student not found" }];
  }
});

export default axios;
