# In your FastAPI backend, the empty __init__.py files mark folders as Python packages, so imports like these work reliably:

# from app.api.v1.router import api_router
# from app.core.config import settings
# from app.repositories.contact_us import ContactFormRepository

# Modern Python can sometimes import folders without __init__.py using namespace packages, 
# but for an app like this, especially on Vercel/serverless deployments, keeping them is the safer and more predictable choice.