"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useSwipeable } from "react-swipeable";
import { Route } from "@/routers/types";
import { variants } from "@/utils/animationVariants";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";

export interface GallerySliderProps {
  className?: string;
  galleryImgs?: (StaticImageData | string)[];
  ratioClass?: string;
  uniqueID: string;
  href?: Route<string>;
  imageClass?: string;
  galleryClass?: string;
  navigation?: boolean;
}

export default function GallerySlider({
  className = "",
  galleryImgs = [],
  ratioClass = "aspect-w-4 aspect-h-3",
  imageClass = "",
  uniqueID = "uniqueID",
  galleryClass = "rounded-xl",
  href = "/listing-stay-detail" as Route,
  navigation = true,
}: GallerySliderProps) {
  const [loaded, setLoaded] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const images = galleryImgs;

  function changePhotoId(newVal: number) {
    if (newVal > index) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setIndex(newVal);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < images?.length - 1) {
        changePhotoId(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changePhotoId(index - 1);
      }
    },
    trackMouse: true,
  });

  const currentImage = images[index];

  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className={`relative group group/cardGallerySlider ${className}`}
        {...handlers}
      >
        {/* Main image */}
        <div className={`w-full overflow-hidden ${galleryClass}`}>
          <Link
            href={href}
            className={`relative flex items-center justify-center ${ratioClass}`}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants(340, 1)}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <Image
                  src={currentImage || ""}
                  fill
                  alt="listing card gallery"
                  className={`object-cover ${imageClass}`}
                  onLoadingComplete={() => setLoaded(true)}
                  sizes="(max-width: 1025px) 100vw, 300px"
                />
              </motion.div>
            </AnimatePresence>
          </Link>
        </div>
      </div>
    </MotionConfig>
  );
}
