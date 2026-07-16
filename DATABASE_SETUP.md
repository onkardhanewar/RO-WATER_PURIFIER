# Database Setup Guide (Without Terminal Access)

## 🚀 Setup Password
Your setup password is: `MySecureSetup2025!` (Change this in `.env` file if needed)

---

## 📋 Setup Routes

After deploying your application, visit these URLs in your browser:

### 1. **Check Database Status**
```
GET https://your-domain.com/api/setup/status?password=MySecureSetup2025!
```
Shows current setup status (which tables exist, admin user status, etc.)

---

### 2. **Test Database Connection**
```
GET https://your-domain.com/api/setup/test-connection?password=MySecureSetup2025!
```
Verifies your database credentials are working

---

### 3. **Create Database Tables** (Migration)
```
POST https://your-domain.com/api/setup/migrate?password=MySecureSetup2025!
```
Creates all necessary database tables:
- admins
- products
- contact_queries
- service_requests
- complaints

---

### 4. **Create Admin User**
```
POST https://your-domain.com/api/setup/init-admin?password=MySecureSetup2025!
```
Creates default admin:
- Username: `admin`
- Password: `admin123`
- Email: `admin@example.com`

⚠️ **IMPORTANT**: Change these credentials after first login!

---

### 5. **Complete Setup (All-in-One)** ✨ RECOMMENDED
```
POST https://your-domain.com/api/setup/complete?password=MySecureSetup2025!
```
Runs all setup steps automatically:
1. Tests database connection
2. Creates all tables
3. Creates admin user

This is the easiest option - just visit this URL once!

---

## 🔧 How to Use

### Option A: Using Browser (Simple)
1. Open your browser
2. Visit: `https://your-domain.com/api/setup/complete?password=MySecureSetup2025!`
3. Wait for success message
4. Done! Your database is ready

### Option B: Using Postman/Thunder Client
1. Create a POST request
2. URL: `https://your-domain.com/api/setup/complete`
3. Add query parameter: `password` = `MySecureSetup2025!`
4. Send request

### Option C: Using curl (if available)
```bash
curl -X POST "https://your-domain.com/api/setup/complete?password=MySecureSetup2025!"
```

---

## 🔐 Security Notes

1. **Change the setup password** in `.env` before deploying:
   ```
   SETUP_PASSWORD=YourVerySecurePasswordHere123!
   ```

2. **Delete or disable** these routes after setup is complete (optional)

3. **Never commit** the `.env` file to Git

4. **Change admin credentials** immediately after first login

---

## 📊 Expected Response

### Success Response:
```json
{
  "success": true,
  "message": "✅ Complete setup finished successfully!",
  "steps": [
    { "step": 1, "name": "Database Connection", "success": true },
    { "step": 2, "name": "Create Tables", "success": true },
    { "step": 3, "name": "Create Admin User", "success": true, "created": true }
  ],
  "credentials": {
    "username": "admin",
    "password": "admin123",
    "loginUrl": "/admin",
    "warning": "⚠️ PLEASE CHANGE THESE CREDENTIALS AFTER FIRST LOGIN!"
  }
}
```

### Error Response:
```json
{
  "success": false,
  "message": "Setup failed",
  "steps": [...],
  "error": "Error details here"
}
```

---

## 🎯 Quick Setup Checklist

- [ ] Deploy your application to hosting
- [ ] Update `DATABASE_URL` in hosting environment variables
- [ ] Update `SETUP_PASSWORD` in hosting environment variables
- [ ] Visit `/api/setup/complete?password=YOUR_PASSWORD`
- [ ] Verify tables were created
- [ ] Login with admin/admin123
- [ ] Change admin credentials
- [ ] Start using your application!

---

## 🆘 Troubleshooting

### "Unauthorized" Error
- Check that you're using the correct password from `.env`
- Make sure password is in the URL: `?password=YOUR_PASSWORD`

### "Database connection failed"
- Verify `DATABASE_URL` is correct
- Check database server is running
- Ensure database `shrontec_admin` exists

### "Table already exists"
- This is normal - tables won't be recreated
- Use `/api/setup/status` to check current state

---

## 🌐 Your Database Connection
- Host: `localhost`
- Database: `shrontec_admin`
- Username: `shrontec_admin`
- Password: `dTbX8uAUwCHbc5vufSQ4`
