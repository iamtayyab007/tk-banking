"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Copy = ({ title }: { title: string }) => {
  const [hasCopied, setHasCopied] = useState(false);
  console.log({ title });
  const copyToClipboard = () => {
    navigator.clipboard.writeText(title);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <Button
      className="mt-3 flex w-full max-w-md items-center gap-4 px-4 py-2 cursor-pointer"
      variant="secondary"
      onClick={copyToClipboard}
    >
      <p className="truncate text-sm font-medium text-black w-full">{title}</p>

      {!hasCopied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5 text-black"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5 text-green-600"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </Button>
  );
};

export default Copy;
