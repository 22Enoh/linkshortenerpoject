---
description: Read this file to understand how to fetch data in the project.
---
#Data Fetching guidelines
This document outlines the best practices and guidelines for fetching data in our Next.js application. Adhering to these guidelines will ensure consistency, performance, and maintainability across the codebase.

## 1. Use Server components for data fetching

In Next.js, ALWAYS using Server Components for data fetching. NEVER use Client Components for fetching data. 

## 2. Data fetching methods

ALWAYS use the helper functions in /data directory for fetching data. NEVER fetch data directly within the components.

ALL helper functions in the /data directory should use Drizzle ORM for database interactions. 