import React from "react";
import { RenderMessage } from "../../../Localization/RenderMessage";
import { Box } from "../../../Pages/Box/Box";
import { CreatedCard } from "../../../Pages/Card/CreatedCard";
import { CardList } from "../../../Pages/Card/CardList";
import { Account } from "../../../Pages/Account/Account";
import { Home } from "../../../Pages";

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
    path: "/main/createcard",
    text: RenderMessage().main.menu.createCard,
    componets: () => <CreatedCard />,
    isActice: false,
  },
  {
    key: 3,
    path: "/main/cardList",
    text: RenderMessage().main.menu.cardList,
    componets: () => <CardList />,
    isActice: false,
  },
  {
    key: 4,
    path: "/main/account",
    text: RenderMessage().main.menu.account,
    componets: () => <Account />,
    isActice: false,
  },
  {
    key: 5,
    path: "/home",
    text: RenderMessage().main.menu.exit,
    componets: () => <Home />,
    isActice: false,
  },
];
