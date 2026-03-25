import Link from "next/link";
import LightnessModeBtn from "../dark-mode/lightness-mode-btn";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-3">
      <ul className="flex gap-4">
        <li>
          <Show when="signed-out">
            <div className="flex gap-2">
              <SignInButton>
                <button className="bg-amber-500 py-1 px-2 rounded-lg text-sm cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="py-1 px-2  text-sm cursor-pointer hover:bg-orange-300 hover:rounded-lg hover:py-1 hover:px-2">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </Show>
          <Show when="signed-in">
            <UserButton />
            <li className="hidden sm:block hover:bg-orange-300 hover:rounded-lg py-1 px-2">
              <Link href={"/favourites"}>Favourites</Link>
            </li>
          </Show>
        </li>
        <li className="hidden sm:block hover:bg-orange-300 hover:rounded-lg py-1 px-2">
          <Link href={"/"}>Home</Link>
        </li>
        <li className="hidden sm:block hover:bg-orange-300 hover:rounded-lg py-1 px-2">
          <Link href={"/about"}>About</Link>
        </li>
      </ul>
      <div className="flex items-center gap-4">
        <LightnessModeBtn />
        <Link href={"/"} className="flex gap-1 items-center">
          <span className="text-2xl font-bold bg-amber-500 py-1 px-2 rounded-lg">
            IMDb
          </span>
          <span className="text-xl hidden sm:inline">Clone</span>
        </Link>
      </div>
    </div>
  );
}
