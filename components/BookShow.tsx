"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const BookShowContent = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("show");
  console.log(search);

  return <div>BookShow</div>;
};

const BookShow = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookShowContent />
    </Suspense>
  );
};

export default BookShow;
