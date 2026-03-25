import Loading from "@/app/components/loading/loading";
import Result from "@/app/components/result/result";
import { Suspense } from "react";

async function getData() {
  const res = await fetch(`/api/user/favourites`,{
    method:"GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    return [];
  }
  const data = await res.json();
  return data;
}
export default async function page() {
  const data = await getData();
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Result data={data} />
      </Suspense>
    </>
  );
}
