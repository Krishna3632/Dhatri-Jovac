import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Shield, 
  Clock, 
  Users, 
  Calendar, 
  Phone, 
  MapPin, 
  Star,
  ChevronDown,
  Menu,
  X,
  Activity,
  Stethoscope,
  UserCheck,
  Play,
  CheckCircle,
  ArrowRight,
  Award,
  TrendingUp,
  Zap
} from 'lucide-react';

// New component for the Login Page
const LoginPage = ({ setCurrentPage }) => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const handleLoginFormChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login submitted:", loginForm);
    // You would typically send this data to an API
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <button 
          onClick={() => setCurrentPage('landing')} 
          className="text-gray-500 hover:text-blue-600 transition-colors mb-4 flex items-center"
        >
          <ArrowRight className="w-5 h-5 mr-2 rotate-180" /> Back to Landing
        </button>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleLoginSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={loginForm.email}
              onChange={handleLoginFormChange}
              required
              className="mt-1 block w-full rounded-xl border-2 border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleLoginFormChange}
              required
              className="mt-1 block w-full rounded-xl border-2 border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 rounded-xl shadow-lg font-bold text-white bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all transform hover:scale-105"
          >
            Log In
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => setCurrentPage('signup')}
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// New component for the Signup Page
const SignupPage = ({ setCurrentPage }) => {
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' });

  const handleSignupFormChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signup submitted:", signupForm);
    // You would typically send this data to an API
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <button 
          onClick={() => setCurrentPage('landing')} 
          className="text-gray-500 hover:text-blue-600 transition-colors mb-4 flex items-center"
        >
          <ArrowRight className="w-5 h-5 mr-2 rotate-180" /> Back to Landing
        </button>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSignupSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={signupForm.name}
              onChange={handleSignupFormChange}
              required
              className="mt-1 block w-full rounded-xl border-2 border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={signupForm.email}
              onChange={handleSignupFormChange}
              required
              className="mt-1 block w-full rounded-xl border-2 border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={signupForm.password}
              onChange={handleSignupFormChange}
              required
              className="mt-1 block w-full rounded-xl border-2 border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 rounded-xl shadow-lg font-bold text-white bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setCurrentPage('login')}
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Main component containing all page views
function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [currentPage, setCurrentPage] = useState('landing'); // State to manage current page view

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  

  const features = [
    { 
      icon: <Calendar className="w-8 h-8 text-blue-500" />, 
      title: "Smart Scheduling", 
      description: "AI-powered appointment booking that finds the perfect time slot with top specialists",
      gradient: "from-blue-500 to-cyan-500"
    },
    { 
      icon: <Shield className="w-8 h-8 text-green-500" />, 
      title: "Military-Grade Security", 
      description: "Your medical data is protected with bank-level encryption and HIPAA compliance",
      gradient: "from-green-500 to-emerald-500"
    },
    { 
      icon: <Clock className="w-8 h-8 text-purple-500" />, 
      title: "24/7 Emergency Care", 
      description: "Round-the-clock medical support with instant emergency response protocols",
      gradient: "from-purple-500 to-violet-500"
    },
    { 
      icon: <Activity className="w-8 h-8 text-red-500" />, 
      title: "Real-Time Monitoring", 
      description: "Continuous health tracking with wearable integration and predictive analytics",
      gradient: "from-red-500 to-pink-500"
    },
    { 
      icon: <Stethoscope className="w-8 h-8 text-indigo-500" />, 
      title: "World-Class Specialists", 
      description: "Access to board-certified doctors from premier medical institutions globally",
      gradient: "from-indigo-500 to-blue-500"
    },
    { 
      icon: <UserCheck className="w-8 h-8 text-teal-500" />, 
      title: "Precision Medicine", 
      description: "Personalized treatment plans powered by genomic data and AI diagnostics",
      gradient: "from-teal-500 to-cyan-500"
    }
  ];

  const testimonials = [
    { 
      name: "Priya Sharma", 
      location: "Mumbai", 
      text: "Dhatri Healthcare revolutionized my diabetes management. The AI recommendations and specialist consultations have been life-changing!", 
      rating: 5,
      role: "Business Executive",
      image: "PS"
    },
    { 
      name: "Dr. Rajesh Kumar", 
      location: "Delhi", 
      text: "As a physician, I'm impressed by their telemedicine platform. The diagnostic tools and patient management system are exceptional.", 
      rating: 5,
      role: "Cardiologist",
      image: "RK"
    },
    { 
      name: "Anita Patel", 
      location: "Bangalore", 
      text: "The seamless appointment booking and follow-up care exceeded my expectations. Truly the future of healthcare!", 
      rating: 5,
      role: "Software Engineer",
      image: "AP"
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Patients", icon: <Users className="w-8 h-8 text-blue-500" /> },
    { number: "200+", label: "Expert Doctors", icon: <Stethoscope className="w-8 h-8 text-green-500" /> },
    { number: "99.9%", label: "Uptime", icon: <Shield className="w-8 h-8 text-purple-500" /> },
    { number: "4.9★", label: "Patient Rating", icon: <Star className="w-8 h-8 text-yellow-500" /> }
  ];

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100; // adjust for navbar height
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute("id");
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const renderLandingPageContent = () => (
    <>
      <nav className="bg-white/98 backdrop-blur-md shadow-2xl shadow-lg sticky top-0 z-50  border-gradient-to-r from-blue-200/30 to-green-200/30">
      <div className="max-w-full px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center py-5">
          {/* Logo Section - Extreme Left */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 hover:rotate-12">
                <Heart className="w-7 h-7 text-white drop-shadow-sm" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div> */}
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent tracking-tight">
                Dhatri Healthcare
              </span>
              <span className="text-xs text-gray-500 font-medium tracking-wide">
                Caring Beyond Limits
              </span>
            </div>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center space-x-12 flex-grow justify-center">
            <button
              onClick={() => scrollToSection("features")}
              className={`group relative font-semibold transition-all duration-300 py-2 ${
                activeSection === "features"
                  ? "text-blue-600 after:w-full"
                  : "text-gray-700 hover:text-blue-600 after:w-0"
              } after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-green-500 after:transition-all after:duration-300`}
            >
              Features
            </button>

            <button
              onClick={() => scrollToSection("testimonials")}
              className={`group relative font-semibold transition-all duration-300 py-2 ${
                activeSection === "testimonials"
                  ? "text-blue-600 after:w-full"
                  : "text-gray-700 hover:text-blue-600 after:w-0"
              } after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-green-500 after:transition-all after:duration-300`}
            >
              Reviews
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className={`group relative font-semibold transition-all duration-300 py-2 ${
                activeSection === "contact"
                  ? "text-blue-600 after:w-full"
                  : "text-gray-700 hover:text-blue-600 after:w-0"
              } after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-green-500 after:transition-all after:duration-300`}
            >
              Contact
            </button>
          </div>

          {/* Mobile menu button and Get Started button */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentPage('login')}
              className="hidden lg:block bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Get Started
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gradient-to-br from-gray-50 to-blue-50/30 border-t border-gray-200/50 rounded-b-2xl backdrop-blur-sm overflow-hidden">
            <div className="py-6 px-4 space-y-1">
              <button 
                onClick={() => scrollToSection('features')} 
                className="w-full text-left text-gray-700 hover:text-blue-600 hover:bg-white/50 font-semibold px-6 py-4 rounded-xl transition-all duration-200 border border-transparent hover:border-blue-200"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className="w-full text-left text-gray-700 hover:text-blue-600 hover:bg-white/50 font-semibold px-6 py-4 rounded-xl transition-all duration-200 border border-transparent hover:border-blue-200"
              >
                Reviews
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="w-full text-left text-gray-700 hover:text-blue-600 hover:bg-white/50 font-semibold px-6 py-4 rounded-xl transition-all duration-200 border border-transparent hover:border-blue-200"
              >
                Contact
              </button>
              <div className="pt-4">
                <button 
                  onClick={() => {
                    setCurrentPage('login');
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 via-blue-500 to-green-500 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-102 transition-all duration-300 group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        )}    
      </div>
    </nav>
      {/* Hero Section */}
      <section className= "relative overflow-hidden min-h-screen flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          ></div>
          <div 
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse"
            style={{ transform: `translateY(${-scrollY * 0.3}px)` }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"
            style={{ transform: `translate(-50%, -50%) translateY(${scrollY * 0.1}px)` }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side content */}
            <div className="space-y-8 animate-in slide-in-from-left duration-1000">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-600 text-sm font-medium">
                <Zap className="w-4 h-4 mr-2" />
                Transforming Healthcare with AI
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                  Your Health,
                </span>
                <br />
                <span className="text-gray-900">Our Priority</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Experience next-generation healthcare with AI-powered diagnostics, world-class specialists, 
                and personalized care that adapts to your unique needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setCurrentPage('signup')}
                  className="group bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group flex items-center justify-center px-8 py-4 rounded-full font-semibold text-lg border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300">
                  <Play className="w-5 h-5 mr-2 text-blue-600" />
                  Watch Demo
                </button>
              </div>

              {/* Quick Stats */}
              {/* <div className="grid grid-cols-2 gap-6 pt-8">
                <div>
                  <div className="text-3xl font-bold text-gray-900">50K+</div>
                  <div className="text-gray-600">Lives Transformed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">4.9★</div>
                  <div className="text-gray-600">Patient Satisfaction</div>
                </div>
              </div> */}
            </div>

            {/* Right side feature card */}
            <div className="relative animate-in slide-in-from-right duration-1000 delay-300">
              <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-700 border border-white/20">
                <div className="space-y-6">
                  {/* Interactive Health Check Card */}
                  <div className="group cursor-pointer">
                    <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 transition-all duration-300">
                      <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Heart className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">AI Health Scanner</h3>
                        <p className="text-gray-600 text-sm">Get instant health insights with our advanced AI diagnostic system.</p>
                      </div>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Secure Access Card */}
                  <div className="group cursor-pointer">
                    <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300">
                      <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Shield className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg group-hover:text-purple-600 transition-colors">Fort Knox Security</h3>
                        <p className="text-gray-600 text-sm">Military-grade encryption protects your most sensitive health data.</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  </div>

                  {/* Specialist Consultation Card */}
                  <div className="group cursor-pointer">
                    <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-red-50 hover:to-yellow-50 transition-all duration-300">
                      <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Stethoscope className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg group-hover:text-red-600 transition-colors">Expert Consultations</h3>
                        <p className="text-gray-600 text-sm">Connect with world-renowned specialists in under 60 seconds.</p>
                      </div>
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
                        <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                        <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Achievement Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-3 rounded-full shadow-lg animate-bounce">
                  <Award className="w-6 h-6" />
                </div>
              </div>

              {/* Enhanced Decorative Elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-green-300 to-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>    

      {/* Stats Section */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Revolutionizing Healthcare with 
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Innovation</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of healthcare with cutting-edge technology, personalized care, and world-class medical expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-blue-200 transform hover:scale-105">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              What Our Patients 
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Say</span>
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied patients who trust us with their health
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-8 lg:p-12 shadow-xl">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-2xl lg:text-3xl font-medium text-gray-900 mb-8 leading-relaxed">
                  "{testimonials[activeTestimonial].text}"
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonials[activeTestimonial].image}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900 text-lg">
                      {testimonials[activeTestimonial].name}
                    </div>
                    <div className="text-gray-600">
                      {testimonials[activeTestimonial].role} • {testimonials[activeTestimonial].location}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-2 mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeTestimonial 
                          ? 'bg-blue-600 w-8' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who've experienced the future of healthcare. Your wellness journey starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setCurrentPage('signup')}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Get Started Today
            </button>
            <button 
              onClick={() => setCurrentPage('login')}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Dhatri Healthcare</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Transforming healthcare through innovation, compassion, and cutting-edge technology.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Telemedicine</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Health Monitoring</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Specialist Care</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Emergency Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>+91 1800-123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Mumbai, Delhi, Bangalore</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {currentPage === 'landing' && renderLandingPageContent()}
      {currentPage === 'login' && <LoginPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'signup' && <SignupPage setCurrentPage={setCurrentPage} />}
    </div>
  );
}

export default LandingPage;
