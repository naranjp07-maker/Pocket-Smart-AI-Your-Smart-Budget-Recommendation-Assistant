✨ PocketSmart AI

Your Smart Budget & Recommendation Assistant

Plan smarter. Spend better. Make every budget count.

PocketSmart AI is a smart budgeting and recommendation assistant
designed to help users organize plans around their needs, preferences,
and available budget. From decorating a room to planning a party or
choosing jewelry, the app helps turn ideas into practical, budget-aware
suggestions with the support of Google Gemini AI.

🌟 What You Can Do

Feature                             Description

🔐 Account Access               Create an account and log in to use
your personal planning space.

🏡 Interior Planner             Explore ideas for decorating and
organizing a space within your
budget.

🎉 Party Planner                Get suggestions for planning a
celebration according to your
budget and preferences.

💎 Jewelry Planner              Explore jewelry recommendations
based on your needs and budget.

🤖 AI Recommendations           Generate personalized suggestions
using the Gemini API when
configured.

🗂️ Plan History                 Revisit saved plans if history is
enabled in the application.

🧰 Built With

Python --- application programming

FastAPI --- backend and API framework

HTML, CSS & JavaScript --- frontend

SQLite & SQLAlchemy --- data storage

Google Gemini API --- AI-powered suggestions

Uvicorn --- development server

📁 Project Layout

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
├── docs/                  # Project phase documentation (if included)
├── .env                   # Private API configuration — do not commit
├── requirements.txt
├── pocketsmart.db         # Local database
└── README.md

⚙️ Getting Started

Prerequisites

Python 3.13 (64-bit recommended for the Windows setup tested)

pip

A Gemini API key for AI-generated suggestions

1. Open the project

Open the project folder in Visual Studio Code. Open the integrated
terminal in the folder that contains app/ and requirements.txt.

2. Create a virtual environment

py -3.13 -m venv .venv

3. Install the required packages

.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -r requirements.txt

4. Add your Gemini API key

Create a .env file in the project root. Check app/gemini_service.py
for the exact environment-variable name. For example, if the code uses
GEMINI_API_KEY, add:

GEMINI_API_KEY=your_gemini_api_key_here

Keep this key private. Never publish your .env file or API key.

5. Launch the app

Run this command from the project root:

.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload

6. Visit PocketSmart AI

Open your browser and go to:

http://127.0.0.1:8000

To stop the server, press Ctrl + C in the terminal.

🧭 Using the App

Register or log in.

Select Interior, Party, or Jewelry.

Enter your budget and preferences.

Generate your plan.

Review the suggestions and explore product-search links.

Check saved plans if plan history is available.

🛠️ Common Issues

Issue                                          What to check

ModuleNotFoundError: No module named 'app'   Run the command from the project
root---the folder containing the
app directory.

Package installation fails                     Confirm that you're using 64-bit
Python and recreate the virtual
environment if needed.

Gemini API error                               Check the API key,
environment-variable name, API
access, and quota. Temporary
service errors may require retrying
later.

🔒 Security

Keep API keys and credentials out of GitHub.

Do not commit .env.

Avoid publishing the local database if it contains personal or
test-user data.

If a key is exposed, revoke it and generate a replacement.

📌 Important Note

AI recommendations are suggestions and may not always be accurate or up
to date. Confirm product prices, availability, and details on the
relevant platform before purchasing.

👤 Project Author

Naran JP
