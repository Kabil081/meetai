import { ResponsiveDialog } from "@/components/responsive-dialog"
interface Props{
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
import { AgentForm } from "@/app/modules/agents/ui/views/agent-form";
import { MeetingForm } from "./meeting-form";
import { useRouter } from "next/navigation";
export const NewMeetingsDialog=({open,onOpenChange}:Props)=>{
    const router=useRouter();
    return(
        <ResponsiveDialog
            title="New Meetings"
            description="Create a new Meeting to be in call with your Agents"
            open={open}
            onOpenChange={onOpenChange}
        >
            <MeetingForm 
            onSuccess={(id)=>{
                onOpenChange(false);
                router.push(`/meetings/${id}`);
            }}
            onCancel={()=>onOpenChange(false)}
            />
        </ResponsiveDialog>
    )
}