"use client";

import { useLoginMutation, useRegisterMutation } from "@/app/apis/auth.api";
import Button from "@/app/components/button";
import { Input } from "@/app/components/inputs/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsGithub } from "react-icons/bs";
import { z } from "zod";
import AuthSocialButton from "./auth-social-button";
import { PATH } from "@/app/constants/path";
type Variant = "LOGIN" | "REGISTER";

const formSchemaLogin = z.object({
    email: z.string().min(1),
    password: z.string().min(1),
});

const formSchemaRegister = z.object({
    name: z.string().min(1),
    email: z.string().min(1),
    password: z.string().min(1),
});

export default function AuthForm() {
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>("LOGIN");
    const [isLoading, setIsLoading] = useState(false);
    const [getLoginApi] = useLoginMutation();
    const [getRegisterApi] = useRegisterMutation();

    const toggleVariant = useCallback(() => {
        if (variant === "LOGIN") {
            setVariant("REGISTER");
        } else {
            setVariant("LOGIN");
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        resolver: zodResolver(
            variant === "LOGIN" ? formSchemaLogin : formSchemaRegister
        ),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<any> = async (data) => {
        setIsLoading(true);

        if (variant === "REGISTER") {
            await getRegisterApi(data)
                .unwrap()
                .then(() => {
                    toast.success("Register Succcess!");
                    setVariant("LOGIN");
                })
                .catch((error: any) => {
                    toast.error(`Something went wrong!`);
                    console.log(error);
                })
                .finally(() => setIsLoading(false));
        }

        if (variant === "LOGIN") {
            await getLoginApi(data)
                .unwrap()
                .then(() => {
                    toast.success("Logged In!");
                    router.push(PATH.USERS);
                })
                .catch((error: any) => {
                    toast.error(`Something went wrong!`);
                    console.log(error);
                })
                .finally(() => setIsLoading(false));
        }
    };

    const socialAction = (action: string) => {
        setIsLoading(true);

        // router.push()

        signIn(action, { redirect: false })
            .then((callback) => {
                if (callback?.error) {
                    toast.error("Invalid credentials!");
                }

                if (callback?.ok && !callback?.error) {
                    toast.success("Logged in!");
                }
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {variant === "REGISTER" ? (
                        <Input
                            id="name"
                            label="Name"
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                        />
                    ) : null}

                    <Input
                        id="email"
                        label="Email"
                        type="email"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />

                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <div>
                        <Button disabled={isLoading} fullWidth type="submit">
                            {variant === "LOGIN" ? "Sign in" : "Register"}
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                        <Link
                            className="w-1/2 "
                            href="http://localhost:3005/api/auth/github"
                        >
                            <AuthSocialButton
                                icon={BsGithub}
                                onClick={() => {}}
                            />
                        </Link>
                        {/* <AuthSocialButton
                            icon={BsGoogle}
                            onClick={() => socialAction("google")}
                        /> */}
                    </div>
                </div>
                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        {variant === "LOGIN"
                            ? "New to Messenger?"
                            : "Already have an account?"}
                    </div>
                    <div
                        onClick={toggleVariant}
                        className="underline cursor-pointer"
                    >
                        {variant === "LOGIN" ? "Create an account" : "Login"}
                    </div>
                </div>
            </div>
        </div>
    );
}
