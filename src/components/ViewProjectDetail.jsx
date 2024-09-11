import { logDOM } from "@testing-library/react";
import React, { useState } from "react";

export const ViewProjectDetail = ({ selectedData }) => {
  console.log("selectedData", selectedData.levels);

  return (
    <>
      <div className="text-center font-extrabold">
        <h2 className=""> View Project Details</h2>
      </div>
      <div className="h-full p-5 grid grid-cols-2 grid-rows-6 ">
        <div className="grid grid-cols-2">
          <div className="font-bold">Project name</div>
          <div className="border border-1 p-2 w-[150px] h-10">
            {selectedData?.projectName}
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="font-bold">Start date</div>
          <div className="border border-1 p-2 w-[150px] h-10">
            {selectedData?.startDate}
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="font-bold">end Date</div>
          <div className="border border-1 p-2 w-[150px] h-10">
            {selectedData?.endDate}
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="font-bold">Project Status</div>
          <div className="border border-1 p-2 w-[150px] h-10">
            {selectedData?.projectStatus?.statusName}
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="font-bold">Tag Name</div>
          <div>
            {selectedData?.["tagNames"].map((tag, index) => (
              <div className="border border-1 p-2 w-[150px] h-10" key={index}>
                {tag?.tagName}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="font-bold">Project Groups Name</div>
          <div className="border border-1 p-2 w-[150px] h-10">
            {selectedData?.group?.groupName}
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="font-bold">Project Levels</div>
          <div>
            <div>
              {selectedData?.["levels"].map((level, index) => (
                <div className="border border-1 p-2 w-[150px] h-10" key={index}>
                  {level?.levelName}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="font-bold">Project Code</div>
          <div className="border border-1 p-2 w-[150px] h-10">
            {selectedData?.projectId}
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="font-bold">Project Percentage</div>
          <div className="border border-1 p-2 w-[150px] h-10">
            {selectedData?.tasksPercentage}
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="font-bold">Project Accesss</div>
          <div className="border border-1 p-2 w-[150px] h-10">
            {selectedData?.projectAccess}
          </div>
        </div>
        {/*   <div className="grid grid-cols-2">
          <div>Project name</div>
          <div>{selectedData?.projectName}</div>
        </div>
        <div className="grid grid-cols-2">
          <div>Project name</div>
          <div>{selectedData?.projectName}</div>
        </div>
        <div className="grid grid-cols-2">
          <div>Project name</div>
          <div>{selectedData?.projectName}</div>
        </div>
        <div className="grid grid-cols-2">
          <div>Project name</div>
          <div>{selectedData?.projectName}</div>
        </div>
        <div className="grid grid-cols-2">
          <div>Project name</div>
          <div>{selectedData?.projectName}</div>
        </div>
        <div className="grid grid-cols-2">
          <div>Project name</div>
          <div>{selectedData?.projectName}</div>
        </div>

        <div className="grid grid-cols-2">
          <div>Project name</div>
          <div>{selectedData?.projectName}</div>
        </div>
        <div className="grid grid-cols-2">
          <div>Project name</div>
          <div>{selectedData?.projectName}</div>
        </div>
        <div className="grid grid-cols-2">
          <div>Project name</div>
          <div>{selectedData?.projectName}</div>
        </div>
        <div className="grid grid-cols-2">
          <div>Project name</div>
          <div>{selectedData?.projectName}</div>
        </div>
        <div className="grid grid-cols-2">
          <div>Project name</div>
          <div>{selectedData?.projectName}</div>
        </div>
        <div className="grid grid-cols-2">
          <div>Project name</div>
          <div>{selectedData?.projectName}</div>
        </div>
        <div className="grid grid-cols-2">
          <div>Project name</div>
          <div>{selectedData?.projectName}</div>
        </div>
        <div className="grid grid-cols-2">
          <div>Project name</div>
          <div>{selectedData?.projectName}</div>
        </div> */}
      </div>
    </>
  );
};
