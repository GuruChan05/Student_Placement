# Student Placement Tracker
link:https://studentplacement-eta.vercel.app/

## 📌 Project Overview

The **Student Placement Tracker** is a web application developed to manage student placement details. It allows users to add student records, track placement status, view statistics, and manage student information.

This project was initially developed in **Week 2 using HTML, CSS, and JavaScript** and later improved in **Week 3 using React and Vite**.

## 🎯 Objectives

* Store and manage student placement details.
* Add new student records.
* Prevent duplicate student names.
* Update existing student records.
* Delete student records.
* Track placed and not-placed students.
* Display placement statistics.
* Save student data using browser LocalStorage.

## 🛠️ Technologies Used

### Week 2 — Basic Web Development

* **HTML:** Created the structure of the application and student form.
* **CSS:** Designed the layout, forms, buttons, and student cards.
* **JavaScript:** Implemented form validation, adding and deleting records, filtering, and statistics.
* **LocalStorage:** Stored student data in the browser so that it remained available after refreshing the page.

### Week 3 — React Development

* **React:** Converted the application into reusable components.
* **Vite:** Set up the React development environment.
* **JSX:** Created the user interface using JavaScript and HTML-like syntax.
* **React Hooks:** Used `useState`, `useEffect`, and `useMemo` to manage state, save data, and calculate statistics.
* **CSS:** Styled the React application.
* **LocalStorage:** Continued storing student records in the browser.

## 📂 Project Structure

```text
Student_Placement/
├── index.html
├── package.json
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    └── components/
        ├── Header.jsx
        ├── StudentForm.jsx
        ├── StudentCard.jsx
        └── Statistics.jsx
```

## ✨ Features

1. **Add Student:** Enter student details such as name, company, role, package, and placement status.
2. **Duplicate Name Prevention:** Prevents adding another student with the same name, ignoring differences in capitalization and extra spaces.
3. **Edit Student:** Update the details of an existing student.
4. **Delete Student:** Remove a student record.
5. **Placement Statistics:** View statistics about student placement progress.
6. **Search and Filter:** Find student records and filter them according to the application's available options.
7. **Sorting:** Organize student records using the available sorting options.
8. **Data Persistence:** Save records in browser LocalStorage so they remain available after a page refresh.

## 🔄 How the Project Evolved from Week 2 to Week 3

### Week 2: HTML, CSS, and JavaScript

The first version was built using standard web technologies.

* HTML defined the form and page structure.
* CSS handled the visual design.
* JavaScript managed form submissions, validation, student records, and statistics.
* LocalStorage helped retain records after refreshing the browser.

### Week 3: React and Vite

The application was then converted into a React-based project.

* The interface was divided into reusable components.
* `App.jsx` manages the main student data and application logic.
* `Header.jsx` displays the application header.
* `StudentForm.jsx` handles adding and editing student records.
* `StudentCard.jsx` displays individual student information.
* `Statistics.jsx` displays placement statistics.
* React state updates the interface when student records change.
* `useEffect` saves student data to LocalStorage.
* `useMemo` calculates statistics and derived data.
* Vite provides the development server and build tools.

## ⚙️ How to Run the Project

### Prerequisites

Install **Node.js and npm** before running the React version.

### Step 1: Open the project

Open the project folder in Visual Studio Code.

### Step 2: Open the terminal

In VS Code, select **Terminal → New Terminal**.

### Step 3: Install dependencies

Run this command in the project root folder:

```bash
npm install
```

### Step 4: Start the development server

```bash
npm run dev
```

### Step 5: Open the application

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173/
```

Keep the terminal running while using the application.

## 💾 Data Storage

The application uses browser LocalStorage to save student records.

* Data is stored in the current browser on the current device.
* Records usually remain available after refreshing or reopening the browser.
* Clearing the browser's site data can remove the saved records.
* The application does not use a backend database, so records are not automatically shared between users or devices.

## 🚀 Future Improvements

* Add a backend API and database.
* Add user authentication and login.
* Export student placement reports to CSV or PDF.
* Add more advanced search and filtering options.
* Improve mobile responsiveness.
* Add data import and backup features.

## 📚 Learning Outcomes

Through this project, I practised:

* Building web pages using HTML and CSS.
* Writing JavaScript for form validation and data management.
* Using arrays and array methods such as `map`, `filter`, and `some`.
* Saving data using LocalStorage.
* Creating reusable React components.
* Managing application data using React Hooks.
* Running and developing applications using Vite.
* Organizing code into a component-based project structure.

## 👨‍💻 Conclusion

The Student Placement Tracker demonstrates the progression from a basic HTML, CSS, and JavaScript application in Week 2 to a component-based React application in Week 3. The project helped me understand frontend development, state management, data persistence, validation, and reusable components.

---

**Project:** Student Placement Tracker
**Development Stages:** Week 2 — HTML, CSS, JavaScript | Week 3 — React, Vite
**Purpose:** Learning and practising frontend web development
