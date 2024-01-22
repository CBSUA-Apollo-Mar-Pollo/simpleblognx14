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

export const SideBarFirstLinks = [
  {
    Icon: <HomeIcon className="mr-4 text-gray-500 h-6" />,
    label: "Home",
    link: "/",
  },
  {
    Icon: <Album className="mr-4 text-gray-500 h-6" />,
    label: "Post",
    link: "post",
  },
  {
    Icon: <ThumbsUp className="mr-4 text-gray-500 h-6" />,
    label: "Liked Posts",
    link: "/liked-posts",
  },
  {
    Icon: <Save className="mr-4 text-gray-500 h-6" />,
    label: "Saved Posts",
    link: "/saved-posts",
  },
  {
    Icon: <MessageSquareMore className="mr-4 text-gray-500 h-6" />,
    label: "Comments",
    link: "/comments",
  },
];
export const SideBarSecondLinks = [
  {
    Icon: <HomeIcon className="mr-4 text-gray-500 h-6" />,
    label: "Home",
    link: "/",
  },
  {
    Icon: <TrendingUp className="mr-4 text-gray-500 h-6" />,
    label: "Popular",
    link: "/e/popular",
  },
];

export const SideBarExploreLinks = [
  {
    Icon: <User className="mr-4 text-gray-500 h-6" />,
    label: "Personal",
    link: "/explore/personal",
  },
  {
    Icon: <LineChart className="mr-4 text-gray-500 h-6" />,
    label: "Business",
    link: "/explore/business",
  },
  {
    Icon: <Tv className="mr-4 text-gray-500 h-6" />,
    label: "Television",
    link: "/explore/television",
  },
  {
    Icon: <Palette className="mr-4 text-gray-500 h-6" />,
    label: "Art",
    link: "/explore/art",
  },
  {
    Icon: <Church className="mr-4 text-gray-500 h-6" />,
    label: "Culture,Race and Ethnicity",
    link: "/explore/culture-race-and-ethnicity",
  },
  {
    Icon: <Book className="mr-4 text-gray-500 h-6" />,
    label: "Reading,Writing, Literature",
    link: "/explore/reading-writing-and-literature",
  },
  {
    Icon: <CakeSlice className="mr-4 text-gray-500 h-6" />,
    label: "Food",
    link: "/explore/food",
  },
  {
    Icon: <FlaskConical className="mr-4 text-gray-500 h-6" />,
    label: "Science",
    link: "/explore/science",
  },
  {
    Icon: <Plane className="mr-4 text-gray-500 h-6" />,
    label: "Travel",
    link: "/explore/travel",
  },
  {
    Icon: <Cpu className="mr-4 text-gray-500 h-6" />,
    label: "Technology",
    link: "/explore/technology",
  },
];
