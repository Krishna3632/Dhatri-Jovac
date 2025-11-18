export default function LoginPage({ setCurrentPage }) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-xl shadow-lg text-center w-full max-w-sm">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg inline-block">
                    <IconHeart className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
                <p className="text-gray-500 mb-6">Login to your clinic dashboard.</p>
                <button 
                    onClick={() => setCurrentPage('dashboard')}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                    Login
                </button>
            </div>
        </div>
    );
}