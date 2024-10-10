import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <div>
      <Link to={`/category/${category.slug}`}>
        <div className="bg-white rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={"http://localhost:3000" + category.image}
                  alt="@shadcn"
                />
                <AvatarFallback> {category.name.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
