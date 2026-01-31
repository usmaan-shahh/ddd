# Project Architecture

A simple guide to how our backend is organized.

---

## One-Sentence Summary

> We organize the code in layers: the core business rules live in one place, separate from the database and API, so we can change or test each part independently.

---

## The Big Picture

Our backend has three main parts:

| Part | What it does | Example |
|------|--------------|---------|
| **Business logic** | The rules of our app—what makes data valid, what actions mean | "A user must have a valid email" |
| **Use cases** | Orchestrates features—connects business rules with technical details | Login, Register |
| **Technical details** | Database, HTTP, password hashing, tokens | PostgreSQL, bcrypt, JWT |

The main idea: **if we change the database or the API, the business rules stay the same**—we only touch the outer layer.

---

## Folder Structure (Plain Language)

```
src/
├── domains/          → Core rules and validation (what makes a valid user, email, etc.)
├── application/      → Feature steps (login, register) and interfaces for external services
├── infrastructure/   → Database, password hashing, external APIs
└── presentation/     → Controllers that receive HTTP requests and call use cases
```

| Folder | Purpose |
|--------|---------|
| `domains/` | Business rules and validation live here. Independent of database or API. |
| `application/` | Use cases that implement features. Connects business logic to infrastructure. |
| `infrastructure/` | Real implementations—database, bcrypt, JWT. Can be swapped without touching core logic. |
| `presentation/` | HTTP controllers. Receive requests, call use cases, return responses. |

---

## Why This Structure?

| Benefit | Explanation |
|---------|-------------|
| **Easier to change** | Swap database or API layer without rewriting business logic |
| **Easier to test** | Test business rules without hitting a real database |
| **Clear responsibilities** | Each layer has a single job |
| **Future-proof** | New features follow the same pattern |

---

## Simple Analogy

Think of a restaurant:

- **Kitchen** = business logic (recipes, rules)
- **Waiters** = presentation (take orders, serve food)
- **Suppliers** = infrastructure (deliver ingredients)

The recipes don't change when you get a new supplier or hire new waiters.

---

## Request Flow (Example: Register)

1. **Controller** receives HTTP request with email + password
2. **Use case** (RegisterUserUseCase) runs the steps:
   - Check if email exists
   - Hash password
   - Validate and create user
   - Save to database
3. **Controller** returns response

Each step uses the right layer—validation from domain, hashing from infrastructure, orchestration from application.
