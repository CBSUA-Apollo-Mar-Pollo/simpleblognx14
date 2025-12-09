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
import friendsIcon from "@/public/ImageIcons/friends.png";
import historyIcon from "@/public/ImageIcons/history.png";
import bookmarkIcon from "@/public/ImageIcons/bookmark.png";
import pageIcon from "@/public/ImageIcons/pageIcon.png";
import eventIcon from "@/public/ImageIcons/event.png";
import clapperIcon from "@/public/ImageIcons/clapper.png";
import trendIcon from "@/public/ImageIcons/trend.png";

export const SideBarFirstLinks = [
  {
    Icon: <Image src={friendsIcon} className="w-6 h-6" alt="Friends" />,
    label: "Friends",
    link: "/friends",
  },
  {
    Icon: <Image src={historyIcon} className="w-6 h-6" alt="History" />,
    label: "History",
    link: "/history/feed",
  },
  {
    Icon: <Image src={bookmarkIcon} className="w-6 h-6" alt="Saved" />,
    label: "Saved",
    link: "/saved",
  },

  {
    Icon: <Image src={pageIcon} className="w-6 h-6" alt="Pages" />,
    label: "Pages",
    link: "/pages/feed",
  },
  {
    Icon: <Image src={eventIcon} className="w-6 h-6" alt="Events" />,
    label: "Events",
    link: "/events",
  },
  {
    Icon: <Image src={clapperIcon} className="w-6 h-6" alt="Shortsv" />,
    label: "Shortsv",
    link: "/shortsv",
  },
];

export const SideBarSecondLinks = [
  {
    Icon: <Icons.Home className="w-6 h-6 dark:fill-neutral-50" />,
    label: "Home",
    link: "/",
  },
  {
    Icon: <Image src={trendIcon} className="w-6 h-6" alt="Popular" />,
    label: "Popular",
    link: "/e/popular",
  },
];

export const AnotherLinks = [
  {
    Icon: (
      <Flame className="mr-4 w-6 h-6  dark:fill-white stroke-1 text-neutral-600 dark:text-white" />
    ),
    label: "Best Posts",
    link: "/explore/personal",
  },
  {
    Icon: (
      <Icons.Group className="mr-4 w-6 h-6 fill-neutral-700 dark:fill-white" />
    ),
    label: "Communities",
    link: "/communities",
  },
  {
    Icon: (
      <MonitorPlay className="mr-4 w-6 h-6 text-neutral-600 dark:text-white" />
    ),
    label: "Watch Videos",
    link: "/explore/personal",
  },
];

export const SideBarExploreLinks = [
  {
    Icon: <Cat className="mr-4  h-6 text-neutral-600  dark:text-white" />,
    label: "Internet Culture",
    link: "/explore/personal",
  },
  {
    Icon: <Gamepad2 className="mr-4  h-6 text-neutral-600 dark:text-white" />,
    label: "Games",
    link: "/explore/personal",
  },
  {
    Icon: <Music className="mr-4  h-6 text-neutral-600 dark:text-white" />,
    label: "Music",
    link: "/explore/personal",
  },
  {
    Icon: <Sparkles className="mr-4  h-6 text-neutral-600 dark:text-white" />,
    label: "Pop culture",
    link: "/explore/personal",
  },
  {
    Icon: <User className="mr-4  h-6 text-neutral-600 dark:text-white" />,
    label: "Personal",
    link: "/explore/personal",
  },
  {
    Icon: <Newspaper className="mr-4  h-5 text-neutral-600 dark:text-white" />,
    label: "News & Politics",
    link: "/explore/personal",
  },
  {
    Icon: (
      <Icons.Anime className="w-6 h-6 dark:fill-neutral-50 mr-3 text-neutral-600 dark:text-white" />
    ),
    label: "Anime",
    link: "/explore/personal",
  },
  {
    Icon: <LineChart className="mr-4  h-6 text-neutral-600 dark:text-white" />,
    label: "Business",
    link: "/explore/business",
  },
  {
    Icon: (
      <Clapperboard className="mr-4  h-6 text-neutral-600 dark:text-white" />
    ),
    label: "Movies & Tv",
    link: "/explore/television",
  },
  {
    Icon: <Wrench className="mr-4  h-6 text-neutral-600 dark:text-white" />,
    label: "Education & Careers",
    link: "/explore/television",
  },
  {
    Icon: (
      <Icons.PottedPlant className="mr-4 w-6 h-6  text-neutral-600 dark:text-white dark:fill-white" />
    ),
    label: "Garden & Home",
    link: "/explore/television",
  },
  {
    Icon: (
      <Icons.Cosmetics className="mr-4 w-6 h-6  text-neutral-600 dark:text-white dark:fill-white" />
    ),
    label: "Fashion & Beauty",
    link: "/explore/television",
  },
  {
    Icon: <Palette className="mr-4  h-6 text-neutral-600 dark:text-white" />,
    label: "Art",
    link: "/explore/art",
  },
  {
    Icon: <Church className="mr-4  h-6 text-neutral-600 dark:text-white" />,
    label: "Culture,Race and Ethnicity",
    link: "/explore/culture-race-and-ethnicity",
  },
  {
    Icon: <Book className="mr-4  h-6 text-neutral-600 dark:text-white" />,
    label: "Reading,Writing, Literature",
    link: "/explore/reading-writing-and-literature",
  },
  {
    Icon: (
      <UtensilsCrossed className="mr-4  h-6 text-neutral-600 dark:text-white" />
    ),
    label: "Food & Drinks",
    link: "/explore/food",
  },
  {
    Icon: (
      <FlaskConical className="mr-4  h-6 text-neutral-600 dark:text-white" />
    ),
    label: "Science",
    link: "/explore/science",
  },
  {
    Icon: <Plane className="mr-4  h-6 text-neutral-600 dark:text-white" />,
    label: "Travel & Places",
    link: "/explore/travel",
  },
  {
    Icon: <Cpu className="mr-4  h-6 text-neutral-600 dark:text-white" />,
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
