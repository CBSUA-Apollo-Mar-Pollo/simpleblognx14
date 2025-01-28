import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { TopicLists } from "@/constants/topic-list";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import React from "react";

const ModalPage3 = ({ topicsSelected, setTopicsSelected }) => {
  return (
    <div>
      <DialogHeader className="ml-4 mt-4">
        <DialogTitle className="font-bold text-2xl">Add topics</DialogTitle>
        <DialogDescription className="text-black">
          Add up to 3 topics to help interested users find your community.
        </DialogDescription>
      </DialogHeader>

      <div>
        {/* filter topic */}
        <div className="relative flex items-center mx-3 mt-4">
          <Search className="absolute left-4 h-5 w-5 text-neutral-800 z-20 dark:text-neutral-300" />
          <Input
            placeholder="Filter topics"
            className="h-9 pl-12 focus-visible:ring-transparent placeholder:font-normal placeholder:text-neutral-700 border-0 bg-neutral-200/50 font-light rounded-full  text-sm dark:placeholder:text-white"
          />
        </div>

        {/* topics pick by the user */}

        <div className="mx-4 mt-4">
          <div className="">
            <h4 className="font-extrabold text-md">
              Topics {topicsSelected.length}/3
            </h4>
            <div className="flex flex-wrap items-center gap-x-2 mt-3 gap-y-2 mb-2">
              {topicsSelected.map((topic, index) => (
                <span
                  key={index}
                  className="text-xs bg-neutral-200 text-neutral-700 px-4 py-2 rounded-full hover:bg-neutral-300 hover:cursor-pointer"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* list of topics */}
          <div className="max-h-[35vh] overflow-y-auto space-y-5 mt-2">
            {TopicLists.map((item, index) => (
              <div key={index} className="mt-2">
                <span className="text-xs bg-yellow-600 text-white px-4 py-2 rounded-full">
                  {item.label}
                </span>
                <div className="flex flex-wrap items-center gap-x-2 mt-3 gap-y-2">
                  {item.topics.map((topic, index) => (
                    <span
                      key={index}
                      onClick={() => {
                        if (
                          !topicsSelected.includes(topic) &&
                          topicsSelected.length !== 3
                        ) {
                          setTopicsSelected([...topicsSelected, topic]);
                        }
                      }}
                      className={cn(
                        "text-xs bg-neutral-100 text-neutral-700 px-3 py-2 rounded-full hover:bg-neutral-300 hover:cursor-pointer flex items-center gap-x-1",
                        {
                          "bg-neutral-300": topicsSelected.includes(topic),
                        }
                      )}
                    >
                      {topic}
                      {topicsSelected.includes(topic) && (
                        <button
                          onClick={() =>
                            setTopicsSelected(
                              topicsSelected.filter((t) => t !== topic)
                            )
                          }
                          className="bg-neutral-100 rounded-full p-0.5"
                        >
                          {<X className="h-3 w-3 stroke-2" />}
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPage3;
