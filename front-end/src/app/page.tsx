import HomeView from "./modules/home/ui/views/homeviews"
import { Auth } from "better-auth"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
const Page=async ()=>{
  const session=await auth.api.getSession({
    headers:await headers(),
  })
  if(!session){
    redirect("/login");
  }
  return (
    <HomeView/>
  )
}
export default Page;

