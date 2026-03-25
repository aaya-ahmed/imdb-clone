"use client";

import { useRouter } from "next/navigation";

export default function Search() {
    const {push}=useRouter();   
    function getData(query:string){
        if(!query&&window.location.pathname.includes("/search")) push("/");
        else if (query)push(`/search/${query}`);
    }
  return (
    <div className="px-4 py-1 lg:p-0 mt-1">
      <input
        type="text"
        placeholder="Search for movies..."
        onBlur={(e) => getData(e.currentTarget.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
    </div>
  )
}
