import { Link } from "react-router-dom";
import LayoutAuthentication from "../layout/LayoutAuthentication";
import { Button, ButtonGoogle } from "../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormGroup from "../components/common/FormGroup";
import { Label } from "../components/label";
import useToggleValue from "../hooks/useToggleValue";
import { IconEyeToggle } from "../components/icons";
import { Input } from "../components/input";

const schema = yup.object({
  email: yup.string().email("").required("This field is required"),
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Password must be 8 character"),
});

const SignInPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    model: "onSubmit",
  });
  const { value: showPassword, handleToggleValue: handleToggleIconEye } =
    useToggleValue();
  const handleSignIn = (values) => {
    console.log(values);
  };

  return (
    <LayoutAuthentication heading="Welcome Back!">
      <p className="mb-6 text-xs font-normal text-center lg:text-sm text-text3 lg:mb-8">
        Don't have an account?{" "}
        <Link to="/sign-up" className="font-medium underline text-primary">
          Sign In
        </Link>
      </p>
      <ButtonGoogle text="Sign up with Google"></ButtonGoogle>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <FormGroup>
          <Label htmlFor="email">Email *</Label>
          <Input
            control={control}
            name="email"
            type="email"
            placeholder="example@gmail.com"
            error={errors.email?.message}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password *</Label>
          <Input
            control={control}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            error={errors.password?.message}
          >
            <IconEyeToggle
              open={showPassword}
              onClick={handleToggleIconEye}
            ></IconEyeToggle>
          </Input>
          <Button type="submit" className="w-full bg-primary">
            Sign up
          </Button>
        </FormGroup>
        <FormGroup>
          <div className="text-right">
            <span className="inline-block text-sm font-medium text-primary">
              Forgot password
            </span>
          </div>
        </FormGroup>
      </form>
    </LayoutAuthentication>
  );
};

export default SignInPage;
