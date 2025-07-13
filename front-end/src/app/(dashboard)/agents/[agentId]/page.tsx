import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { trpc } from "@/trpc/server";
import { AgentIdView, AgentIdViewError, AgentIdViewLoading } from "@/app/modules/agents/ui/views/agent-id-view";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
    params: { agentId: string }
}

export default async function Page({ params }: Props) {
    const { agentId } = await params;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(trpc.agents.getOne.queryOptions({ id: agentId }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentIdViewLoading/>}>
                <ErrorBoundary fallback={<AgentIdViewError/>}>
                    <AgentIdView agentId={agentId} />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}
