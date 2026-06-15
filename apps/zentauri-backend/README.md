# Zentauri Backend

FastAPI service for receiving and reading form submissions from MongoDB.

## Setup

```sh
cd apps/zentauri-backend
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
cp .env.example .env
```

Update `MONGODB_URI`, `ALLOWED_ORIGINS`, and `ALLOWED_HOSTS` in `.env` when you have the real deployment details.

### MongoDB Atlas

Use Atlas or another hosted MongoDB provider for local development and Vercel
deployments:

1. In Atlas → **Network Access**, add your current IP (or `0.0.0.0/0` for dev only).
2. In Atlas → **Database Access**, ensure the user in your URI has read/write on the cluster.
3. Copy the **SRV** connection string (Connect → Drivers) into `.env` as `MONGODB_URI`, with the real password (not `<password>`).
4. If the password contains `@`, `#`, or `%`, [URL-encode](https://www.mongodb.com/docs/manual/reference/connection-string/) it.

`ReplicaSetNoPrimary` / `server_type: Unknown` at startup almost always means the URI is wrong, the password placeholder was left in place, or Atlas is blocking your IP.

## Run

Start the API after `MONGODB_URI` points at your hosted MongoDB instance:

```sh
fastapi dev main.py
```

The API will be available at `http://127.0.0.1:8000`.

## Endpoints

| Method | Path                                     | Description                               |
| ------ | ---------------------------------------- | ----------------------------------------- |
| `GET`  | `/health`                                | Service health check                      |
| `POST` | `/api/v1/contact-us`                     | Submit validated form data as form fields |
| `GET`  | `/api/v1/contact-us?page=1&page_size=20` | List form submissions with pagination     |
| `GET`  | `/api/v1/contact-us/{form_id}`           | Read a specific form submission           |

## Tests

Endpoint smoke tests run without a real MongoDB: the repository dependency is
overridden with an in-memory fake and the rate limiter is disabled, so no
network or database connection is required.

```sh
cd apps/zentauri-backend
source .venv/bin/activate
pytest
```

Coverage: health check, create (201 + returned id), missing-field and
short-message validation (422), pagination, and unknown-id (404).

## Example submit request

```sh
curl -X POST http://127.0.0.1:8000/api/v1/contact-us \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=Jane Doe" \
  -d "email=jane@example.com" \
  -d "subject=Demo request" \
  -d "message=I would like to learn more about Zentauri."
```
