# Refurbished Computer Report

This project provides a web application and MySQL database schema for managing and generating detailed reports on refurbished computers and notebooks. It is intended for internal use by IT refurbishers, resellers, or organizations needing transparent, auditable records of refurbished hardware.

## Features

- Store and manage device information, technical specifications, photos, stress test results, and data wipe certifications
- Next.js frontend for report visualization
- MySQL-compatible schema for structured data storage

## Project Structure

- `app/` - Next.js app directory (frontend)
- `components/` - React components
- `database-schema.sql` - MySQL schema and sample data
- `public/` - Static assets
- `styles/` - CSS styles

## Getting Started

1. **Install dependencies:**
   ```sh
   pnpm install
   ```

2. **Set up the database:**
   - Import `database-schema.sql` into your MySQL server.

3. **Configure environment variables:**
   - Copy `.env.local.example` to `.env.local` and update with your settings.

4. **Run the development server:**
   ```sh
   pnpm dev
   ```

5. **Access the app:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `pnpm dev` — Start the development server
- `pnpm build` — Build for production
- `pnpm start` — Start the production server

## License

**Internal Use Only**

This project is proprietary and intended for internal use within your organization. Redistribution or external use is not permitted without explicit permission.
