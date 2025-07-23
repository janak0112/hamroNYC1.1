import React from "react";

function Categories() {
  const categoriesItems = [
    { name: "Job", navigate: "/jobs" },
    { name: "Events", navigate: "/events" },
  ];
  return (
    <div class="max-w-6xl mx-auto mt-20">
      <h2 class="text-3xl font-bold text-center mb-8">Popular by Category</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <CategoryItem />
      </div>
    </div>
  );
}

export default Categories;
