import { Icons } from "@/components/utils/Icons";
import {
  Book,
  CakeSlice,
  Cat,
  Church,
  Clapperboard,
  Component,
  Cpu,
  Flame,
  FlaskConical,
  Gamepad2,
  HelpCircle,
  LineChart,
  MonitorPlay,
  Music,
  Newspaper,
  Palette,
  PanelTop,
  Plane,
  Scale,
  ScrollText,
  Sparkles,
  Tv,
  User,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";
import Image from "next/image";

export const SideBarFirstLinks = [
  {
    Icon: (
      <Image
        sizes="100vw"
        src={"/ImageIcons/history.png"}
        width="0"
        height="0"
        className="w-6 h-6"
      />
    ),
    label: "History",
    link: "/e/popular",
  },
  {
    Icon: (
      <Image
        sizes="100vw"
        src={"/ImageIcons/bookmark.png"}
        width="0"
        height="0"
        className="w-6 h-6"
      />
    ),
    label: "Saved",
    link: "/saved",
  },

  {
    Icon: (
      <Image
        sizes="100vw"
        src={"/ImageIcons/pageIcon.png"}
        width="0"
        height="0"
        className="w-6 h-6"
      />
    ),
    label: "Pages",
    link: "/e/pages/feed",
  },
];

export const SideBarSecondLinks = [
  {
    Icon: <Icons.Home className="w-6 h-6 dark:fill-neutral-50" />,
    label: "Home",
    link: "/",
  },
  {
    Icon: (
      <Image
        sizes="100vw"
        src={"/ImageIcons/trend.png"}
        width="0"
        height="0"
        className="w-6 h-6"
      />
    ),
    label: "Popular",
    link: "/e/popular",
  },
];

export const AnotherLinks = [
  {
    Icon: <Flame className="mr-4 w-6 h-6 fill-white" />,
    label: "Best Posts",
    link: "/explore/personal",
  },
  {
    Icon: (
      <Icons.Group className="mr-4 w-6 h-6 fill-neutral-600 dark:fill-white" />
    ),
    label: "Communities",
    link: "/communities",
  },
  {
    Icon: <MonitorPlay className="mr-4 w-6 h-6 " />,
    label: "Watch Videos",
    link: "/explore/personal",
  },
];

export const SideBarExploreLinks = [
  {
    Icon: <Cat className="mr-4  h-6" />,
    label: "Internet Culture",
    link: "/explore/personal",
  },
  {
    Icon: <Gamepad2 className="mr-4  h-6 " />,
    label: "Games",
    link: "/explore/personal",
  },
  {
    Icon: <Music className="mr-4  h-6" />,
    label: "Music",
    link: "/explore/personal",
  },
  {
    Icon: <Sparkles className="mr-4  h-6" />,
    label: "Pop culture",
    link: "/explore/personal",
  },
  {
    Icon: <User className="mr-4  h-6" />,
    label: "Personal",
    link: "/explore/personal",
  },
  {
    Icon: <Newspaper className="mr-4  h-5" />,
    label: "News & Politics",
    link: "/explore/personal",
  },
  {
    Icon: <Icons.Anime className="w-6 h-6 dark:fill-neutral-50 mr-3" />,
    label: "Anime",
    link: "/explore/personal",
  },
  {
    Icon: <LineChart className="mr-4  h-6" />,
    label: "Business",
    link: "/explore/business",
  },
  {
    Icon: <Clapperboard className="mr-4  h-6" />,
    label: "Movies & Tv",
    link: "/explore/television",
  },
  {
    Icon: <Wrench className="mr-4  h-6" />,
    label: "Education & Careers",
    link: "/explore/television",
  },
  {
    Icon: <Icons.PottedPlant className="mr-4 w-6 h-6 fill-white" />,
    label: "Garden & Home",
    link: "/explore/television",
  },
  {
    Icon: <Icons.Cosmetics className="mr-4 w-6 h-6 fill-white" />,
    label: "Fashion & Beauty",
    link: "/explore/television",
  },
  {
    Icon: <Palette className="mr-4  h-6" />,
    label: "Art",
    link: "/explore/art",
  },
  {
    Icon: <Church className="mr-4  h-6" />,
    label: "Culture,Race and Ethnicity",
    link: "/explore/culture-race-and-ethnicity",
  },
  {
    Icon: <Book className="mr-4  h-6" />,
    label: "Reading,Writing, Literature",
    link: "/explore/reading-writing-and-literature",
  },
  {
    Icon: <UtensilsCrossed className="mr-4  h-6" />,
    label: "Food & Drinks",
    link: "/explore/food",
  },
  {
    Icon: <FlaskConical className="mr-4  h-6" />,
    label: "Science",
    link: "/explore/science",
  },
  {
    Icon: <Plane className="mr-4  h-6" />,
    label: "Travel & Places",
    link: "/explore/travel",
  },
  {
    Icon: <Cpu className="mr-4  h-6" />,
    label: "Technology",
    link: "/explore/technology",
  },
];

export const Resources = [
  {
    Icon: <Component className="mr-4 w-6 h-6 " />,
    label: "About Us",
    link: "/explore/personal",
  },
  {
    Icon: <HelpCircle className="mr-4 h-6" />,
    label: "Help",
    link: "/explore/personal",
  },
  {
    Icon: <PanelTop className="mr-4 h-6" />,
    label: "Content Policy",
    link: "/explore/personal",
  },
  {
    Icon: <Scale className="mr-4 h-6" />,
    label: "Privacy Policy",
    link: "/explore/personal",
  },
  {
    Icon: <ScrollText className="mr-4 h-6" />,
    label: "User Agreement",
    link: "/explore/personal",
  },
];
