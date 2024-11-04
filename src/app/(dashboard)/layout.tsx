import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex max-h-screen flex-col w-full items-center">
      <div className="flex flex-grow w-full justify-center dark:bg-neutral-950">
        <div className="max-w-[920px] flex flex-col flex-grow px-4 py-12">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
