"use client"
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { use } from "react";
import { json } from "stream/consumers";
import { EmptyState } from "@/components/empty-state";
import { useRouter } from "next/navigation";
import { useMeetingsFilter } from "../hooks/use-meetings-filter";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { DataPagination } from "./data-pagination";
export const MeetingView=()=>{
    const router=useRouter();
        const [Filters,setFilters]=useMeetingsFilter();
        const trpc = useTRPC();
        const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
            ...Filters
        }));
    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4 font-medium">
            <DataTable 
                        columns={columns} 
                        data={data.items} 
                        onRowClick={(row: { id: string }) => router.push(`/agents/${row.id}`)}
                        />
                        <DataPagination
                        page={Filters.page}
                        totalPages={data.totalPages}
                        onPageChange={(page)=>setFilters({page,search:Filters.search})}  
                          />
            {data.items.length===0 && <EmptyState title="Create Your First Meeting" description="Create Meetings to Join Our Agents will clear your doubts"/>}
        </div>
    )
}
