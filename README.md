# 🚀 PulseFlow - Modern SaaS Landing & Authentication

A production-ready React TypeScript application featuring a comprehensive landing page and authentication system with Supabase backend.

## 🌐 Live Application
- **Homepage**: https://pulseflows.netlify.app/
- **Demo**: https://pulseflows.netlify.app/signup

## ✨ Features

### 🎨 Landing Page
- **Modern Design**: Professional SaaS landing page with hero, features, testimonials
- **Responsive Layout**: Mobile-first design optimized for all devices
- **Component Architecture**: Modular, reusable React components
- **Performance**: Built with Vite for fast development and optimized builds
- **TypeScript**: Full type safety and developer experience

### 🔐 Authentication System
- **Complete Auth Flow**: Login → Registration → Protected Success Page
- **Supabase Backend**: Secure user management with PostgreSQL database
- **Protected Routes**: Route guards preventing unauthorized access
- **Work Email Validation**: Business email verification for lead quality
- **Session Persistence**: Users stay logged in across browser sessions
- **Professional UI**: Clean, responsive authentication forms

### 🛡️ Security Features
- **Route Protection**: Success page requires completed signup
- **Input Validation**: Client and server-side validation
- **Secure Database**: Supabase handles authentication tokens securely
- **Business Email Only**: Filters out personal email domains
- **Error Handling**: Graceful failure states with user feedback

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite for fast development and optimized builds
- **Backend**: Supabase (PostgreSQL + Authentication)
- **Routing**: React Router with protected routes
- **Deployment**: Netlify with auto-deployment from GitHub
- **Icons**: Lucide React for consistent iconography

## 🚀 Getting Started

1. **Install dependencies**:
```bash
npm install
```

2. **Start development server**:
```bash
npm run dev
```

3. **Build for production**:
```bash
npm run build
```

4. **Preview production build**:
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   └── sections/     # Page sections (Hero, Features, etc.)
├── assets/           # Static assets and images
├── App.tsx           # Main application component
└── main.tsx          # Application entry point
```

## 🎨 Design System

### Colors
- **Primary**: #005CE8
- **Blue Primary**: #1361f5
- **Gray 900**: #191B1C
- **Brand Green**: #017737
- **Success**: #0FAF62
- **Danger**: #E84646

### Typography
- **Primary Font**: Inter
- **Logo Font**: Public Sans

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 📝 Multi-Agent Development Ready

This project is structured for collaborative development with multiple agents working on different sections simultaneously.
