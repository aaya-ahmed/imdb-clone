import { movie } from "@/app/model/movie";
import Image from "next/image";

export default function Card({ data }: { data: movie }) {
  return (
    <div className="rounded-lg shadow-card pb-3 sm:w-full md:w-62.5 lg:w-75 min-h-87.5 flex flex-col justify-between">
      <Image
        src={`https://image.tmdb.org/t/p/original/${data.backdrop_path || data.poster_path}`}
        alt={data.title??data.name??'Movie Poster'}
        width={500}
        height={300}
        className="rounded-tl-lg rounded-tr-lg sm:w-full md:w-62.5 lg:w-75"
        placeholder="blur"
        blurDataURL="./next.svg"
      />
      <p className="line-clamp-3 px-2" >{data.overview}</p>
      <h2 className="text-lg font-semibold mt-2 px-2 truncate">{data.title}</h2>
      <div className="flex justify-between items-center px-2">
        <span>{data.release_date}</span>
        <span>👍{data.vote_average}</span>
      </div>
    </div>
  );
}
