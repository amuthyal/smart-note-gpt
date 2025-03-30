type SignInPageProps = {
    onSignIn: () => void;
  };
  
  export default function SignInPage({ onSignIn }: SignInPageProps) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center space-y-5">
          <div className="text-4xl">📝</div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome to Smart Note</h1>
          <p className="text-gray-600 text-sm">Your AI-powered note-taking companion</p>
          <button
            onClick={onSignIn}
            className="mt-4 bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-full text-sm font-medium shadow"
          >
            Sign in with Google
          </button>
          <p className="text-xs text-gray-400 mt-2">We respect your privacy.</p>
        </div>
      </div>
    );
  }
  