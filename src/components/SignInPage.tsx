import { FcGoogle } from "react-icons/fc";
import illustration from "../assets/illustration.png";
import "./SignInPage.css";

type SignInPageProps = {
  onSignIn: () => void;
};

export default function SignInPage({ onSignIn }: SignInPageProps) {
  return (
    <div className="signin-container">
      {/* Left Panel */}
      <div className="signin-left">
        <div className="signin-box">
          <h1 className="main-title">Smart Note App</h1>

          <div className="text-content">
            <h2 className="subtitle">Ready to start your success story?</h2>
            <p className="description">
              Signin to our website and start leafing through your notes today!
            </p>
          </div>

          <button className="google-btn" onClick={onSignIn}>
            <FcGoogle size={20} />
            Sign in with Google
          </button>

          <p className="terms">
            By continuing, you agree to our{" "}
            <a href="#" className="link">
              Terms & Conditions
            </a>.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="signin-right">
        <img src={illustration} alt="Illustration" className="illustration" />
      </div>
    </div>
  );
}
