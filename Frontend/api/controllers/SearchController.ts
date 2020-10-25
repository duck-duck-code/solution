import Controller from "./controller";
import { SearchDto, SearchResponse } from "../dto/SearchDto";

export default class SearchController extends Controller {
  async search(searchDto: SearchDto): Promise<SearchResponse> {
    const res = await this.post<SearchDto, SearchResponse>(
      `/api/search/categories`,
      searchDto
    );

    return res;
  }
}
