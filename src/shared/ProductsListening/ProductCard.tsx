"use client";

import React, { FC, useState } from "react";
import Link from "next/link";
import { useTimeoutFn } from "react-use";
import { Route } from "@/routers/types";
import { Product } from "@prisma/client";

import { DEMO_STAY_LISTINGS } from "@/data/listings";

import AddProductModal from "./AddProductModal";
import Badge from "./Badge";
import GallerySlider from "./GallerySlider";
import SaleOffBadge from "./SaleOffBadge";
import StartRating from "./StartRating";

export interface ProductCardProps {
  className?: string;
  data: Product;
  size?: "default" | "small";
}

const ProductCard: FC<ProductCardProps> = ({
  size = "default",
  className = "",
  data,
}) => {
  const [showModal, setShowModal] = useState(false);

  // FOR RESET ALL DATA WHEN CLICK CLEAR BUTTON
  const [showDialog, setShowDialog] = useState(false);
  const [, , resetIsShowingDialog] = useTimeoutFn(() => setShowDialog(true), 1);
  //
  function closeModal() {
    setShowModal(false);
  }

  function openModal() {
    setShowModal(true);
  }
  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`ProductCard_${data?.id}`}
          ratioClass="aspect-w-4 aspect-h-3 "
          galleryImgs={[data.image]}
          galleryClass={size === "default" ? undefined : ""}
        />
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-1"}>
        <div className={size === "default" ? "space-y-2" : "space-y-1"}>
          <div className="flex items-center space-x-2">
            <h2
              className={`font-semibold capitalize text-neutral-900 dark:text-white ${
                size === "default" ? "text-base" : "text-base"
              }`}
            >
              <span className="line-clamp-1">{data?.name}</span>
            </h2>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        onClick={openModal}
        className={`nc-ProductCard group relative bg-white dark:bg-neutral-900 ${
          size === "default"
            ? "border border-neutral-100 dark:border-neutral-800 "
            : ""
        } rounded-2xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
        data-nc-id="ProductCard"
      >
        {renderSliderGallery()}
        {renderContent()}
        <AddProductModal
          product={data}
          showModal={showModal}
          closeModal={closeModal}
          resetIsShowingDialog={resetIsShowingDialog}
          showDialog={showDialog}
          setShowDialog={setShowDialog}
        />
      </div>
    </>
  );
};

export default ProductCard;
