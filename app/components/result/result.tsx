import Link from "next/link";
import Card from "../card/card";
import { movie } from "@/app/model/movie";

export default function Result({ data }: { data: { results: movie[] } }) {
  return (
    <>
      <div className="flex flex-wrap gap-4 justify-start items-center my-4 p-4 lg:p-0">
        {data.results.map((movie: movie) => {
          return (
            <div key={movie.id}>
              <Link  href={`/movie/${movie.id}`}>
                <Card data={movie} />
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
