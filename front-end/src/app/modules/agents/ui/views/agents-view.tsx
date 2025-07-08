"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Loader from "@/components/loading-state";
import { columns } from "@/app/modules/agents/ui/views/columns";
import { DataTable } from "@/app/modules/agents/ui/views/data-table";
import { AgentGetOne } from "../../types";
import { EmptyState } from "@/components/empty-state";
export const AgentsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());
    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4 font-medium">
            <DataTable columns={columns} data={data} />
            {data.length===0 && <EmptyState title="Create Your First Agent" description="Create Agent to Join Our Meetings.Agents will follow your instructions"/>}
        </div>
    )
    return (
        <div className="p-4">
            <pre className="p-4 bg-muted rounded-md overflow-x-auto whitespace-pre-wrap break-words text-sm">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
};

