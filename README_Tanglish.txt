POCKETSMART AI - COMPLETE PROJECT (VS CODE / WINDOWS)
====================================================

IMPORTANT:
- PDF-la requested modules: Dashboard, Home Interior, Party, Jewelry, Recommendations, History.
- Gemini 1.5 Flash Pro is a legacy model name and may not be available now. This project defaults to gemini-2.5-flash. Choose a currently available model in Google AI Studio and set GEMINI_MODEL in .env.
- If Gemini API key is missing or request fails, app displays built-in fallback recommendations and a notice.
- Product search links are search links, not live stock/price verification.

1) ZIP extract pannunga.
2) VS Code-la extracted PocketSmartAI_Complete folder open pannunga.
3) VS Code Terminal open pannunga.
4) Virtual environment create:
   py -m venv .venv

5) Dependencies install:
   .\.venv\Scripts\python.exe -m pip install -r requirements.txt

6) .env.example file-ah copy panni same folder-la .env nu rename pannunga.
   .env file-la:
   GEMINI_API_KEY=YOUR_API_KEY
   GEMINI_MODEL=gemini-2.5-flash
   SECRET_KEY=oru_long_random_secret
   API key: https://aistudio.google.com/apikey
   API key-ah chat-la share pannadheenga.

7) Run:
   .\.venv\Scripts\python.exe -m uvicorn app.main:app --reload

8) Browser:
   http://127.0.0.1:8000
   API docs: http://127.0.0.1:8000/docs

9) Website-la Create account -> login -> choose Home / Party / Jewelry -> budget -> Generate my plan.
   Saved plans History section-la varum.

If terminal error:
- Check .env file name exactly ".env" (not .env.txt)
- Check API key and selected model are available.
- Server stop: Ctrl+C
- Restart run command.

Project folders:
app/      backend, database, Gemini integration, API routes
static/   website HTML, CSS, JavaScript
