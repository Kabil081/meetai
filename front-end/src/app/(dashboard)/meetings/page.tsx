import { MeetingView } from "@/app/modules/meetings/ui/meeting-view";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { trpc } from "@/trpc/server";
import { getQueryClient } from "@/trpc/server";
import { dehydrate,HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
const Page=async ()=>{
    const queryClient=getQueryClient();
    await queryClient.prefetchQuery(
        trpc.meetings.getMany.queryOptions({})
    )
    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<LoadingState title="Loading Meetings" description="Wait While we Load Agents"/>}>
                <ErrorBoundary errorComponent={() => <ErrorState title="Can't Load Meetings" description="Try Again"/>}>
                    <MeetingView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>

    )
}
export default Page;