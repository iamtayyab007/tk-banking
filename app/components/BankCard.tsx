import { formatAmount } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Copy from "./Copy";
export default function BankCard({
  account,
  userName,
  showBalance = true,
}: CreditCardProps) {
  return (
    <div className="flex flex-col">
      <Link
        href={`/transaction-history/?id=${account.appwriteItemId}`}
        className="relative flex h-[190px] w-full justify-between rounded-[20px] border border-white bg-bank-gradient shadow-creditCard backdrop-blur-[6px] min-w-[325px]"
      >
        <div className="relative z-10 flex size-full max-w-[228px] flex-col justify-between rounded-l-[20px] bg-blue-500 bg-bank-gradient px-5 pb-4 pt-5">
          <div>
            <h1 className="text-xl font-semibold text-white">
              {account.name || userName}
            </h1>
            <p className="font-black text-white">
              {formatAmount(account.currentBalance)}
            </p>
          </div>
          <article className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="text-sm font-semibold text-white">{userName}</h1>
              <h2 className="text-12 font-semibold text-white">** / **</h2>
            </div>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              **** **** **** <span className="text-16">{account?.mask}</span>
            </p>
          </article>
        </div>

        <div className="flex size-full flex-1 flex-col items-end justify-between rounded-r-[20px] bg-blue-300 bg-cover bg-center bg-no-repeat py-5 pr-5">
          <Image src="/icons/Paypass.svg" width={20} height={24} alt="pay" />
          <Image
            src="/icons/mastercard.svg"
            width={45}
            height={32}
            alt="mastercard"
            className="ml-5"
          />
        </div>
        <Image
          src="/icons/lines.png"
          width={316}
          height={190}
          alt="lines"
          className="absolute top-0 left-0"
        />
      </Link>
      {showBalance && <Copy title={account?.sharaebleId} />}
    </div>
  );
}
