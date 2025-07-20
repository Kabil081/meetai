"use client"
import { format } from "date-fns";
import humanizeDuration  from "humanize-duration"
import { ColumnDef } from "@tanstack/react-table"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { Badge } from "@/components/ui/badge"
import { VideoIcon } from "lucide-react"
import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  ClockFadingIcon,
  CornerDownRightIcon,
  LoaderIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MeetinGetOne } from "../types"
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<MeetinGetOne>[] = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell: ({ row }) => {
      const meeting = Array.isArray(row.original) ? row.original[0] : row.original;
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-x-2">
            <GeneratedAvatar seed={meeting?.name ?? ""} />
            <span className="font-semibold capitalize">{meeting.name}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="flex items-center gap-x-2">
              <CornerDownRightIcon className="size-3 text-muted-foreground"/>
              <span className="text-muted-foreground text-sm max-w-[200px] truncate capitalize">{meeting.agentId}</span>
            </div>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: "status",
    header: "Status & Duration",
    cell: ({ row }) => {
      const meeting = Array.isArray(row.original) ? row.original[0] : row.original;
      // Status icon logic
      let statusIcon = null;
      let statusColor = "";
      switch (meeting.status) {
        case "completed":
          statusIcon = <CircleCheckIcon className="text-green-600" />;
          statusColor = "text-green-600";
          break;
        case "cancelled":
          statusIcon = <CircleXIcon className="text-red-600" />;
          statusColor = "text-red-600";
          break;
        case "active":
        case "in_progress":
          statusIcon = <LoaderIcon className="animate-spin text-blue-600" />;
          statusColor = "text-blue-600";
          break;
        case "upcoming":
        default:
          statusIcon = <ClockArrowUpIcon className="text-muted-foreground" />;
          statusColor = "text-muted-foreground";
      }
      // Duration logic
      let durationBox = null;
      if (!meeting.startedAt) {
        durationBox = (
          <div className="flex items-center gap-x-2">
            <ClockFadingIcon className="text-muted-foreground" />
            <span className="text-muted-foreground">No duration</span>
            <button className="ml-2 px-2 py-1 bg-blue-600 text-white rounded text-xs">Get Started</button>
          </div>
        );
      } else if (meeting.startedAt && meeting.endedAt) {
        // Calculate duration in ms
        const durationMs = new Date(meeting.endedAt).getTime() - new Date(meeting.startedAt).getTime();
        let durationStr = "";
        try {
          durationStr = humanizeDuration(durationMs, { largest: 2, round: true });
        } catch {
          durationStr = `${Math.round(durationMs / 60000)} min`;
        }
        durationBox = (
          <div className="flex items-center gap-x-2">
            <ClockFadingIcon className="text-blue-600" />
            <span className="text-blue-600">{durationStr}</span>
          </div>
        );
      } else {
        durationBox = (
          <div className="flex items-center gap-x-2">
            <ClockFadingIcon className="text-yellow-600" />
            <span className="text-yellow-600">Ongoing</span>
          </div>
        );
      }
      return (
        <div className="flex flex-col gap-y-1">
          <div className={cn("flex items-center gap-x-2 font-medium", statusColor)}>
            {statusIcon}
            <span className="capitalize">{meeting.status}</span>
          </div>
          {durationBox}
        </div>
      );
    },
  },
]