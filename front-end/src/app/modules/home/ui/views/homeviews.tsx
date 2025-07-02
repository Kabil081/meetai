'use client'
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
const HomeView = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    if(!session){
        return <p>Loading...</p>
    }
    return (
        <div className="flex flex-col p-4 gap-y-4">
            <p>Logged In As {session.user?.name}</p>
            <Button onClick={() => authClient.signOut({
                fetchOptions:{
                    onSuccess:()=>{
                        router.push("/login");
                    }
                }
            })}>Sign Out</Button>
        </div>
    );
};
export default HomeView;
