import { AgentGetOne } from "../../types";
import { useRouter } from "next/navigation";
import { queryOptions, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AgentSchema } from "../../server/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GeneratedAvatar } from "@/components/generated-avatar";
import {
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormField
} from "@/components/ui/form"; 
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loading-state";

interface AgentFormProps {
    onSuccess?: () => void;
    onError?: () => void;
    initialValues?: AgentGetOne; 
}

export const AgentForm = ({ onSuccess, onError, initialValues }: AgentFormProps) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const createAgentMutation = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
                onSuccess?.();
            },
            onError: () => {
                onError?.();
            }
        })
    );

    const updateAgentMutation = useMutation(
        trpc.agents.update.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
                if (initialValues?.id) {
                    queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({ id: initialValues.id })
                    );
                }
                onSuccess?.();
            },
            onError: () => {
                onError?.();
            }
        })
    );

    const form = useForm<z.infer<typeof AgentSchema>>({
        resolver: zodResolver(AgentSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            instruction: initialValues?.instrcuctions ?? "",
        }
    });
    const isEditMode = !!initialValues?.id;
    const isPending = createAgentMutation.isPending || updateAgentMutation.isPending;

    const onSubmit = (values: z.infer<typeof AgentSchema>) => {
        if (isEditMode) {
            updateAgentMutation.mutate({
                ...values,
                id: initialValues.id
            });
        } else {
            createAgentMutation.mutate(values);
        }
    };

    const onCancel = () => {
        form.reset();
    };

    return (
        <Form {...form}>
            <form
                className="space-y-6 bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-lg max-w-3xl w-full mx-auto"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex flex-col items-center mb-4">
                    <GeneratedAvatar seed={form.watch("name")} />
                    <span className="text-lg font-semibold text-primary-700 dark:text-primary-300">
                        {form.watch("name") || "New Agent"}
                    </span>
                </div>

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base font-medium text-zinc-700 dark:text-zinc-200">
                                Agent Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter Agent Name"
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
                    name="instruction"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base font-medium text-zinc-700 dark:text-zinc-200">
                                Instructions
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter Instructions"
                                    {...field}
                                    disabled={isPending}
                                    className="rounded-lg border-zinc-300 dark:border-zinc-700 focus:ring-primary-500 w-full text-base min-h-[120px]"
                                />
                            </FormControl>
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
                    {isPending && <Loader />}
                </div>
            </form>
        </Form>
    );
};
