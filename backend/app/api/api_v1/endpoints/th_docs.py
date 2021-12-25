from fastapi import APIRouter

th_docs_router = APIRouter()

cached_initial_docs = [
  {
    "type": "h1",
    "align": "center",
    "id": 1640030725684,
    "children": [
      {"text": "🙋‍♂️ Untitled Document Cowboy"}
    ]
  }
]



@th_docs_router.get("/{doc_id}", summary="Get the cached/db value of the doc")
async def test_user(doc_id: str):
  return cached_initial_docs