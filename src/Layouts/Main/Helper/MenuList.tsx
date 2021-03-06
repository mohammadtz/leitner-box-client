import React from "react";
import { RenderMessage } from "../../../Localization/RenderMessage";
import { Box } from "../../../Pages/Box/Box";
import { CreatedCard } from "../../../Pages/Card/CreatedCard";
import { HistoryList } from "../../../Pages/Card/HistoryList";
import { Home } from "../../../Pages";
import { removeStore } from "../../../Helper";
import { BrowseCard } from "../../../Pages/BrowseCard/BrowseCard";
import { CardList } from "../../../Pages/Card/CardList";
import { Reports } from "../../../Pages/Card/Reports";

export const MenuList = [
  {
    key: 1,
    path: "/main/box",
    text: RenderMessage().main.menu.boxes,
    componets: () => <Box />,
    isActice: false,
  },
  {
    key: 2,
    path: "/main/box/:num",
    componets: () => <BrowseCard />,
    isActice: false,
    notShowMenu: true,
  },
  {
    key: 3,
    path: "/main/createcard",
    text: RenderMessage().main.menu.create_card,
    componets: () => <CreatedCard />,
    isActice: false,
  },
  {
    key: 4,
    path: "/main/cardList",
    text: RenderMessage().main.menu.card_list,
    componets: () => <CardList />,
    isActice: false,
  },
  {
    key: 5,
    path: "/main/historyList",
    text: RenderMessage().main.menu.card_history,
    componets: () => <HistoryList />,
    isActice: false,
  },
  {
    key: 6,
    path: "/main/reports",
    text: RenderMessage().main.menu.reports,
    componets: () => <Reports />,
    isActice: false,
  },
  {
    key: 7,
    path: "/home",
    text: RenderMessage().main.menu.exit,
    componets: () => <Home />,
    onClick: () => {
      removeStore("user");
      removeStore("count");
    },
    isActice: false,
  },
];
