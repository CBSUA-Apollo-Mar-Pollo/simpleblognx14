import {
  Album,
  Book,
  CakeSlice,
  Church,
  Cpu,
  FlaskConical,
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
        src={"/ImageIcons/trend.png"}
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
];

export const SideBarSecondLinks = [
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
