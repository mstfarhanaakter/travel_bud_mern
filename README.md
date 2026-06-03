# Travel Bud - MERN Travel Management System

Travel Bud is a complete MERN stack travel management system using React, Tailwind CSS, Node.js, Express, MongoDB, JWT authentication, React Toastify, and React Icons.

## Main Features

- Professional responsive homepage
- Package listing with search, category filter, and sorting
- Package details page
- User registration and login
- JWT protected routes
- User booking system
- User dashboard with booking history
- Admin dashboard
- Admin package create/delete
- Admin all booking management
- Booking status update: pending, confirmed, completed, cancelled
- Toast notifications
- cPanel deployment-ready structure

## Folder Structure

```txt
travel-bud/
  backend/
    config/
    controllers/
    data/
    middleware/
    models/
    routes/
    utils/
    app.js
    server.js
    package.json
    .env.example
  frontend/
    public/
      .htaccess
    src/
      api/
      components/
      context/
      layouts/
      pages/
      routes/
    package.json
    .env.example
```

## Local Setup

### 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and update this line:

```env
MONGO_URI=mongodb+srv://YOUR_DB_USER:YOUR_DB_PASSWORD@YOUR_CLUSTER.mongodb.net/travel_bud
JWT_SECRET=your_long_secret_key
CLIENT_URL=http://localhost:5173
```

Run seed data:

```bash
npm run seed
```

Start backend:

```bash
npm run dev
```

Backend URL:

```txt
http://localhost:5000
```

### 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
```

Make sure `.env` has:

```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

Frontend URL:

```txt
http://localhost:5173
```

## Demo Login

After running seed:

```txt
Admin: admin@travelbud.com / admin123
User: user@travelbud.com / user123
```

## cPanel Deployment

### Frontend upload

1. Go to `frontend` folder.
2. Update frontend `.env`:

```env
VITE_API_URL=https://api.yourdomain.com/api
```

3. Build:

```bash
npm run build
```

4. Upload everything inside `frontend/dist` to `public_html` or your selected domain folder.
5. The `.htaccess` file is included for React route refresh support.

### Backend upload

1. Zip only the `backend` folder.
2. Upload it to cPanel outside `public_html`, for example:

```txt
/home/username/travel-bud-backend
```

3. In cPanel, open **Setup Node.js App**.
4. Create app:

```txt
Application root: travel-bud-backend
Application startup file: server.js
Application URL: api.yourdomain.com
```

5. Add environment variables in cPanel:

```env
NODE_ENV=production
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_long_secret_key
JWT_EXPIRE=30d
CLIENT_URL=https://yourdomain.com
```

6. Run NPM install from cPanel Node.js interface or terminal.
7. Restart the Node.js app.

## Important Notes

- Your cPanel hosting must support Node.js app setup.
- MongoDB Atlas Network Access should allow your hosting server IP.
- Do not upload `.env` publicly inside `public_html`.
- For real production, change demo passwords and JWT secret.
- For image upload, add Cloudinary or cPanel file upload later. This project uses image URL input for easier deployment.
