/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "../model/user";
import dbConnect from "../mongodb/mongodb";
export type FavData = {
  movieId: string;
  title: string;
  overview: string;
  releaseDate: string;
  voteCount: number;
  image: string;
};
export const AddToFavourite = async (data: FavData,existingUser:any) => {
  try {
    await dbConnect();
    let updatedUser;
    if (
      existingUser.favs?.some((fav: any) => fav.movieId === data.movieId)
    ) {
      updatedUser = await User.findByIdAndUpdate(
        existingUser.userMongoId,
        { $pull: { favs: { movieId: data.movieId } } },
        { new: true },
      );
    } else {
      existingUser.favs = [...(existingUser.favs || []), data];
      updatedUser = await User.findByIdAndUpdate(
        existingUser.userMongoId,
        { $addToSet: { favs: data } },
        { new: true },
      );
    }
    const updatedfavs = updatedUser.favs.map(
      (fav: any) => fav.movieId,
    );
    return updatedfavs;
  } catch (error: any) {
    console.error("Fav error1:", error);
    throw error;
  }
};

export const deleteFavourite = async (movieId: string,existingUser:any) => {
  try {
    await dbConnect();
    if (existingUser.favs?.some((fav: any) => fav.movieId === movieId)) {
      const updatedUser = await User.findByIdAndDelete(
        existingUser.userMongoId,
        { $pop: { favs: { movieId: movieId } } },
      );
      const updatedfavs = updatedUser.favs.map(
        (fav: any) => fav.movieId,
      );
      return updatedfavs;
    }
    return existingUser.favs.map((fav: any) => fav.movieId);
  } catch (error: any) {
    throw error;
  }
};
