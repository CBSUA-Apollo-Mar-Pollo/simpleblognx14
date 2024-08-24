import { Icons } from "@/components/utils/Icons";
import {
  Album,
  Book,
  CakeSlice,
  Church,
  Cpu,
  FlaskConical,
  Home,
  HomeIcon,
  LineChart,
  MessageSquareMore,
  Palette,
  Plane,
  Save,
  ThumbsUp,
  TrendingUp,
  Tv,
  User,
} from "lucide-react";
import Image from "next/image";

export const SideBarFirstLinks = [
  {
    Icon: (
      <Image
        sizes="100vw"
        src={"/ImageIcons/fire.png"}
        width="0"
        height="0"
        className="w-7 h-7"
      />
    ),
    label: "Popular",
    link: "/e/popular",
  },
  {
    Icon: (
      <Image
        sizes="100vw"
        src={"/ImageIcons/history.png"}
        width="0"
        height="0"
        className="w-7 h-7"
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
        className="w-7 h-7"
      />
    ),
    label: "Saved",
    link: "/e/popular",
  },
  {
    Icon: (
      <Image
        sizes="100vw"
        src={"/ImageIcons/FindGroup.png"}
        width="0"
        height="0"
        className="w-7 h-7"
      />
    ),
    label: "Group",
    link: "/e/groups/feed",
  },
  {
    Icon: (
      <Image
        sizes="100vw"
        src={"/ImageIcons/Streamerlive.png"}
        width="0"
        height="0"
        className="w-7 h-7"
      />
    ),
    label: "Streams",
    link: "/e/streams/feed",
  },
  {
    Icon: (
      <Image
        sizes="100vw"
        src={"/ImageIcons/pageIcon.png"}
        width="0"
        height="0"
        className="w-7 h-7"
      />
    ),
    label: "Pages",
    link: "/e/pages/feed",
  },
];

export const SideBarSecondLinks = [
  {
    Icon: <Icons.Home className="w-7 h-7 dark:fill-neutral-50" />,
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
        className="w-7 h-7"
      />
    ),
    label: "Popular",
    link: "/e/popular",
  },
];

export const SideBarExploreLinks = [
  {
    Icon: <User className="mr-4  h-6" />,
    label: "Personal",
    link: "/explore/personal",
  },
  {
    Icon: <LineChart className="mr-4  h-6" />,
    label: "Business",
    link: "/explore/business",
  },
  {
    Icon: <Tv className="mr-4  h-6" />,
    label: "Television",
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
    Icon: <CakeSlice className="mr-4  h-6" />,
    label: "Food",
    link: "/explore/food",
  },
  {
    Icon: <FlaskConical className="mr-4  h-6" />,
    label: "Science",
    link: "/explore/science",
  },
  {
    Icon: <Plane className="mr-4  h-6" />,
    label: "Travel",
    link: "/explore/travel",
  },
  {
    Icon: <Cpu className="mr-4  h-6" />,
    label: "Technology",
    link: "/explore/technology",
  },
];
