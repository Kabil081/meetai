import SignInView from "../../modules/auth/ui/views/sign-in-view";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
export default async function Home(){
      const session=await auth.api.getSession({
        headers:await headers(),
      })
      if(!!session){
        redirect("/");
      }
    return <SignInView/>
}