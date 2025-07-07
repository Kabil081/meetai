import { Loader2Icon } from "lucide-react";
interface Props{
    title: string;
    description?: string;
}
export const LoadingState = ({ title, description }: Props) => {
    return(
        <div className="flex flex-col items-center justify-center h-full bg-white shadow-sm p-6 rounded-none">
            <Loader2Icon className="animate-spin h-8 w-8 text-blue-500 mb-4" />
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            {description && <p className="text-sm text-gray-600 mt-2">{description}</p>}
        </div>
    );
};

import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce [animation-delay:-0.6s]"></div>
    </div>
  );
};
export default Loader;
