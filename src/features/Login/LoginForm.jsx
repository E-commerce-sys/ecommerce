import Input from "../../components/Input";
import Button from "../../components/Button";
import shopImg from "../../assets/img/shopImg.svg";
import { Form, Link } from "react-router-dom";

function LoginForm() {
  return (
    <div className="flex items-center my-16 gap-32.5">
      <img src={shopImg} alt="" className="w-149.25 h-146.25 mr-20" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-6 mb-4">
          <p className="font-medium text-4xl">Log in to Exclusive</p>
          <p className="">Enter your details below</p>
        </div>
        <Form className="flex flex-col gap-10">
          <Input placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button className="w-[371px] h-[56px]">Log In</Button>
        </Form>

        <div className="flex flex-col items-center gap-4">
          <p className="text-[rgb(var(--color-text-main-3))]">
            Forget Password?
          </p>
          <p className="text-[rgb(var(--color-text-main-3))]">
            Don't have an account?
            <Link
              to="/register"
              className="mx-1 text-[rgb(var(--color-primary-main))] underline"
            >
              sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
