# BOD Dashboard 🚀

A modern, responsive React dashboard application built with Vite, PrimeReact, and Context API for comprehensive data management and user authentication.

## ✨ Features

### 🎨 **Modern UI/UX**
- Clean, professional design with PrimeReact components
- Fully responsive layout for mobile and desktop
- Dark/light theme support with PrimeFlex utilities
- Smooth animations and interactive elements

### 🔐 **Authentication System**
- JWT-style authentication with session persistence
- Protected routes and role-based access control
- Demo accounts for quick testing
- Secure logout with session cleanup

### 📊 **Dashboard Components**
- **Users Management** - CRUD operations for user data
- **Posts Management** - Create, edit, and manage posts
- **Albums Gallery** - Photo album management
- **Todos Tracker** - Task management system
- **Analytics Dashboard** - Overview with statistics

### 🛠 **Technical Features**
- React 19+ with modern hooks and Context API
- Vite for lightning-fast development and builds
- Axios for API communications
- ESLint for code quality
- Responsive design with PrimeFlex grid system

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mahmoudAshraf283/BOD.git
   cd BOD
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🧪 Demo Accounts

Test the authentication system with these demo accounts:

| Username | Password | Role | Access Level |
|----------|----------|------|--------------|
| `admin` | `admin123` | Administrator | Full access to all features |
| `user` | `user123` | Standard User | Limited access |

## 📁 Project Structure

```
BOD/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Header.jsx     # Navigation header
│   │   ├── Sidebar.jsx    # Navigation sidebar
│   │   ├── Login.jsx      # Authentication form
│   │   └── ProtectedRoute.jsx
│   ├── contexts/          # React Context providers
│   │   ├── AppContext.jsx # Global app state
│   │   ├── AuthContext.jsx # Authentication state
│   │   └── NotificationContext.jsx
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Main application pages
│   │   ├── Dashboard.jsx  # Analytics overview
│   │   ├── Users.jsx      # User management
│   │   ├── Posts.jsx      # Posts management
│   │   ├── Albums.jsx     # Albums gallery
│   │   └── Todos.jsx      # Task tracker
│   ├── services/          # API communication
│   └── assets/            # Images and static files
├── package.json
└── README.md
```

## 🛠 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

## 🔧 Technologies Used

### Core Technologies
- **React 19+** - Modern UI library with latest features
- **Vite** - Next-generation frontend tooling
- **JavaScript (ES6+)** - Modern JavaScript features

### UI/UX Libraries
- **PrimeReact** - Rich component library
- **PrimeIcons** - Icon set for UI elements
- **PrimeFlex** - Utility-first CSS framework

### Development Tools
- **ESLint** - Code linting and quality assurance
- **Axios** - HTTP client for API requests

## 🌟 Key Features Breakdown

### Authentication System
- Mock JWT implementation for demonstration
- Persistent sessions with localStorage
- Role-based route protection
- Secure login/logout functionality

### State Management
- React Context API for global state
- Centralized notification system
- Authentication state management
- Application-wide theme and settings

### Data Management
- CRUD operations for all entities
- RESTful API integration with JSONPlaceholder
- Real-time data updates
- Error handling and loading states

### Responsive Design
- Mobile-first approach
- Flexible grid system
- Touch-friendly interfaces
- Cross-browser compatibility

## 🔄 API Integration

The application integrates with JSONPlaceholder API for demonstration:

- **Users**: `https://jsonplaceholder.typicode.com/users`
- **Posts**: `https://jsonplaceholder.typicode.com/posts`
- **Albums**: `https://jsonplaceholder.typicode.com/albums`
- **Todos**: `https://jsonplaceholder.typicode.com/todos`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 👨‍💻 Author

**Mahmoud Ashraf** - [@mahmoudAshraf283](https://github.com/mahmoudAshraf283)

## 🙏 Acknowledgments

- [PrimeReact](https://primereact.org/) for the excellent component library
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for the demo API
- [Vite](https://vitejs.dev/) for the amazing build tool
- React team for the incredible framework

---

⭐ **Star this repository if you found it helpful!**
