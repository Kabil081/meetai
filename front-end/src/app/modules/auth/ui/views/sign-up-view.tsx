'use client'
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Link from "next/link";
import { OctagonAlertIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import UseForm, { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Alert,AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGithub,FaGoogle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
const formschema=z.object({
    name:z.string().min(1,{message:"Name cannot be empty"}),
    email:z.string().email(),
    password:z.string().min(8,{message:"Password must contains 8 characters"}),
    confirmPassword:z.string().min(8,{message:"Password must contains 8 characters"})
}).refine((data)=>data.password===data.confirmPassword,{
    message:"Passwords don't match",
    path:["confirmPassword"]
})
const SignUpView=()=>{
    const form=useForm<z.infer<typeof formschema>>({
        resolver:zodResolver(formschema),
        defaultValues:{
            name:"",
            email:"",
            password:"",
            confirmPassword:""
        }
    })
    const [error,setError]=useState<string|null>(null);
    const [pending,setPending]=useState(false);
    const Router=useRouter();
    const onSubmit=(data:z.infer<typeof formschema>)=>{
        setError(null);
        setPending(true);
        authClient.signUp.email(
            {
                name:data.name,
                email:data.email,
                password:data.password,
            },
            {
                onSuccess:()=>{
                    setPending(false);
                    Router.push("/");
                },
                onError:({error})=>{
                    setError(error.message);
                }
            }
        )
    }
    const onSocial=(provider: "google" | "github")=>{
        setError(null);
        setPending(true);
        authClient.signIn.social(
            {
                provider:provider,
                callbackURL:"/",
            },
            {
                onSuccess:()=>{
                    setPending(false);
                },
                onError:({error})=>{
                    setError(error.message);
                }
            }
        )
    }
    return(
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">Let's Get Started </h1>
                                    <p className="text-muted-foreground text-balance">Create Your Account</p>
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                    control={form.control}
                                    name="name"
                                    render={({field})=>(
                                        <FormItem >
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                type="name"
                                                placeholder="Kabil R S"
                                                {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field})=>(
                                        <FormItem >
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                type="email"
                                                placeholder="kabil@example.com"
                                                {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field})=>(
                                        <FormItem >
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                type="password"
                                                placeholder="********"
                                                {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({field})=>(
                                        <FormItem >
                                            <FormLabel>ConfirmPassword</FormLabel>
                                            <FormControl>
                                                <Input
                                                type="confirmPassword"
                                                placeholder="********"
                                                {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                    />
                                </div>
                                {error && (
                                    <Alert className="bg-destructive/10 border-none">
                                        <OctagonAlertIcon className="h-4 w-4 !text-destructive"/>
                                        <AlertTitle>{error}</AlertTitle>
                                    </Alert>
                                )}
                                <Button disabled={pending} type="submit" className="w-full cursor-pointer">
                                    Sign Up
                                </Button>
                                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                                        Or continue with
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Button disabled={pending} type="button"className="w-full cursor-pointer" variant="outline"
                                         onClick={()=>{
                                            onSocial("google")
                                        }}
                                    >
                                        <FaGoogle className="h-4 w-4 mr-2"/>
                                        Google
                                    </Button>
                                    <Button disabled={pending} type="button" className="w-full cursor-pointer" variant="outline"
                                        onClick={()=>{
                                            onSocial("github")
                                        }}
                                    >
                                        <FaGithub className="h-4 w-4 mr-2"/>
                                        GitHub
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Already Have an Account?{" "}
                                    {!pending && <Link href="/login" className="underline underline-offset-4">Login</Link>}
                                </div>
                            </div>
                        </form>
                    </Form>
                    <div className="relative bg-radial from-green-700 to-green-900 md:flex flex-col items-center justify-center hidden">
                        <img src={'/logo.svg'} alt="Image" className="h-[92px] w-[92px]"/>
                        <p className="text-2xl font-semibold text-white">Meet.AI</p>
                    </div>
                </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By Clicking Continue, you agree to our <a href="#">Terms Of Service</a> and <a href="#">Privacy Policy</a>
            </div>
        </div>
    );
}
export default SignUpView;