from fastapi import FastAPI

app = FastAPI() #initializing my fast api app.

@app.get("/")
def first_function():
    line = "welcome to Game Haven"
    return {"message": line}
