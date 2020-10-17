import { observable } from "mobx";
import { createContext } from "react";
import { getStore, ICount } from "./Helper";

class Store {
  @observable CountStore: ICount = getStore("count");
}

export const StoreContext = createContext(new Store());
