# PulseFlow Authentication Components

## 🎯 **Overview**
Production-ready authentication components with PulseFlow branding, mobile responsiveness, and TypeScript support.

## 📁 **Files Created**
```
src/components/auth/
├── PulseFlowAuth.tsx          # Main auth components
├── AuthStyles.css             # Mobile-responsive styles
└── index.ts                   # Export declarations
```

## 🚀 **How to Use**

### **Option 1: Individual Components**
```tsx
import { LoginPage, RegistrationPage, SuccessPage } from '../components/auth/PulseFlowAuth';

// Login Page
<LoginPage onNavigateToSignup={() => navigate('/signup')} />

// Registration Page  
<RegistrationPage 
  onNavigateToLogin={() => navigate('/login')}
  onNavigateToSuccess={() => navigate('/success')}
/>

// Success Page
<SuccessPage />
```

### **Option 2: Complete Auth Flow**
```tsx
import PulseFlowAuth from '../components/auth/PulseFlowAuth';

// This handles internal navigation between login/signup/success
<PulseFlowAuth />
```

### **Option 3: With React Router** 
```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage, RegistrationPage, SuccessPage } from '../components/auth/PulseFlowAuth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage onNavigateToSignup={() => navigate('/signup')} />} />
        <Route path="/signup" element={<RegistrationPage onNavigateToLogin={() => navigate('/login')} onNavigateToSuccess={() => navigate('/success')} />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## ✨ **Features**

### **🎨 Design & Branding**
- ✅ Consistent PulseFlow logo from `images.heartbeatIcon`
- ✅ Brand colors: `#1361F5` (primary blue), `#017737` (brand green)
- ✅ Public Sans font family matching landing page
- ✅ `adjustLetterSpacing` class for typography consistency

### **📱 Mobile Responsive**
- ✅ Breakpoints: 1200px, 768px, 480px
- ✅ Hides illustration on mobile
- ✅ Optimized form layouts
- ✅ Touch-friendly buttons and inputs
- ✅ Proper text scaling

### **🔒 Validation & UX**
- ✅ Work email validation (blocks personal domains)
- ✅ Real-time form validation
- ✅ Password visibility toggle
- ✅ Dynamic form fields based on user type
- ✅ Loading states and error handling

### **♿ Accessibility**
- ✅ Semantic HTML elements
- ✅ Proper focus management
- ✅ ARIA labels and descriptions
- ✅ High contrast mode support
- ✅ Reduced motion support

## 🎛️ **Navigation Flow**

```
Landing Page → "Book a Demo" → Registration Page
                               ↓ (Submit Form)
                             Success Page

Login Page ← "Log In" ← Registration Page
    ↓ ("Try for free")
Registration Page
```

## 🔧 **Customization**

### **Update Navigation Actions**
In your Navigation component:
```tsx
<a href="/login" className="login-btn">Log in</a>
<a href="/signup" className="demo-btn">Book a Demo</a>
```

### **Add to Landing Page CTA**
In your CTA sections:
```tsx
<button onClick={() => navigate('/signup')} className="cta-button">
  Book a Demo →
</button>
```

### **Form Submission Handling**
```tsx
const handleLogin = async (formData) => {
  try {
    const response = await api.login(formData);
    // Handle successful login
  } catch (error) {
    // Handle errors
  }
};

const handleRegistration = async (formData) => {
  try {
    const response = await api.register(formData);
    // Handle successful registration
  } catch (error) {
    // Handle errors
  }
};
```

## 📱 **Testing Mobile Responsiveness**

1. **Chrome DevTools**: Toggle device toolbar (Ctrl+Shift+M)
2. **Test Breakpoints**: 1200px, 768px, 480px
3. **Check Elements**: 
   - Logo scaling
   - Form layout changes
   - Button sizes
   - Text readability

## 🎯 **Next Steps**

1. **Add to Navigation**: Update navbar login/signup links
2. **Integrate with Backend**: Add API calls for authentication
3. **Add Routes**: Set up React Router paths
4. **Protected Routes**: Add authentication guards
5. **Session Management**: Add JWT/session handling

## 🛡️ **Security Considerations**

- Input validation on client and server
- HTTPS in production
- Rate limiting for login attempts
- Password strength requirements
- Email verification flow
- CSRF protection

## 📋 **Form Data Structure**

```typescript
// Login Form
interface LoginData {
  email: string;
  password: string;
}

// Registration Form
interface RegistrationData {
  firstName: string;
  lastName: string;
  workEmail: string;
  company: string;
  organizationType: string;
  teamSizeOrClients: string;
  primaryRole: string;
  mainChallenge: string;
  otherChallenge: string;
  userType: 'executive' | 'consulting';
}
```
