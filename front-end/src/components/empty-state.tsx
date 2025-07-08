import Image from "next/image";
interface Props{
    title: string;
    description?: string;
}
export const EmptyState = ({ title, description }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center h-full rounded-lg bg-background shadow-sm p-6">
            <Image src="./empty.svg" alt="Image" width={240} height={240}/>
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            {description && <p className="text-sm text-gray-600 mt-2">{description}</p>}
        </div>
    );
};