from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import openai
from dotenv import load_dotenv

load_dotenv()  # load .env in development
OPENAI_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_KEY:
    print("WARNING: OPENAI_API_KEY not set. Set backend/.env file or environment variable.")
openai.api_key = OPENAI_KEY

app = FastAPI(title="AppGenIA - Backend")

class PromptRequest(BaseModel):
    prompt: str
    max_tokens: int = 1024

@app.post("/api/generate")
async def generate_code(req: PromptRequest):
    if not openai.api_key:
        raise HTTPException(status_code=400, detail="OpenAI API key not configured on server.")
    try:
        # Calls the OpenAI completions/chat API (GPT-4 style) - adjust to your API variant
        response = openai.ChatCompletion.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "Você é AppGenIA, gere código claro e funcional conforme pedido."},
                {"role": "user", "content": req.prompt}
            ],
            max_tokens=req.max_tokens,
            temperature=0.2,
        )
        # Extract assistant reply
        text = response["choices"][0]["message"]["content"]
        return {"result": text}
    except openai.error.OpenAIError as e:
        raise HTTPException(status_code=502, detail=str(e))
