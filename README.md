# Terminal AI Chat Bot

A simple terminal-based AI chat bot with a clean UI that can help you write code, explain concepts, debug issues, summarize text, and assist with everyday tasks.

## Features

- Fast terminal UI for chatting in the command line
- Supports code generation and code explanations
- Can help with debugging, refactoring, and documentation
- Easy to extend with new commands and prompts
- Works well for quick AI assistance without leaving the terminal

## What it can do

- Write scripts, snippets, and small programs
- Explain error messages and suggest fixes
- Help brainstorm ideas or write documentation
- Summarize long text and answer questions
- Assist with general productivity and learning

## Requirements

- Python 3.9+
- An API key for an LLM provider such as OpenAI, Anthropic, or a compatible service

## Installation

```bash
git clone <your-repo-url>
cd ai-app
pip install -r requirements.txt
```

## Configuration

Create a `.env` file in the project root and add your API settings:

```env
MODEL_NAME=gpt-4o-mini
API_KEY=your-api-key
```

If your app uses different names, adjust them to match your code.

## Usage

Run the app:

```bash
python main.py
```

Once it starts, type a prompt and press Enter. For example:

- "Write a Python script to read a CSV file"
- "Explain this error message"
- "Refactor this function for readability"
- "Summarize this text"

## Project Structure

```text
.
├── main.py
├── requirements.txt
├── .env
└── README.md
```

## Notes

This project is intentionally simple and beginner-friendly. You can expand it with features like:

- history browsing
- markdown rendering
- file-aware prompts
- custom commands
- streaming responses

## License

This project is open source. Feel free to modify and use it as you wish.
