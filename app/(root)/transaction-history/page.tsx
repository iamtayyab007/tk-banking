import HeaderBox from "@/app/components/HeaderBox";
import { Pagination } from "@/app/components/Pagination";
import TransactionsTable from "@/app/components/TransactionsTable";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { formatAmount } from "@/lib/utils";
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

  const rowsPerPage = 10;
  const totalPages = Math.ceil(account?.transactions.length / rowsPerPage);
  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
  const currentTransactions = account?.transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

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
            <h2 className="text-xl font-bold text-white">
              {account?.data.name}
            </h2>
            <p className="text-xl text-blue-100">
              {account?.data.officialName}
            </p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              **** **** **** {account?.data.mask}
            </p>
          </div>
          <div className="flex-center flex-col  gap-2 rounded-md bg-blue-500 px-4 py-2 text-white">
            <p className="text-lg">Current Balance</p>
            <p className="text-xl font-bold text-center">
              {formatAmount(account?.data.currentBalance)}
            </p>
          </div>
        </div>
        <section className="flex w-full flex-col gap-6">
          <TransactionsTable transactions={currentTransactions} />
          {totalPages > 1 && (
            <div className="my-4 w-full">
              {" "}
              <Pagination totalPages={totalPages} page={currentPage} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
