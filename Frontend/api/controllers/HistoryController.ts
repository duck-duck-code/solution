import Controller from "./Controller";

export default class HistoryController extends Controller {
  async getShortHistory(): Promise<void> {
    await this.get(`/api/short_history?ident=hash`);
  }

  async getFullHistory(): Promise<void> {
    await this.get(`/api/full_history?ident=hash`);
  }
}
