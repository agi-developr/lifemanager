# LifeManagement.app 🚀

A modern, AI-powered life coaching platform built with React and Node.js. LifeManagement.app helps users discover their passions, identify strengths, develop skills, and achieve their life goals through conversational AI.

## ✨ Features

- **🤖 AI Life Coaching**: Personalized conversations across 8 life areas
- **📊 Progress Tracking**: Visual insights and goal monitoring
- **🎯 Goal Management**: Set and track personal and professional goals
- **📱 Responsive Design**: Works seamlessly on desktop and mobile
- **🔐 User Authentication**: Secure login with JWT tokens
- **💾 Data Persistence**: MongoDB for user data and chat history
- **🎨 Modern UI**: Clean, motivational design with Tailwind CSS

## 🏗️ Architecture

### Frontend (React)
- **React 18** with functional components and hooks
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API communication
- **Context API** for state management

### Backend (Node.js)
- **Express.js** server with RESTful APIs
- **MongoDB** with Mongoose ODM
- **JWT** authentication
- **OpenAI API** integration for AI responses
- **Rate limiting** and security middleware

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lifemanagement-app
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Set up environment variables**
   
   Create `server/.env` file:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/lifemanagement
   JWT_SECRET=your-super-secret-jwt-key
   OPENAI_API_KEY=your-openai-api-key
   FRONTEND_URL=http://localhost:3000
   ```

5. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```

6. **Start the frontend**
   ```bash
   # In a new terminal
   npm start
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🎯 Life Coaching Modules

### 1. **Passions** 🔥
Discover what truly excites and motivates you through guided conversations.

### 2. **Strengths** 💪
Identify your unique abilities and talents with AI-powered analysis.

### 3. **Upskill** 📚
Get personalized recommendations for skill development and learning resources.

### 4. **Money** 💰
Receive practical financial advice and goal-setting guidance.

### 5. **Career** 🚀
Plan your career path with AI-driven insights and recommendations.

### 6. **Events** 📅
Find relevant events and networking opportunities in your area.

### 7. **Goals** 🎯
Set and track SMART goals with progress monitoring.

### 8. **Community** 👥
Connect with like-minded individuals and build meaningful relationships.

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/demo` - Demo account login
- `GET /api/auth/me` - Get current user

### Chat
- `POST /api/chat/session` - Create new chat session
- `POST /api/chat/message` - Send message to AI
- `GET /api/chat/sessions` - Get user sessions
- `GET /api/chat/session/:id` - Get specific session

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/insights` - Get user insights
- `GET /api/users/dashboard` - Get dashboard data

### Analytics
- `GET /api/insights/analytics` - Get user analytics
- `GET /api/insights/recommendations` - Get personalized recommendations
- `GET /api/insights/progress` - Get progress data

## 🗄️ Database Schema

### User Model
```javascript
{
  email: String,
  password: String,
  profile: {
    name: String,
    age: Number,
    location: String,
    currentJob: String,
    interests: [String],
    goals: [String]
  },
  insights: {
    passions: [String],
    strengths: [String],
    skills: [String],
    progress: {
      sessionsCompleted: Number,
      goalsAchieved: Number,
      lastActive: Date
    }
  }
}
```

### ChatSession Model
```javascript
{
  userId: ObjectId,
  module: String,
  messages: [{
    sender: String,
    content: String,
    timestamp: Date
  }],
  insights: {
    discoveredPassions: [String],
    identifiedStrengths: [String],
    recommendations: [String],
    goals: [String]
  },
  status: String,
  metadata: {
    messageCount: Number,
    lastActivity: Date
  }
}
```

## 🎨 UI Components

- **Sidebar**: Navigation with user profile
- **ChatWindow**: AI conversation interface
- **Dashboard**: Progress tracking and insights
- **Login**: Authentication with demo option
- **Profile**: User settings and preferences

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration
- Input validation and sanitization
- Helmet.js security headers

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Heroku)
1. Create Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Heroku CLI or GitHub integration

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your-mongodb-atlas-uri
JWT_SECRET=your-production-jwt-secret
OPENAI_API_KEY=your-openai-api-key
FRONTEND_URL=https://your-domain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the AI capabilities
- Tailwind CSS for the beautiful UI framework
- React team for the amazing frontend framework
- MongoDB for the database solution

## 📞 Support

For support, email support@lifemanagement.app or create an issue in the repository.

---

**Built with ❤️ for helping people achieve their life goals**
