import Controller from "./Controller";
import { baseUrl } from "..";

export default class HistoryController extends Controller {
  async getShortHistory(id: string): Promise<void> {
    await this.get(`${baseUrl}/api/short_history?ident=${id}`);
  }

  async getFullHistory(id: string): Promise<void> {
    await this.get(`${baseUrl}/api/full_history?ident=${id}`);
  }
}
