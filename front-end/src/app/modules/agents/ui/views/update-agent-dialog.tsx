"use client";

import React from "react";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "@/app/modules/agents/ui/views/agent-form";
import { AgentGetOne } from "../../types";

interface UpdateAgentsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues: AgentGetOne; 
}

export const UpdateAgentsDialog: React.FC<UpdateAgentsDialogProps> = ({
    open,
    onOpenChange,
    initialValues
}) => {
    return (
        <ResponsiveDialog
            title="Edit Agent"
            description="Edit the agent details below."
            open={open}
            onOpenChange={onOpenChange}
        >
            <AgentForm
                onSuccess={() => onOpenChange(false)}
                onError={() => onOpenChange(false)}
                initialValues={initialValues}
            />
        </ResponsiveDialog>
    );
};
