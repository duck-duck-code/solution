import Controller from "./Controller";
import { baseUrl } from "..";
import { addFavouriteDto, FavouriteDto } from "../dto/FavouriteDto";

export default class FavouritesController extends Controller {
  async addToFavourites(favDto: addFavouriteDto): Promise<void> {
    await this.post(`${baseUrl}/api/favourites`, favDto);
  }

  async getFavourites(id: string): Promise<[FavouriteDto]> {
    const res = await this.get<[FavouriteDto]>(
      `${baseUrl}/api/favourites?ident=${id}`
    );

    return res;
  }
}
