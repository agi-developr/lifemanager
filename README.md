# LifeManager — AI-Assisted Collaboration & Alignment Platform 🚀

LifeManager has pivoted from an AI life coach to a platform for collaborating, running personality/skills tests, aligning cofounders to ideas, and moving ideas through an AI-assisted idea → business pipeline.

## ✨ What you can do

- **🧭 Workspace**: Central hub to organize ideas, people, and next actions
- **💡 Ideas**: Capture, compare, and evolve ideas with AI prompts and scorecards
- **🛠️ Pipeline**: Structured stages from discovery to growth, with AI “next step” help
- **🤝 Matches**: Cofounder & idea alignment using personality, values, and skills
- **🧪 Tests**: Personality, motivation/values, skills, and working style assessments
- **👥 Collaborators**: Roles, invites, and team management per idea
- **🤖 AI Shortcuts**: Pipeline coach and networking assistant built-in

## 🏗️ Architecture

### Frontend (React)
- React 18 + React Router
- Tailwind CSS
- Context API for auth and app state
- Axios for API calls

### Backend (Node.js)
- Express.js REST API
- MongoDB + Mongoose
- JWT auth
- OpenAI-powered services (pipeline coach, networking)

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- OpenAI API key

### Installation

1. Clone and install
   ```bash
   git clone <repository-url>
   cd lifemanager
   npm install
   ```

2. Backend deps
   ```bash
   cd server
   npm install
   ```

3. Environment
   Create `server/.env`:
   ```env
  PORT=5000
  NODE_ENV=development
  MONGODB_URI=mongodb+srv://user1:ilia1100@cluster1.xb81tso.mongodb.net/lifemanager?retryWrites=true&w=majority&appName=Cluster1
  JWT_SECRET=change-me-dev-secret
  FRONTEND_URL=http://localhost:5173
   ```

4. Run
   ```bash
   # Backend
   cd server && npm run dev

   # Frontend (new terminal)
   npm start
   ```

5. Open
- App (Vite): http://localhost:5173
- API: http://localhost:5000

## 🧭 App Navigation

- `Workspace` — overview, quick actions, assistant panel
- `Ideas` — idea list, AI scorecards, prompt helpers
- `Pipeline` — stages: discovery, validation, build, launch, growth
- `Matches` — recommended people and compatible ideas
- `Tests` — assessments; AI-assisted baseline + refinement
- `Collaborators` — team roles and invites
- `AI Shortcuts` — Pipeline Coach, Networking

## 🔧 Core API Endpoints

- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- Chat/AI: `POST /api/chat/session`, `POST /api/chat/message`
- Users: `GET/PUT /api/users/profile`, `GET /api/users/insights`
- Insights: `GET /api/insights/analytics`, `GET /api/insights/recommendations`
- Pipeline Coach: `PUT /api/pipeline/tests`, `GET /api/pipeline/coach`

### Pipeline Coach Examples

1) Save tests/profile

```bash
curl -X PUT http://localhost:5000/api/pipeline/tests \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "personality": {"type": "Innovative Extrovert", "bigFive": {"openness": 0.9, "extraversion": 0.8, "conscientiousness": 0.7}},
    "passions": ["AI", "Sustainability", "EdTech"],
    "skills": [{"name": "Coding", "level": 9}, {"name": "UI/UX Design", "level": 7}, {"name": "Marketing", "level": 4}, {"name": "Project Management", "level": 6}, {"name": "Fundraising", "level": 3}],
    "demographics": {"yearsExperience": 4, "location": "San Francisco", "ageRange": "28-35"},
    "currentStage": "Ideation",
    "currentIdeaDescription": "AI-powered app that reduces personal carbon footprint via gamified challenges."
  }'
```

2) Get personalized pipeline JSON

```bash
curl -X GET http://localhost:5000/api/pipeline/coach \
  -H "Authorization: Bearer <TOKEN>"
```

## 🔒 Security

- JWT auth, bcrypt hashing, Helmet, rate limiting, CORS, input validation

## 🚀 Deployment

- Frontend: Vercel (Vite + React)
- Backend: Render or Fly.io (Node/Express)
- Database: MongoDB Atlas (Free, on Google Cloud region)

## 🤝 Contributing

1. Fork
2. Branch: `feat/my-change`
3. Commit & push
4. Open PR

## 📝 License

MIT — see `LICENSE`.

---

Built with ❤️ to help founders team up, align, and ship.
