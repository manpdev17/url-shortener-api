
# 🔗 URL Shortener API

A simple REST API for shortening URLs, built with **NestJS**, **TypeORM** and **PostgreSQL**.

The API generates unique short codes, redirects users to the original URLs, tracks clicks and supports optional URL expiration.

## ✨ Features

* 🔗 Shorten long URLs
* 🎲 Generate unique short codes with `nanoid`
* ⏳ Optional URL expiration
* 📊 Click tracking
* 📈 URL statistics
* 🛡️ Request validation with `class-validator`
* 🚦 Rate limiting with `@nestjs/throttler`
* 📚 Interactive API documentation with Swagger
* 🗄️ PostgreSQL persistence
* 🧩 TypeORM
* 🔐 Environment-based configuration
* ⚡ Built with NestJS and TypeScript

---

## 🛠️ Tech Stack

| Technology                                                      | Purpose               |
| --------------------------------------------------------------- | --------------------- |
| [NestJS](https://nestjs.com/)                                   | Backend framework     |
| [TypeScript](https://www.typescriptlang.org/)                   | Programming language  |
| [TypeORM](https://typeorm.io/)                                  | ORM                   |
| [PostgreSQL](https://www.postgresql.org/)                       | Database              |
| [Swagger](https://swagger.io/)                                  | API documentation     |
| [class-validator](https://github.com/typestack/class-validator) | Request validation    |
| [nanoid](https://github.com/ai/nanoid)                          | Short code generation |
| [pnpm](https://pnpm.io/)                                        | Package manager       |

---

## 📐 API

### Create a short URL

```http
POST /
```

Request:

```json
{
  "originalUrl": "https://example.com",
  "expiresAt": "2026-12-31T23:59:59.000Z"
}
```

`expiresAt` is optional.

Response:

```json
{
  "id": "uuid",
  "shortCode": "V1StGXR8",
  "originalUrl": "https://example.com",
  "clicks": 0,
  "createdAt": "2026-09-17T20:00:00.000Z",
  "expiresAt": "2026-12-31T23:59:59.000Z"
}
```

### Redirect

```http
GET /:shortCode
```

Redirects the client to the original URL.

Possible responses:

| Status | Description                  |
| ------ | ---------------------------- |
| `302`  | Redirect to the original URL |
| `404`  | Short URL does not exist     |
| `410`  | Short URL has expired        |
| `429`  | Too many requests            |

### Get statistics

```http
GET /:shortCode/stats
```

Response:

```json
{
  "shortCode": "V1StGXR8",
  "originalUrl": "https://example.com",
  "clicks": 42,
  "createdAt": "2026-09-17T20:00:00.000Z",
  "expiresAt": "2026-12-31T23:59:59.000Z",
  "isExpired": false
}
```

Possible responses:

| Status | Description                       |
| ------ | --------------------------------- |
| `200`  | Statistics retrieved successfully |
| `404`  | Short URL does not exist          |
| `429`  | Too many requests                 |

---

## 🚦 Rate Limiting

The API uses request throttling to prevent abuse.

The URL creation endpoint is limited to:

```text
5 requests / minute
```

Exceeding the configured limit results in:

```http
429 Too Many Requests
```

---

## ⏳ URL Expiration

URLs can optionally have an expiration date.

For example:

```json
{
  "originalUrl": "https://example.com",
  "expiresAt": "2026-12-31T23:59:59.000Z"
}
```

Once the expiration date is reached, accessing the short URL returns:

```http
410 Gone
```

Expired URLs are still available through the statistics endpoint, allowing their historical information to be inspected.

---

## 🗄️ Database

The application uses **PostgreSQL** with **TypeORM**.

The main entity contains:

```text
Url
├── id
├── shortCode
├── originalUrl
├── clicks
├── createdAt
└── expiresAt
```

Short codes are protected by a database-level unique constraint.

The application also retries short-code generation if a uniqueness conflict occurs.

---

## ⚙️ Requirements

Before running the project locally, make sure you have:

* Node.js
* pnpm
* PostgreSQL

Check your installations:

```bash
node --version
pnpm --version
psql --version
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/manpdev17/url-shortener-api.git
cd url-shortener-api
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env` file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=url_shortener
```

### 4. Run database migrations

```bash
pnpm typeorm migration:run -d src/database/data-source.ts
```

### 5. Start the development server

```bash
pnpm start:dev
```

The API should now be available at:

```text
http://localhost:3000
```

---

## 📚 Swagger

Interactive API documentation is available at:

```text
http://localhost:3000/docs
```

Swagger provides information about:

* Request bodies
* DTOs
* HTTP responses
* Parameters
* Error responses
* API endpoints

---

## 🧪 Testing

Automated tests are planned for a future iteration.

The testing roadmap includes:

* Unit tests for `UrlsService`
* Controller tests
* End-to-end API tests
* Database integration tests

---

## 🐳 Docker

Docker support is planned for a future iteration.

The goal is to allow the complete application stack to be started with:

```bash
docker compose up -d
```

with the API and PostgreSQL running as separate services.

---

## 🔐 Security Considerations

The project currently includes:

* Input validation
* Rate limiting
* Environment-based configuration
* Database constraints
* Controlled HTTP error responses

Future improvements may include:

* Security headers
* CORS configuration
* Container hardening
* CI security checks
* Additional abuse prevention

---

## 🗺️ Roadmap

* [x] URL shortening
* [x] PostgreSQL integration
* [x] TypeORM
* [x] Unique short codes
* [x] Click tracking
* [x] URL expiration
* [x] Statistics endpoint
* [x] Request validation
* [x] Rate limiting
* [x] Swagger documentation
* [ ] Docker / Docker Compose
* [ ] Automated tests
* [ ] CI/CD
* [ ] Production deployment
* [ ] Production monitoring

---

## 📁 Project Structure

```text
src/
├── database/
│   ├── migrations/
│   └── data-source.ts
│
├── urls/
│   ├── dto/
│   │   ├── create-url.dto.ts
│   │   └── urls-response.dto.ts
│   │
│   ├── entities/
│   │   └── urls.entity.ts
│   │
│   ├── urls.controller.ts
│   ├── urls.module.ts
│   └── urls.service.ts
│
├── app.module.ts
└── main.ts
```

---

## 📄 License

This project is licensed under the GNU General Public License v3.0.
