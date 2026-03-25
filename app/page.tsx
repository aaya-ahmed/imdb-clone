import Result from "./components/result/result";
async function getData() {
  const API_KEY = process.env.API_KEY;
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US&page=1`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}
export default async function Home() {
  const data = await getData();
  return <>
  <Result data={data} />
  </>;
}
