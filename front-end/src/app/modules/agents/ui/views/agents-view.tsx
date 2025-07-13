"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Loader from "@/components/loading-state";
import { columns } from "@/app/modules/agents/ui/views/columns";
import { DataTable } from "@/app/modules/agents/ui/views/data-table";
import { AgentGetOne } from "../../types";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilter } from "../../hooks/use-agents-filters";
import { Filter } from "lucide-react";
import { Values, ParserBuilder } from "nuqs";
import { DataPagination } from "./data-pagination"
export const AgentsView = () => {
    const [Filters,setFilters]=useAgentsFilter();
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...Filters
    }));
    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4 font-medium">
            <DataTable columns={columns} data={data.items} />
            <DataPagination
            page={Filters.page}
            totalPages={data.totalPages}
            onPageChange={(page)=>setFilters({page,search:Filters.search})}  
              />
            {data.items.length===0 && <EmptyState title="Create Your First Agent" description="Create Agent to Join Our Meetings.Agents will follow your instructions"/>}
        </div>
    )
};

