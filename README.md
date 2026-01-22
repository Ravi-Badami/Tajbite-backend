# Tajbite Backend API

Tajbite Backend is a RESTful API built to support a food discovery and ordering platform. The system provides efficient dish management, search, filtering, and sorting capabilities while maintaining compatibility with an existing React frontend.

The backend is designed with modular architecture, performance optimization, and scalability in mind, making it suitable for real-world application use and future expansion.

---

## Overview

The API exposes endpoints for managing dishes and retrieving food data with flexible query capabilities. Special attention has been given to response structure to ensure seamless integration with the frontend without requiring changes to existing UI components.

Key goals of the system:

* Maintain a clean and scalable backend architecture
* Optimize database queries for fast read operations
* Preserve frontend API contracts through controlled data transformation
* Provide consistent validation and error handling
* Offer clear and interactive API documentation using Swagger

---

## Technology Stack

* Node.js and Express.js for server and routing
* MongoDB and Mongoose for data persistence
* Swagger (OpenAPI) for API documentation
* Express Validator for request validation

---

## Architecture

The backend follows a layered structure to separate concerns and improve maintainability.

```
Client (React)
  ↓
Routes → Controllers → Services → Repositories
  ↓
MongoDB
```

Responsibilities:

* Routes: Define API endpoints and request flow
* Controllers: Handle HTTP requests and responses
* Services: Implement business logic
* Repositories: Manage database interactions
* Middlewares: Validation, error handling, and CORS
* Transformers: Adapt database data to frontend-compatible formats

This structure keeps the codebase modular and easier to test and extend.

---

## Setup and Installation

### Installation

```bash
cd backend
npm install
```

### Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

### Running the Server

```bash
npm run dev
npm start
```

The server runs at:

```
http://localhost:5000
```

---

## API Documentation

Swagger UI is available at:

```
http://localhost:5000/api-docs
```

It provides detailed endpoint definitions, request/response schemas, and an interface for testing APIs.

---

## API Endpoints

### Dishes

* GET `/api/dishes` – Retrieve all dishes with filtering and sorting
* GET `/api/dishes/autocomplete` – Get search suggestions
* GET `/api/dishes/search` – Search dishes with full details
* GET `/api/dishes/:id` – Retrieve a dish by ID
* POST `/api/dishes` – Create a new dish
* PUT `/api/dishes/:id` – Update a dish
* DELETE `/api/dishes/:id` – Delete a dish

---

## Query Features

### Filtering

* `ratingMin=4.0` – Filter by minimum rating
* `cuisine=Biryani` – Filter by cuisine type

### Sorting

* `sort=rating` – Sort by rating (descending)
* `sort=cost_low` – Sort by price (ascending)
* `sort=cost_high` – Sort by price (descending)

### Example Requests

```
GET /api/dishes?sort=rating&ratingMin=4.0
GET /api/dishes?cuisine=North Indian&sort=cost_low
```

---

## Key Design Decisions

### Frontend-Compatible Response Structure

The frontend expects a nested response format similar to Swiggy’s API (`card.card.info`).
To avoid modifying frontend logic, the backend implements a transformation layer that maps MongoDB documents into the required structure while keeping the database schema simple and maintainable.

---

### Database Query Optimization

Several techniques are used to improve performance:

* Lean queries (`.lean()`) to reduce overhead from Mongoose document hydration
* Field projection to limit unnecessary data in responses
* Efficient regex-based search for autocomplete and partial matches

These optimizations help reduce latency, especially for search and filtering endpoints.

---

### Search Implementation

Two separate endpoints are provided:

* Autocomplete API: returns lightweight dish name suggestions
* Search API: returns full dish details

Both endpoints use case-insensitive matching to support partial queries.

---

### Centralized Error Handling

A global error-handling middleware ensures consistent error responses and reduces repetitive error handling logic across controllers.

---

### Input Validation

Request payloads are validated using Express Validator before database operations, preventing invalid data from being stored.

---

### CORS Configuration

CORS policies are configured based on environment:

* Development: allows `localhost:5173`
* Production: allows the deployed frontend domain

---

## Engineering Challenges

### API Contract Compatibility

The frontend was built to consume a specific nested API structure.
To maintain compatibility, a dedicated transformation layer was introduced to adapt backend data without altering the database model.

---

### MongoDB Connection Timing

Initial seeding scripts attempted database operations before the connection was established.
This was resolved by enforcing asynchronous connection handling and awaiting the database connection before executing queries.

---

### Route Resolution Conflicts

Static routes such as `/search` and `/autocomplete` were being interpreted as dynamic parameters due to route ordering.
Reordering routes resolved the issue.

---

### Query Performance Bottlenecks

Mongoose document hydration caused unnecessary overhead for read-heavy endpoints.
Applying lean queries improved response times significantly.

---

## Database Seeding

To populate the database with sample data:

```bash
node seed.js
```

The script clears existing records and inserts sample dishes across multiple cuisines.

---

## Scalability and Future Improvements

Potential enhancements include:

* Authentication and authorization using JWT
* Pagination for large datasets
* Redis-based caching for frequently accessed endpoints
* Rate limiting and API throttling
* Image upload and storage integration
* User reviews and ratings
* API versioning
* Structured logging and monitoring
* Unit and integration testing

---

## Design Considerations

MongoDB was chosen due to its flexibility in handling nested dish and restaurant data.
For larger systems, restaurant data can be separated into dedicated collections with references to improve scalability and maintainability.

The backend is designed to be stateless and extensible, making it suitable for future architectural evolution.

---

## If you want, I can also:

* Rewrite this into a shorter, sharper version for recruiters
* Create a “system design” section that looks senior-level
* Rewrite your resume description for this project
* Make your GitHub repo structure look like a real production backend

If you want, I can also make it sound slightly more technical and less descriptive — which is what top backend engineers usually do.
