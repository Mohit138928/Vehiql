# AutoVolt - AI-Powered Car Marketplace

![AutoVolt](public/about-mission.jpg)

AutoVolt is a modern car marketplace platform that uses AI technology to help users find their perfect vehicle. The platform offers advanced search capabilities, test drive scheduling, and a seamless car buying experience.

## 🚀 Features

### For Buyers
- **AI-Powered Image Search**: Upload a car image to find similar vehicles
- **Advanced Filtering**: Search by make, model, price, body type, and more
- **Test Drive Booking**: Schedule test drives with real-time availability
- **Car Wishlist**: Save favorite cars for later viewing
- **Detailed Car Profiles**: Comprehensive vehicle information and images

### For Dealers/Admin
- **Dashboard Analytics**: Track listings and test drive bookings
- **Inventory Management**: Add and manage car listings
- **Booking Management**: Handle test drive requests
- **User Management**: Monitor user activities and interactions

## 🛠️ Tech Stack

- **Frontend**: 
  - Next.js 14 with App Router
  - TailwindCSS for styling
  - Shadcn UI components
  - TypeScript for type safety

- **Backend**:
  - Prisma ORM
  - PostgreSQL (Supabase)
  - Next.js API routes

- **Authentication**:
  - Clerk Authentication

- **AI/ML**:
  - Google's Gemini AI for image analysis
  - AI-powered car recommendations

- **Cloud Storage**:
  - Supabase Storage for images

## 🚦 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Mohit138928/AutoVolt.git
cd autovolt
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```env
# Create a .env file with:
DATABASE_URL="your_supabase_db_url"
DIRECT_URL="your_supabase_direct_url"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
NEXT_PUBLIC_GEMINI_API_KEY="your_gemini_api_key"
```

4. Run database migrations:
```bash
npx prisma generate
npx prisma db push
```

5. Start the development server:
```bash
npm run dev
```

## 🗂️ Project Structure

```
autovolt/
├── app/
│   ├── (main)/         # Main user routes
│   ├── (admin)/        # Admin dashboard routes
│   └── api/            # API routes
├── components/         # Reusable components
├── lib/               # Utility functions
├── prisma/            # Database schema
└── public/            # Static assets
```

## 📱 Key Pages

- `/` - Homepage
- `/cars` - Car listings
- `/cars/[id]` - Car details
- `/saved-cars` - Wishlisted cars
- `/test-drive` - Test drive bookings
- `/admin` - Admin dashboard
- `/about` - About page
- `/contact` - Contact page

## 🔐 Authentication

- User authentication handled by Clerk
- Role-based access control:
  - Public users
  - Registered users
  - Admin users

## 🔄 Database Schema

Core models include:
- User
- Car
- TestDriveBooking
- UserSavedCar

## 🛡️ Security Features

- Secure authentication with Clerk
- Protected API routes
- Input validation
- XSS protection
- CORS configuration
- Rate limiting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) first.

## 📞 Support

For support, email [Mohit Maurya](mauryamohit138@gmail.com) or create an issue in this repository.

---
