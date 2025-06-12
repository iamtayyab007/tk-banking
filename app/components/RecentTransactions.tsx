import Link from "next/link";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from "./BankTabItem";
import BankInfo from "./BankInfo";
import TransactionsTable from "./TransactionsTable";
import { Pagination } from "./Pagination";

function RecentTransactions({
  accounts,
  transactions = [],
  appwriteItemId,
  page = 1,
}: RecentTransactionsProps) {
  const rowsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);
  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  return (
    <section className="flex w-full flex-col gap-6">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl md:text-xl font-semibold text-gray-900">
          Recent Transactions
        </h2>
        <Link
          href={`/transaction-history/?id=${appwriteItemId}`}
          className="text-xl rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700"
        >
          View All
        </Link>
      </header>

      <Tabs defaultValue={appwriteItemId} className="w-full">
        <TabsList className="custom-scrollbar mb-8 flex w-full flex-nowrap">
          {accounts.map((account: Account) => (
            <TabsTrigger key={account.id} value={account.appwriteItemId}>
              <BankTabItem
                key={account.id}
                account={account}
                appwriteItemId={appwriteItemId}
              />
            </TabsTrigger>
          ))}
        </TabsList>
        {accounts.map((account) => (
          <TabsContent
            value={account.appwriteItemId}
            key={account.id}
            className="space-y-4"
          >
            <BankInfo
              account={account}
              appwriteItemId={appwriteItemId}
              type="full"
            />
            <TransactionsTable transactions={currentTransactions} />
            {totalPages > 1 && (
              <div className="my-4 w-full">
                {" "}
                <Pagination totalPages={totalPages} page={page} />
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

export default RecentTransactions;
