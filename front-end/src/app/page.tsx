'use client'
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
export default function Home(){
  const [email,setEmail]=useState("");
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const {data:session}=authClient.useSession();
  const onSubmit=()=>{
    authClient.signUp.email({
        email,
        name,
        password, 
    }, {
        onSuccess: (ctx) => {
          window.alert("success");
        },
        onError: (ctx) => {
            alert(ctx.error.message);
        },
    });
  }
  const onLogin=()=>{
    authClient.signIn.email({
        email,
        password
    }, {
        onSuccess: (ctx) => {
          window.alert("success");
        },
        onError: (ctx) => {
            alert(ctx.error.message);
        },
    });
  }
  if(session){
    return(
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged In As {session.user.name}</p>
        <Button onClick={()=>authClient.signOut()}>Sign Out</Button>
      </div>
    )
  }
  return(
    <div className="p-4 flex flex-col gap-y-10">
      <div className="p-4 flex flex-col gap-y-4">
        <Input placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
        <Input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <Input placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <Button onClick={onSubmit}>Sign Up</Button>
      </div>
      <div className="p-4 flex flex-col gap-y-4">
        <Input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <Input placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <Button onClick={onLogin}>Sign In</Button>
      </div>
    </div>
  );
}
