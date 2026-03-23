# 📚 Open Library Book Finder

## 📌 About the Project

This is a simple web application that helps users search for books and explore basic details like the title, author, and publish year. The main idea behind this project is to create a clean and easy-to-use interface where users can quickly find books using a search bar.

I built this project to practice working with real APIs and to improve my understanding of React and frontend development.

---

## 🎯 What I Aim to Do

With this project, I want to:

* Work with a real-world API
* Build a responsive and interactive UI
* Improve how search works in web applications
* Focus on performance and user experience

---

## 🔗 API Used

This project uses the **Open Library API**:

* https://openlibrary.org/developers/api
* Example: https://openlibrary.org/search.json?q=harry+potter

It provides a large collection of books along with useful details like author names and publication years.

---

## ✨ Features

### 🔍 Search Functionality

Users can search for books by title or author and see matching results instantly.

### ⚡ Debounced Search

Instead of calling the API on every keystroke, the search waits for the user to stop typing. This helps reduce unnecessary API calls and improves performance.

### 📄 Pagination

Search results are divided into pages so users can easily browse through them without being overwhelmed.

### ⭐ Favorites

Users can save books they like. These are stored in the browser using local storage, so they remain even after refreshing the page.

### ⏳ Loading Feedback

A loading indicator is shown while data is being fetched, so users know something is happening.

---

## 🛠️ Tech Stack

* HTML
* CSS
* JavaScript
* React (basic)

---

## 🚀 How to Run the Project

1. Clone the repository

```bash id="abc12"
git clone https://github.com/your-username/open-library-book-finder.git
```

2. Go into the project folder

```bash id="def34"
cd open-library-book-finder
```

3. Install dependencies

```bash id="ghi56"
npm install
```

4. Start the app

```bash id="jkl78"
npm start
```

---

## 📂 Project Scope

This project mainly focuses on:

* Building a clean UI
* Handling API data properly
* Improving search performance
* Managing state in React

---

## 📅 Status

Currently in progress as part of a learning milestone.

---

## 🔮 Possible Improvements

* Add sorting options (by year or title)
* Improve UI design
* Add infinite scrolling

---
