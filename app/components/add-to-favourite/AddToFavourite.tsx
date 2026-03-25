"use client";
import { FavData } from "@/app/lib/actions/fav";
import { movie } from "@/app/model/movie";
import { useMemo, useState } from "react";

export default function AddToFavourite({ data }: { data: movie }) {
    const [isFav,setIsFav]=useState(false);
    useMemo( ()=>{
      (async()=>{
        const favs = await fetch("/api/user/favourites", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
      });
      const favsData = await favs.json();
        if(favsData.some((fav: FavData) => fav.movieId === data.id)){
            setIsFav(true);
        }else{
            setIsFav(false);
        }
      })()
    },[data.id])
  const addToFavourite = async () => {
    await fetch("/api/user/favourites", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieId: data.id,
        title: data.title,
        overview: data.overview,
        releaseDate: data.release_date,
        voteCount: data.vote_count,
        image: data.poster_path,
      }),
    });
  };
    const removeFavourite = async () => {
    await fetch(`/api/user/favourites/${data.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });
  };
  return (
    <button
      onClick={isFav?removeFavourite:addToFavourite}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
    >
      {isFav ? "Remove from Favourite" : "Add to Favourite"}
    </button>
  );
}
