"use client";

import React from "react";
import PageCreationSideBar from "./page-creation-sidebar";
import PageCreationContentPreview from "./page-creation-content-preview";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const PageCreationInputSchema = z.object({
  pagename: z.string(),
  pagecategory: z.string(),
  pagebio: z.string(),
});

const PageCreationComponent = ({ session }) => {
  const form = useForm({
    resolver: zodResolver(PageCreationInputSchema),
    defaultValues: {
      pagename: "",
      pagecategory: "",
      pagebio: "",
    },
  });

  const { pagename, pagecategory } = form.watch();
  const isSubmitDisabled = !pagename || !pagecategory;
  const formValues = form.watch();

  console.log(isSubmitDisabled, "isSubmitDisabled");

  const onSubmit = (data) => {
    console.log(data, "the page creation input values");
  };

  return (
    <div className="grid grid-cols-9">
      <div className="col-span-2 bg-white drop-shadow-xl">
        <PageCreationSideBar
          onSubmit={onSubmit}
          isSubmitDisabled={isSubmitDisabled}
          form={form}
        />
      </div>
      <div className="col-span-7 bg-neutral-100 h-screen">
        <PageCreationContentPreview session={session} formValues={formValues} />
      </div>
    </div>
  );
};

export default PageCreationComponent;
