import Controller from "./Controller";
import { SearchDto, SearchResponse } from "../dto/SearchDto";
import { baseUrl } from "..";

export default class SearchController extends Controller {
  async search(searchDto: SearchDto): Promise<SearchResponse> {
    const res = await this.post<SearchDto, SearchResponse>(
      `${baseUrl}/api/search/categories`,
      searchDto
    );

    return res;
  }
}
