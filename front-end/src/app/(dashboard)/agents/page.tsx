import { AgentsView } from "@/app/modules/agents/ui/views/agents-view";
import { LoadingState } from "@/components/loading-state";
import {trpc,getQueryClient} from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { ErrorState } from "@/components/error-state";
const Page=()=>{
    const queryClient=getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<LoadingState title="Loading Agents" description="Please wait while we load the Agents."/>}>
                <ErrorBoundary fallback={<ErrorState title="Error Loading Agents" description="Try Again Later"/>}>
                    <AgentsView/>
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}
export default Page;