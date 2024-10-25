import { split } from "postcss/lib/list";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const BreadCrumbs = ({ title }) => {
  console.log(title);
  const location = useLocation();
  const links = split(location.pathname, "/");
  console.log(links);
  console.log(location);
  return (
    <div>
      <span>
        {links.map((link, index) => (
          <span key={index}>
            {link === "blog" || link === "category" ? (
              <Link
                className="text-purple-500 cursor-pointer underline  hover:underline-offset-2 hover:decoration-2 hover:decoration-purple-500"
                to="/"
              >
                Главная
              </Link>
            ) : links.length === index + 1 ? (
              <span className="text-purple-700 font-semibold ">{title}</span>
            ) : (
              link
            )}
            /
          </span>
        ))}
      </span>
    </div>
  );
};

export default BreadCrumbs;
