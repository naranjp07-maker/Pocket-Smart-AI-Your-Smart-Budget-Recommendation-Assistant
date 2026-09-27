PocketSmart AI: Your Smart Budget & Recommendation Assistant

PocketSmart AI is a budget-planning and recommendation web application.
It helps users plan expenses for needs such as interior design, parties,
and jewelry based on their budget and preferences. It can use Google's
Gemini AI to generate personalized suggestions and provides
shopping-search links for exploring products.

Features

User registration and login

Budget-based planning based on user preferences

Planning categories: Interior Design, Party Planning, and Jewelry

AI-generated suggestions through the Gemini API, when configured

Plan history, where supported by the application

Shopping-search links for related products

Technology Stack

Backend: Python, FastAPI

Frontend: HTML, CSS, JavaScript

Database: SQLite with SQLAlchemy

AI integration: Google Gemini API

Server: Uvicorn

Project Structure

PocketSmartAI/
├── app/
│   ├── database.py
│   ├── models.py
│   ├── security.py
│   ├── schemas.py
│   ├── gemini_service.py
│   ├── routes_auth.py
│   ├── routes_budget.py
│   └── main.py
├── static/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── .env                 # API key/settings (do not commit)
├── requirements.txt
├── pocketsmart.db       # Local database
└── README.md

Requirements

Windows, macOS, or Linux

Python 3.13 (64-bit recommended for the tested Windows setup)

pip

A Google Gemini API key for AI-generated recommendations

Installation and Setup (Windows / VS Code)

1. Open the project folder

Open the project folder in VS Code. In the terminal, move to the folder
containing app/ and requirements.txt.

2. Create a virtual environment

py -3.13 -m venv .venv

3. Install dependencies

.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -r requirements.txt

4. Configure the Gemini API key

Create a .env file in the project root. Use the environment-variable
name expected by app/gemini_service.py. For example, if the code reads
GEMINI_API_KEY:

GEMINI_API_KEY=your_gemini_api_key_here

Keep your API key private. Do not upload .env or share the key
publicly.

5. Start the application

Run this command from the project root:

.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload

6. Open the website

Open this address in your browser:

http://127.0.0.1:8000

Stop the server by pressing Ctrl + C in the terminal.

How to Use

Open the application in your browser.

Register a new account or log in.

Choose a planning category: Interior, Party, or Jewelry.

Enter your budget and preferences.

Generate the plan and review the recommendations.

Explore product-search links and revisit saved plans if plan history
is enabled.

Troubleshooting

ModuleNotFoundError: No module named 'app': Make sure the
terminal is in the project root---the folder containing the app
directory---then run the server command again.

Dependency installation errors: Use 64-bit Python and recreate
the virtual environment if needed.

Gemini API errors: Check that the API key and
environment-variable name are correct, verify API access and quota,
and retry after a short wait if the service is temporarily
unavailable.

Website does not open: Confirm that Uvicorn is running and visit
http://127.0.0.1:8000.

Security Notes

Never commit .env, API keys, or private credentials.

Avoid committing the local SQLite database unless there is a
specific reason to share test data.

If an API key is exposed publicly, revoke it and create a new one.

Project Documentation

Project phase documentation is available in the docs/ folder, if
included in this repository.

Disclaimer

AI-generated recommendations may be incomplete or inaccurate. Verify
prices, availability, and product details on the destination platforms
before making a purchase.

Author

Naran JP
