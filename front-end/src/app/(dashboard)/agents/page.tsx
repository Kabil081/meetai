import { AgentsView } from "@/app/modules/agents/ui/views/agents-view";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { AgentsListHeader } from "@/app/modules/agents/ui/views/agents-list-header";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { loadParams, useAgentsFilter } from "./params"
import { SearchParams } from "nuqs";
interface Props{
  searchParams:Promise<SearchParams>
}
const Page=async ({searchParams}:Props)=>{
  const session=await auth.api.getSession({
    headers:await headers(),
  })
  const Filters=await loadParams(searchParams);
  if(!session){
    redirect("/login");
  }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({...Filters}));
  const dehydratedState = dehydrate(queryClient);
  return(
    <>
      <AgentsListHeader />
      <HydrationBoundary state={dehydratedState}>
        <Suspense fallback={<LoadingState title="Loading Agents" description="Please wait while we load the Agents." />}>
          <ErrorBoundary fallback={<ErrorState title="Error Loading Agents" description="Try Again Later" />}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
export default Page;
