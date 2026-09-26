# Phase 3: Project Design

## 1. Introduction
This phase describes the system architecture, application components, and user interface design of PocketSmart AI.

## 2. System Architecture

PocketSmart AI follows a client-server architecture.

### Components
1. **Frontend:** HTML, CSS, and JavaScript.
2. **Backend:** Python with FastAPI.
3. **Database:** SQLite for storing application data.
4. **AI Integration:** Gemini API for generating recommendations.

## 3. System Workflow

1. User opens the PocketSmart AI website.
2. User registers or logs in.
3. User selects a planning category.
4. User enters budget and preferences.
5. Backend receives the request.
6. Gemini API generates recommendations when configured.
7. The application displays the results.
8. User can access saved plans through plan history.

## 4. Main Modules

### 4.1 Authentication Module
Handles user registration and login.

### 4.2 Budget Planning Module
Collects user budget, category, and preferences.

### 4.3 AI Recommendation Module
Processes user requirements and generates recommendations using Gemini API.

### 4.4 Database Module
Stores user accounts and saved plans.

### 4.5 Frontend Module
Displays forms, navigation, and recommendation results.

## 5. User Interface Design

The application includes:
- Registration and login pages.
- Budget planning form.
- Category selection.
- Recommendation display section.
- Saved plan history.

## 6. Data Flow

User Input → Frontend → FastAPI Backend → AI Service → Backend Response → Frontend Output

## 7. Security Design

- Passwords are stored using secure password hashing.
- API keys are configured through environment variables.
- User authentication is required for protected features.

## 8. Conclusion

The system design organizes PocketSmart AI into separate modules to support maintainability, usability, and future improvements.