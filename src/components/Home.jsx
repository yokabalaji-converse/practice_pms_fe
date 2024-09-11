import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <Link to={"/table"}>
        <div className="flex items-center justify-center mt-96">
          <button className="hover:bg-blue-500  rounded items-center w-[100px] h-[40px]  text-white bg-slate-600">
            Click me
          </button>
        </div>
      </Link>
    </div>
  );
};
