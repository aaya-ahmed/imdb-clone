import Loading from "@/app/components/loading/loading";
import Result from "@/app/components/result/result";
import { Suspense } from "react";

async function getData(key: string) {
  const API_KEY = process.env.API_KEY;
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${key}&language=en-US&page=1&include_adult=false`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}
export default async function page({
  params,
}: {
  params: Promise<{ searchkey: string }>;
}) {
  const param = (await params).searchkey;
  const data = await getData(param);
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Result data={data} />
      </Suspense>
    </>
  );
}
