import { useRouter } from "next/navigation";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { MeetingsSchema } from "../server/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormField
} from "@/components/ui/form"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MeetinGetOne } from "../types";
import { useState } from "react";
interface MeetingFormProps{
    onSuccess?: (id?:string) => void;
    onError?: () => void;
    onCancel?: () => void;
    initialValues?: MeetinGetOne;
}
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";
export const MeetingForm = ({ onSuccess, onError,onCancel,initialValues }: MeetingFormProps) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const createMeetingMutation = useMutation(
        trpc.meetings.create.mutationOptions({
            onSuccess: async (data) => {
                queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
                onSuccess?.(data.id);
            },
            onError: () => {
                onError?.();
            }
        })
    );
    const [open,setOpen]=useState("");
    const[agentSearch,setagentSearch]=useState("");
    const agents=useQuery(
        trpc.agents.getMany.queryOptions({pageSize:100,search:agentSearch}),
    )
    const updateMeetingMutation = useMutation(
        trpc.meetings.update.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
                if(initialValues? initialValues[0].id:null) {
                    queryClient.invalidateQueries(
                        trpc.meetings.getOne.queryOptions({ id: initialValues?initialValues[0].id:""})
                    );
                }
                onSuccess?.();
            },
            onError: () => {
                onError?.();
            }
        })
    );

    const form = useForm<z.infer<typeof MeetingsSchema>>({
        resolver: zodResolver(MeetingsSchema),
        defaultValues: {
            name: initialValues? initialValues[0].name :"",
            agentId: initialValues? initialValues[0].agentId : "",
        }
    });
    const isEditMode = !!initialValues? initialValues[0].id:"";
    const isPending = createMeetingMutation.isPending || updateMeetingMutation.isPending;

    const onSubmit = (values: z.infer<typeof MeetingsSchema>) => {
        if (isEditMode) {
            updateMeetingMutation.mutate({
                ...values,
                id: initialValues? initialValues[0].id:""
            });
        } else {
            createMeetingMutation.mutate(values);
        }
    };

    return (
        <Form {...form}>
            <form
                className="space-y-6 bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-lg max-w-3xl w-full mx-auto"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex flex-col items-center mb-4">
                    <span className="text-lg font-semibold text-primary-700 dark:text-primary-300">
                        {form.watch("name") || "New Meeting"}
                    </span>
                </div>

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base font-medium text-zinc-700 dark:text-zinc-200">
                                Meeting Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter Meeting Name"
                                    {...field}
                                    disabled={isPending}
                                    className="rounded-lg border-zinc-300 dark:border-zinc-700 focus:ring-primary-500 w-full text-base"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="agentId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base font-medium text-zinc-700 dark:text-zinc-200">
                                Agent
                            </FormLabel>
                            <CommandSelect
                                options={(agents.data ? agents.data.items : []).map((agent: { id: string; name: string; }) => ({
                                    id: agent.id,
                                    value: agent.id,
                                    children: (
                                        <div className="flex items-center gap-2 rounded-full">
                                            <GeneratedAvatar seed={agent.id} size={32} />
                                            <span>{agent.name}</span>
                                        </div>
                                    )
                                }))}
                                onSelect={field.onChange}
                                onSearch={setagentSearch}
                                value={field.value}
                                placeholder="select an Agent"
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-between gap-y-2">
                    <Button type="button" variant="ghost" disabled={isPending} onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button disabled={isPending} type="submit">
                        {isEditMode ? "Update" : "Create"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
