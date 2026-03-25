import AddToFavourite from "@/app/components/add-to-favourite/AddToFavourite";
import Image from "next/image";
import Link from "next/link";

async function getMovie(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`,
  );
  if (!res.ok) {
    return null;
  }
  return await res.json();
}
export default async function Movie({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let loading = true;
  const data = await getMovie(id);
  loading = false;
  console.log(data)
  if (!data && !loading) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-xl my-5">
          movie details are not avaliable at the moment!
        </h1>
        <p>
          <Link href="/" className="hover:text-amber-500">
            Go back to home
          </Link>
        </p>
      </div>
    );
  }
  return (
    <>
      <div className="w-full">
        <Link href="/" className="text-amber-500 font-semibold text-lg absolute top-[50%] left-0 z-10 bg-text
        bg-opacity-50 p-2 rounded-r-lg hover:bg-opacity-75 transition">
            &larr;
        </Link>
        <div className="p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-7">
          <Image
            src={`https://image.tmdb.org/t/p/original/${data.backdrop_path || data.poster_path}`}
            alt={data.title ?? data.name}
            width={500}
            height={300}
            className="w-full h-auto"
          />
          <div className="p-2">
            <h2 className="text-lg mb-3 font-bold">
              {data.title || data.name}
            </h2>
            <p className="text-lg mb-3">{data.overview}</p>
            <p className="mb-3">
              <span className="font-semibold mr-1">Date Released: </span>
              {data.release_date || data.first_air_date}
            </p>
            <p className="mb-3">
              <span className="font-semibold mr-1">Rating: </span>
              {data.vote_average}👍
            </p>
            
            <AddToFavourite data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
