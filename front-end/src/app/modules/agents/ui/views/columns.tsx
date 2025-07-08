"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AgentGetOne } from "../../types"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { CornerDownRightIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { VideoIcon } from "lucide-react"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => {
      const agent = Array.isArray(row.original) ? row.original[0] : row.original;
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-x-2">
            <GeneratedAvatar seed={agent?.name ?? ""} />
            <span className="font-semibold capitalize">{agent.name}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="flex items-center gap-x-2">
              <CornerDownRightIcon className="size-3 text-muted-foreground"/>
              <span className="text-muted-foreground text-sm max-w-[200px] truncate capitalize">{agent.instrcuctions}</span>
            </div>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey:"MeetingCount",
    header:"Meetings",
    cell:({row})=>{
      const agent = Array.isArray(row.original) ? row.original[0] : row.original;
      return(
        <Badge variant="outline" className="flex items-center gap-x-2 [&>svg]:size-4">
          <VideoIcon className="text-blue-700"/>
          5 meetings
        </Badge>
        
      )
    }
  }
]