import React from "react";

export const CategoryItem = () => {
  return (
    <div className="category-card p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="icon-placeholder">
          <Briefcase size={24} />
        </div>
        <h3 className="text-lg font-semibold">Jobs</h3>
      </div>
    </div>
  );
};
