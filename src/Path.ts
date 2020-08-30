import { RouteType } from "./Layouts/Landing/Header/Header";
import { RenderMessage } from "./Localization/RenderMessage";

export const Path: RouteType = [
  {
    text: RenderMessage().path.home,
    src: "/",
    key: "Home",
  },
  {
    text: RenderMessage().path.about,
    src: "/about",
    key: "About",
  },
];
