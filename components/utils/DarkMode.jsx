import { Check } from "lucide-react";
import { Button } from "../ui/Button";
import { Icons } from "./Icons";
import { useTheme } from "next-themes";

const DarkMode = ({ setActiveSubMenu, setSubMenu, setOpen }) => {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <div className="px-2">
      <div className="flex items-center gap-x-4">
        <Button
          onClick={() => {
            setActiveSubMenu(false);
            setSubMenu(null);
          }}
          variant="ghost"
          className="p-2 hover:bg-neutral-100 rounded-full cursor-pointer dark:hover:bg-neutral-600"
        >
          <Icons.BackIcon className="h-5 w-5  dark:fill-neutral-200" />
        </Button>

        <h1 className="text-2xl font-bold dark:text-neutral-200">Display</h1>
      </div>

      <div className="mt-3">
        <div className="flex items-center gap-x-4">
          <span className="p-1.5 bg-neutral-200 rounded-full dark:bg-neutral-600">
            <Icons.DarkModeIcon
              fill="#424242"
              className="h-6 w-6 border-neutral-800 dark:fill-neutral-200"
            />
          </span>
          <span className="font-semibold text-neutral-600 dark:text-neutral-200">
            Dark Mode
          </span>
        </div>

        <div className="flex flex-col ml-10 mt-1">
          <Button
            onClick={() => {
              setTheme("light");
              setActiveSubMenu(false);
              setSubMenu(null);
              setOpen(false);
            }}
            variant="ghost"
            className="flex justify-start gap-x-2 dark:text-neutral-200 dark:hover:bg-neutral-600"
          >
            <span
              className={` ${
                resolvedTheme === "light"
                  ? "opacity-1 dark:text-neutral-200"
                  : "opacity-0 dark:text-neutral-200,"
              }`}
            >
              <Check />
            </span>
            Light theme
          </Button>

          <Button
            onClick={() => {
              setTheme("dark");
              setActiveSubMenu(false);
              setSubMenu(null);
              setOpen(false);
            }}
            variant="ghost"
            className="flex justify-start gap-x-2 dark:text-neutral-200 dark:hover:bg-neutral-600"
          >
            <span
              className={`${
                resolvedTheme === "dark"
                  ? "opacity-1 dark:text-neutral-200"
                  : "opacity-0 dark:text-neutral-200,"
              }`}
            >
              <Check />
            </span>
            Dark theme
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DarkMode;
