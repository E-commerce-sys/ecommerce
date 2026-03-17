/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import RegisterForm from "../features/auth/Register/RegisterForm";
import VerifyOTPModal from "../features/auth/VerifyOTP/VerifyOTPModal";
import { useLocation } from "react-router-dom";

function RegisterPage() {
  const location = useLocation();
  const showVerifyModal = location.pathname === "/register/verify";
  return (
    <div>
      <>
        <RegisterForm />
        {showVerifyModal && <VerifyOTPModal />}
      </>
    </div>
  );
}

export default RegisterPage;
