import HeaderBox from "@/app/components/HeaderBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

export default async function TransactionHistory({
  searchParams: { id, page },
}: SearchParamProps) {
  const currentPage = Number((page as string) || 1);
  const loggedIn = await getLoggedInUser();

  const accounts = await getAccounts({ userId: loggedIn.$id });

  if (!accounts) return;
  const accountData = accounts?.data;

  const appwriteItemId = (id as string) || accountData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  return (
    <div className="flex max-h-screen w-full flex-col gap-8 overflow-y-scroll bg-gray-25 p-8 xl:py-12">
      <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row">
        <HeaderBox
          title="Transaction History"
          subtext="see your bank details and transactions."
        />
      </div>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 rounded-lg border-y bg-blue-600 px-4 py-5 md:flex-row">
          <div className="flex flex-col gap-2">
            <h2>{account?.data.name}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
