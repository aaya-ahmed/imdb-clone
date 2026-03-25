import NavbarItem from "../navbar-item/navbar-item";

export default function Navbar() {
  return (
    <div className="flex justify-center bg-navbar-background lg:text-lg p-4">
      <NavbarItem title="Trending" param="trending" />
      <NavbarItem title="Top Rated" param="top_rated" />
    </div>

  )
}
