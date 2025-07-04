import { AlertCircleIcon } from "lucide-react";
interface Props{
    title: string;
    description?: string;
}
export const ErrorState = ({ title, description }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center h-full rounded-lg bg-background shadow-sm p-6">
            <AlertCircleIcon className=" h-8 w-8 text-red-500 mb-4" />
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            {description && <p className="text-sm text-gray-600 mt-2">{description}</p>}
        </div>
    );
};