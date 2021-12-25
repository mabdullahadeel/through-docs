import uvicorn
import sys

"""
  Supported args:
    --prod: run the server in production mode
"""



if __name__ == "__main__":
  is_prod = '--prod' in sys.argv
  
  uvicorn.run(
    app='app.app:app',
    host='0.0.0.0',
    port=8000,
    reload=True if not is_prod else False,
  )