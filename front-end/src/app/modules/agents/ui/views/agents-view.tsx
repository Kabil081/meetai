"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Loader from "@/components/loading-state";
export const AgentsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());
    return (
        <div className="p-4">
            <pre className="p-4 bg-muted rounded-md overflow-x-auto whitespace-pre-wrap break-words text-sm">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
};
