import React, { FormEvent } from "react";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldPath, Form } from "react-hook-form";
import { z } from "zod";
import { authFormSchema } from "@/lib/utils";
const formSchema = authFormSchema("sign-up");
interface customInput {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  placeholder: string;
  label: string;
  type: string;
}

export default function CustomFormUi({
  control,
  placeholder,
  type,
  name,
  label,
}: customInput) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-1.5">
          <FormLabel className="text-lg w-full max-w-[280px] font-medium text-gray-700">
            {label}
          </FormLabel>

          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                type={type}
                placeholder={placeholder}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-sm text-red-500 mt-2" />
          </div>
        </div>
      )}
    />
  );
}
