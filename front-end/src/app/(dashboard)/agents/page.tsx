import { AgentsView } from "@/app/modules/agents/ui/views/agents-view";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { AgentsListHeader } from "@/app/modules/agents/ui/views/agents-list-header";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "@/components/loading-state";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
export default async function Page(){
  const session=await auth.api.getSession({
    headers:await headers(),
  })
  if(!session){
    redirect("/login");
  }
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
  const dehydratedState = dehydrate(queryClient);
  return(
    <>
      <AgentsListHeader />
      <HydrationBoundary state={dehydratedState}>
        <Suspense fallback={<><LoadingState title="Loading Agents" description="Please wait while we load the Agents." />  <Loader/></>}>
          <ErrorBoundary fallback={<ErrorState title="Error Loading Agents" description="Try Again Later" />}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
}

