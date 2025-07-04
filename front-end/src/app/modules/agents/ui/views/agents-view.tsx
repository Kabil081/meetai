"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { is } from "drizzle-orm";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
export const AgentsView = () => {
    const trpc=useTRPC();
    const {data}=useSuspenseQuery(trpc.agents.getMany.queryOptions());
    /*if(isLoading){
        return <LoadingState title="Loading Agents" description="Please wait while we load the agents." />;
    }   
    if(isError){
        return <ErrorState title="Error Loading Agents" description="There was an error loading the agents. Please try again later." />;
    }
    */
    return(
        <div>
            {JSON.stringify(data)}
        </div>
    )
};
