# 🎨 Paint Application (For Programming 2 [223 CSE] Course)

A web-based paint application built using **Spring Boot** for the backend and **React.js** for the frontend. Users can draw shapes, select, resize, copy, paste, undo/redo, and save their drawings in **XML or JSON format**.

## 📌 Features
- Freehand drawing tool
- Shape selection and resizing
- Undo/Redo functionality
- Copy and paste shapes
- Color fill for shapes
- Save/load drawings in **XML or JSON**
- Delete shapes

## 🛠️ Design Patterns Used
### 1️⃣ Factory Design Pattern
Used to create different shapes dynamically. A `ShapeFactory` class generates the appropriate shape based on user input.

### 2️⃣ Prototype Design Pattern
Implemented for **copy-paste functionality**. Shapes are cloned using a prototype object, ensuring all properties are correctly assigned.

## 🚀 How to Run the Project

### Backend (Spring Boot)
1. Open the `Paint_Backend` folder in **IntelliJ IDEA** or any Java IDE.
2. Run `PaintBackendApplication.java`.

### Frontend (React.js)
1. Open the `paint-frontend` folder in **Visual Studio Code** or any code editor.
2. Open the terminal and run:
   ```sh
   npm install
   npm run dev
3. The frontend will be accessible at http://localhost:5173/.
   ⚠️ Note: If you refresh the frontend, restart the backend as well.

## 📷 UI Snapshots
![image](https://github.com/user-attachments/assets/15dc5010-679c-448d-a0c5-8ccfbea4c85b)
Credit: Nour 

## 📘 Contributors
- Badr Elsayed
- Adham Anas
- Nour Khaled Mohamed
- Ali El-Deen Maher
