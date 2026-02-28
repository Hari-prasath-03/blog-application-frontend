# Rival - Modern Blog Platform

A premium, full-stack blogging platform built with Next.js 15, featuring social engagement, professional markdown editing, and a member-only feed.

## 🚀 Setup Instructions

### Prerequisites

- Node.js 18+
- Backend API running on `http://localhost:8080`

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:8080/api/v1"
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🏗️ Architecture Explanation

### Frontend Stack

- **Next.js 15 (App Router)**: Utilizing Server Components for SEO and Client Components for interactivity.
- **Tailwind CSS**: Custom "Glassmorphism" aesthetic with serif typography.
- **Isomorphic Service Layer**: A centralized `blogService` designed to work on both the server (using cookies for auth) and the client (using browser Fetch).

### Data Flow

1. **Server Rendering**: Initial page loads fetch data directly from the API on the server.
2. **Server Actions**: Mutations (Likes, Comments, Publishing) are handled via Server Actions for secure, form-based interaction.
3. **Optimistic UI**: Likes use React state to provide instant feedback before the server confirms the action.

---

## ⚖️ Tradeoffs Made

- **Client vs. Server Components**: Chose to keep individual story pages as Server Components for maximum performance, while delegating interactivity (Like/Comment) to small, modular Client Components.
- **Isomorphic Service**: Instead of separate server/client services, I built a unified service that accepts `options`. This reduces code duplication but required careful handling of `next/headers` to avoid compilation errors on the client.
- **Guest Access**: Balanced security with accessibility by allowing guests to view content while restricting the Member Feed and Writing features to authenticated users.

---

## 📈 What I Would Improve

- **Real-time Notifications**: Implement WebSockets or Server-Sent Events (SSE) for instant comment and like notifications.
- **Image Optimization**: Integrate an edge-based image transformation service (like Cloudinary) for user uploads.
- **Search & Filter**: Add a robust search engine (like Algolia or Meilisearch) to filter stories by tags or content.

---

## 🚀 Scaling to 1M Users

To support 1 million users, I would implement the following strategy:

1. **Edge Caching (ISR)**: Convert story pages to **Incremental Static Regeneration**. Pages would be served from a CDN edge, updating only when content changes.
2. **Database Sharding/Clustering**: Move from a single DB instance to a globally distributed database (like PlanetScale or Neon) with read replicas.
3. **Background Processing**: Offload non-critical tasks (email digests, view count analytics) to a background worker queue (like Upstash or RabbitMQ).
4. **Microservices**: Decouple the monolithic backend into smaller services (Auth, Blog, Engagement) to scale them independently.
5. **Asset CDN**: Serve all markdown assets and images through a global CDN (Cloudflare/Vercel Edge).
