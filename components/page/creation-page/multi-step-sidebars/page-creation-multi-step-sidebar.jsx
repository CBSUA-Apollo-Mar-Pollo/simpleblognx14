"use client";

import PageCreationStepFourSidebar from "./page-creation-step-four-sidebar";
import PageCreationStepOneSidebar from "./page-creation-step-one-sidebar";
import PageCreationStepThreeSidebar from "./page-creation-step-three-sidebar";
import PageCreationStepTwoSidebar from "./page-creation-step-two-sidebar";

const PageCreationMultiStepSideBar = ({
  sideBarStepProcesssCounter,
  setSideBarStepProcessCounter,
  onSubmit,
  isSubmitDisabled,
  form,
  isLoading,
  formValues,
  setOpenLeavePageModal,
  session,
}) => {
  return (
    <>
      {sideBarStepProcesssCounter === 1 && (
        <PageCreationStepOneSidebar
          setSideBarStepProcessCounter={setSideBarStepProcessCounter}
          onSubmit={onSubmit}
          isSubmitDisabled={isSubmitDisabled}
          form={form}
          isLoading={isLoading}
          formValues={formValues}
          setOpenLeavePageModal={setOpenLeavePageModal}
        />
      )}

      {sideBarStepProcesssCounter === 2 && (
        <PageCreationStepTwoSidebar
          setSideBarStepProcessCounter={setSideBarStepProcessCounter}
          formValues={formValues}
          setOpenLeavePageModal={setOpenLeavePageModal}
        />
      )}

      {sideBarStepProcesssCounter === 3 && (
        <PageCreationStepThreeSidebar
          setSideBarStepProcessCounter={setSideBarStepProcessCounter}
          formValues={formValues}
          setOpenLeavePageModal={setOpenLeavePageModal}
        />
      )}

      {sideBarStepProcesssCounter === 4 && (
        <PageCreationStepFourSidebar
          setSideBarStepProcessCounter={setSideBarStepProcessCounter}
          formValues={formValues}
          setOpenLeavePageModal={setOpenLeavePageModal}
          session={session}
        />
      )}
    </>
  );
};

export default PageCreationMultiStepSideBar;
