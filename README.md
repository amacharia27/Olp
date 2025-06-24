# OLP Monitor - Comprehensive Multi-Tenant Basic Education Management System

This is the monorepo for the OLP Monitor project, a Progressive Web Application (PWA) designed to manage basic education from Pre-primary to Junior High School.

## Project Structure

This project is a monorepo managed by `pnpm` workspaces.

-   `apps/frontend`: The React PWA built with Vite, TypeScript, and Ant Design.
-   `apps/backend`: The Node.js/Express API server with TypeScript.
-   `packages/database-models`: Shared Mongoose models for MongoDB.
-   `packages/shared-types`: Shared TypeScript types and interfaces used across the frontend and backend.

## Prerequisites

-   Node.js (v18.x or later)
-   pnpm (v8.x or later)
-   MongoDB (running locally or a connection string to a cloud instance like MongoDB Atlas)

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd olp-monitor
    ```

2.  **Install all dependencies:**
    Run this command from the root directory. It will install dependencies for all workspaces (`frontend`, `backend`, etc.).
    ```bash
    pnpm install:all
    ```

3.  **Set up Environment Variables:**
    -   In `apps/backend/`, copy `.env.example` to a new file named `.env`.
    -   In `apps/frontend/`, copy `.env.example` to a new file named `.env`.
    -   Fill in the required values, especially your `MONGO_URI` and `JWT_SECRET`.

## Running the Application

To run both the frontend (on port 3000) and backend (on port 5000) servers simultaneously, use the following command from the **root directory**:

```bash
pnpm dev# olp-monitor
# Olp
