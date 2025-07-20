import { MeetingView } from "@/app/modules/meetings/ui/meeting-view";
import { MeetingsListHeader } from "@/app/modules/meetings/ui/meetings-list-header";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { auth } from "@/lib/auth";
import { trpc } from "@/trpc/server";
import { getQueryClient } from "@/trpc/server";
import { dehydrate,HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Suspense } from "react";
const Page=async ()=>{
    const queryClient=getQueryClient();
    await queryClient.prefetchQuery(
        trpc.meetings.getMany.queryOptions({})
    )
    const session=await auth.api.getSession({
        headers:await headers(),
      })
      if(!session){
        redirect("/login");
      }
    return(
        <>
            <MeetingsListHeader/>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<LoadingState title="Loading Meetings" description="Wait While we Load Agents"/>}>
                    <ErrorBoundary fallback={<ErrorState title="Can't Load Meetings" description="Try Again"/>}>
                        <MeetingView />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </>
    )
}
export default Page;