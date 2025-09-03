import {useState} from 'react';

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
            <Link to='/login'>Sign Up</Link>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;