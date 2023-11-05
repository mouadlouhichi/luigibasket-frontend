import React, { FC } from "react";
import Link from "next/link";
import { Route } from "@/routers/types";
import { Product } from "@prisma/client";

import { DEMO_STAY_LISTINGS } from "@/data/listings";

import Badge from "./Badge";
import GallerySlider from "./GallerySlider";
import SaleOffBadge from "./SaleOffBadge";
import StartRating from "./StartRating";

export interface ProductCardProps {
  className?: string;
  data?: Product;
  size?: "default" | "small";
}

const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const ProductCard: FC<ProductCardProps> = ({
  size = "default",
  className = "",
  data = DEMO_DATA,
}) => {
  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`ProductCard_${data?.id}`}
          ratioClass="aspect-w-4 aspect-h-3 "
          galleryImgs={[data?.image]}
          galleryClass={size === "default" ? undefined : ""}
        />
      </div>
    );
  };

  return (
    <div
      className={`nc-ProductCard group relative bg-white dark:bg-neutral-900 ${
        size === "default"
          ? "border border-neutral-100 dark:border-neutral-800 "
          : ""
      } rounded-2xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="ProductCard"
    >
      {renderSliderGallery()}
    </div>
  );
};

export default ProductCard;
