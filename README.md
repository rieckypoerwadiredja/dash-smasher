# Dash Smasher 🏸

A modern badminton court booking and management dashboard for admin and analytics. Dash Smasher simplifies the process of reserving courts, managing events, and handling payments for badminton facilities. Built for venue owners and players who need an intuitive platform to streamline bookings, check-ins, and event participation.

## ✨ Features

- **Court Booking System** - Reserve courts with real-time availability status
- **Event Management** - Create, browse, and join badminton events
- **Online Payment Integration** - Secure payments via Midtrans gateway
- **QR Code Check-in** - Scan QR codes for seamless check-in process
- **Admin Dashboard** - Manage courts, events, bookings, and view analytics
- **User Authentication** - Secure login with NextAuth
- **Booking History** - Track past and upcoming reservations
- **Responsive Design** - Optimized for mobile and desktop

## 🛠️ Tech Stack

| Technology        | Version | Description                     |
| ----------------- | ------- | ------------------------------- |
| Next.js           | 16.0.7  | React framework with App Router |
| React             | 19.2.0  | UI library                      |
| TypeScript        | 5.x     | Type-safe JavaScript            |
| Tailwind CSS      | 4.x     | Utility-first CSS framework     |
| NextAuth          | 4.24.13 | Authentication                  |
| Google Sheets API | 164.1.0 | Database via googleapis         |
| Midtrans Client   | 1.4.3   | Payment gateway                 |
| ApexCharts        | 5.3.6   | Data visualization              |
| React Icons       | 5.5.0   | Icon library                    |

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/              # NextAuth configuration
│   │   ├── midtrans/          # Payment gateway endpoints
│   │   └── sheets/            # Google Sheets API endpoints
│   │       ├── books/         # Booking operations
│   │       ├── courts/        # Court management
│   │       ├── events/        # Event operations
│   │       ├── event_member/  # Event membership
│   │       ├── check_in/      # QR check-in system
│   │       └── history/       # Booking history
│   ├── (main)/                # Main app pages
│   │   ├── courts/            # Courts listing
│   │   └── events/            # Events listing
│   ├── (fullscreen)/          # Fullscreen layouts
│   │   ├── admin/             # Admin dashboard
│   │   ├── login/             # Authentication
│   │   ├── profile/           # User profile
│   │   └── courts/            # Court details
│   ├── components/
│   │   ├── elements/          # Reusable UI elements
│   │   └── fragments/         # Composite components
│   ├── services/              # Business logic services
│   ├── utils/                 # Utility functions
│   ├── types/                 # TypeScript definitions
│   ├── context/               # React context providers
│   ├── hooks/                 # Custom React hooks
│   └── constants/             # App constants
└── public/                    # Static assets
```

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/rieckypoerwadiredja/dash-smasher

# Navigate to project directory
cd dash-smasher

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Google Sheets API (Google Workspace)
SPREADSHEET_ID=
GOOGLE_PROJECT_ID=
GOOGLE_CLIENT_EMAIL=
GOOGLE_PRIVATE_KEY=

# Google Auth (Google Workspace)
GOOGLE_ID=
GOOGLE_SECRET=

# GitHub Auth (GitHub)
GITHUB_ID=
GITHUB_SECRET=

# Midtrans Payment Gateway (Midtrans)
MERCHANT_ID=
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=
MIDTRANS_SERVER_KEY=
NEXT_PUBLIC_MIDTRANS_SNAP_URL=https://app.sandbox.midtrans.com/snap/snap.js


# App Configuration (Next.js)
NEXT_PUBLIC_API_URL=

# NextAuth (Next.js)
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

```

## 📡 API Structure

### Sheets API

| Method | Endpoint                     | Description              | Query Params                                                                                          |
| ------ | ---------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------- |
| GET    | `/api/sheets/courts`         | Get all courts           | `admin` (string)                                                                                      |
| GET    | `/api/sheets/courts/:id`     | Get a specific court     | —                                                                                                     |
| GET    | `/api/sheets/books`          | Get all bookings         | `email` (string), `courtIDs` (string, comma-separated)                                                |
| GET    | `/api/sheets/books/:courtId` | Get bookings by court ID | `paymentStatus` (string, comma-separated), `paymentType` (string), `admins` (string, comma-separated) |
| POST   | `/api/sheets/books`          | Create a booking         | —                                                                                                     |
| PUT    | `/api/sheets/books`          | Update a booking         | —                                                                                                     |
| GET    | `/api/sheets/events`         | Get all events           | —                                                                                                     |
| GET    | `/api/sheets/event_member`   | Get event members        | `email` (string)                                                                                      |
| POST   | `/api/sheets/event_member`   | Add event member         | —                                                                                                     |
| GET    | `/api/sheets/history`        | Get booking history      | `email` (string), `limit` (string)                                                                    |
| PUT    | `/api/sheets/check_in`       | Process check-in         | —                                                                                                     |

### Payment API

| Method | Endpoint        | Description                |
| ------ | --------------- | -------------------------- |
| POST   | `/api/midtrans` | Create payment transaction |

### Auth API

| Method   | Endpoint                  | Description        |
| -------- | ------------------------- | ------------------ |
| GET/POST | `/api/auth/[...nextauth]` | NextAuth endpoints |

## 🗺️ Roadmap

- [ ] Add push notifications for booking reminders
- [ ] Add push notifications for event reminders

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
