import Loading from "@/app/components/loading/loading";
import Navbar from "@/app/components/navbar/navbar";
import Result from "@/app/components/result/result";
import { Suspense } from "react";

async function getData(genre: string) {
  const API_KEY = process.env.API_KEY;
  const res = await fetch(
    `https://api.themoviedb.org/3/${genre === "top_rated" ? "movie/top_rated" : "trending/all/week"}?api_key=${API_KEY}&language=en-US&page=1`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}
export default async function page({
  params,
}: {
  params: Promise<{ genre: string }>;
}) {
  const param = (await params).genre;
  const data = await getData(param);
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Result data={data} />
      </Suspense>
    </>
  );
}
