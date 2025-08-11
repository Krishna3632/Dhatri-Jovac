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

import { Link } from 'react-router-dom';

function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrollY, setScrollY] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Dhatri Healthcare
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('features')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Features
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Reviews
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Contact
              </button>
             <button><Link 
  to="/login" 
  className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all inline-block text-center"
>
  Get Started
</Link></button>
            </div>

            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 py-4 animate-in slide-in-from-top duration-200">
              <div className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection('features')} className="text-left text-gray-700 hover:text-blue-600 font-medium px-4 py-2">
                  Features
                </button>
                <button onClick={() => scrollToSection('testimonials')} className="text-left text-gray-700 hover:text-blue-600 font-medium px-4 py-2">
                  Reviews
                </button>

                <button className="mx-4 bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 rounded-full font-medium">
                  Get Started
                </button>
              </div>
            </div>
          )}    
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
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
                <button className="group bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group flex items-center justify-center px-8 py-4 rounded-full font-semibold text-lg border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300">
                  <Play className="w-5 h-5 mr-2 text-blue-600" />
                  Watch Demo
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-6 pt-8">
                <div>
                  <div className="text-3xl font-bold text-gray-900">50K+</div>
                  <div className="text-gray-600">Lives Transformed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">4.9★</div>
                  <div className="text-gray-600">Patient Satisfaction</div>
                </div>
              </div>
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
      <section className="py-20 bg-white">
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
      </section>

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
      {/* <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who've experienced the future of healthcare. Your wellness journey starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Get Started Today
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      {/* <footer id="contact" className="bg-gray-900 text-white py-16">
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
      </footer> */}
    </div>
  );
}

export default LandingPage;