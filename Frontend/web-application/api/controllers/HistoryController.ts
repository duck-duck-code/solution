import Controller from "./Controller";
import { baseUrl } from "..";

export default class HistoryController extends Controller {
  async getShortHistory(id: string): Promise<[string]> {
    const res = await this.get(`${baseUrl}/api/short_history?ident=${id}`);

    return res as [string];
  }

  async getFullHistory(id: string): Promise<[string]> {
    const res = await this.get(`${baseUrl}/api/full_history?ident=${id}`);

    return res as [string];
  }
}
