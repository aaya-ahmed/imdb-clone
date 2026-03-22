import Loading from "@/app/components/loading/loading";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClerkLoading>
        <Loading />
      </ClerkLoading>
      <ClerkLoaded>
        <div className="flex justify-between items-center mx-auto my-3">
          {children}
        </div>
      </ClerkLoaded>
    </>
  );
}
