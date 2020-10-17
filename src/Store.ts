import { observable } from "mobx";
import { createContext } from "react";
import { getStore, ICount } from "./Helper";

class Store {
  @observable CountStore: ICount = getStore("count") || {box1:0,box2:0,box3:0,box4:0,box5:0};
}

export const StoreContext = createContext(new Store());
