"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function NavbarItem({
  title,
  param,
}: {
  title: string;
  param: string;
}) {
    const params=useParams();
    const genre= params.genre;
    const isActive=genre===param;
  return <Link href={`/top/${param}`} className={`mx-4 hover:text-amber-600 font-semibold p-2 ${isActive ? "underline underline-offset-8 decoration-4  decoration-amber-500 rounded-lg" : ""}`}>{title}</Link>;
}
