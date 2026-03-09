import SideImage from "../../../assets/img/Side-Image.png";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import GoogleIcon from "../../../assets/icons/Icon-Google.svg";
import { Form, Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {registerAPI} from '../../auth/Register/registerAPI'

function RegisterForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const location = useLocation();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
  

  try{
    const res = await registerAPI(firstName,lastName,email,password,confirmPassword)
    console.log(res)

    localStorage.setItem("token", res.data.token);

    navigate(from, { replace: true });
  }catch(e){
    console.log("Sign up failed", e);
    console.log("Error details:", e?.response?.data);
  }}
  return (
    <div className="w-full max-w-full flex flex-row items-center lg:gap-50 overflow-hidden">
      <img
        src={SideImage}
        className="hidden lg:block lg:w-[45%] h-auto my-30 shrink-0"
      />
      <div className="flex flex-col gap-12.5">
        <div className="flex flex-col gap-6 tacking-[4%] items-start">
          <h1 className="text-[36px] font-medium">{t("register.create")}</h1>
          <p className="text-[18px]">{t("details")}</p>
        </div>
        <Form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div className="flex flex-col gap-10  w-92.75">
          <div className="flex flex-row gap-15">
            <Input
              placeholder={`${t("register.first_name")}`}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-38.75"
            />
            <Input
              placeholder={`${t("register.last_name")}`}
              value={lastName}
            onChange={(e) => setLastName(e.target.value)}
              className="w-38.75"
            />
          </div>
          <Input placeholder={`${t("email")}`} value={email}
            onChange={(e) => setEmail(e.target.value)} className=" py-2" type="email"/>
          <Input
            type="password"
            placeholder={`${t("password")}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" py-2"
          />
          <Input
            type="password"
            placeholder={`${t("register.confirm_password")}`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className=" py-2"
          />
        </div>
        <div className="flex flex-col gap-4 items-center">
          <Button size="lg" type="submit"><Link to="/">{t("register.create")}</Link></Button>
          <Button size="lg" variant="outline" className="gap-2">
            <img src={GoogleIcon} className="w-6 h-6 mr-1.25" />
            {t("register.google")}
          </Button>
        </div>
        </Form>
        <div className="flex flex-col items-center gap-4">
          <p className="flex gap-4 text-[rgb(var(--color-text-main-3))] ">
            {t("register.have_account")}

            <Link
              to="/login"
              className="underline text-[rgb(var(--color-primary-main))]"
            >
              {t("log_in")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
