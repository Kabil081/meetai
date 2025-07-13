import { ResponsiveDialog } from "@/components/responsive-dialog"
import { on } from "events";
import { Agent } from "http";
interface Props{
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
import { AgentForm } from "@/app/modules/agents/ui/views/agent-form";
export const NewAgentsDialog = ({open,onOpenChange}:Props) => {
    return(
        <ResponsiveDialog
            title="New Agent"
            description="Create a new agent to automate tasks and workflows."
            open={open}
            onOpenChange={onOpenChange}
        >
            <AgentForm onSuccess={()=>onOpenChange(false)} onError={()=>onOpenChange(false)}/>
        </ResponsiveDialog>
    )
}