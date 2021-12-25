from fastapi import APIRouter


user_router = APIRouter()


@user_router.get("/", summary="Check user endpoint")
async def test_user():
  return {"username": "abdullah"}