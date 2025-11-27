"use client";
import { useAuthContext } from "@/auth/hooks/use-auth-context";
import Button from "@/components/main/button";
import Card from "@/components/main/card";
import Input from "@/components/main/input";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
//-----------------------

const LoginSchema = yup.object({
  username: yup.string().required("username is required"),
  password: yup
    .string()
    .min(6, "password must be at least 6 characters")
    .required("password is required"),
});

type FormValuesProps = yup.InferType<typeof LoginSchema>;
//---------------------------
const LoginView = () => {
  const router = useRouter();
  const { login } = useAuthContext();
  const defaultValues = {
    username: "sepide",
    password: "123456",
  };
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await login(data.username, data.password);
    router.push("/dashboard");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen ">
          <div className="hidden lg:flex justify-center items-center">
            <Image
              src="/images/login.svg"
              alt="logo"
              width={400}
              height={400}
            />
          </div>
          <div className="flex justify-center items-center">
            <Card
              title="Login"
              subtitle="Please enter your username and password"
              actions={
                <Button type="submit" loading={isSubmitting}>
                  Login
                </Button>
              }
            >
              <div className="flex flex-col gap-3">
                <Input label="username" {...register("username")} fullWidth />
                <Input
                  label="password"
                  {...register("password")}
                  fullWidth
                  type="password"
                />
              </div>
            </Card>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginView;
