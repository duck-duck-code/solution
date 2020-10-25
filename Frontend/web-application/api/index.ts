import Controller from "./controllers/Controller";
import AccountController from "./controllers/AccountController";
import SearchController from "./controllers/SearchController";
import HistoryController from "./controllers/HistoryController";
import FavouritesController from "./controllers/FavouritesController";

export const baseUrl = "https://duck-duck-code.herokuapp.com";

export const api = {
  controller: new Controller(),
  accountController: new AccountController(),
  searchController: new SearchController(),
  historyController: new HistoryController(),
  favouriteController: new FavouritesController(),
};
