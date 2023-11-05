import React, { FC, ReactNode } from "react";
import { trpc } from "@/providers/trpcProvider";
import { Product } from "@prisma/client";

import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import Button from "@/components/Button";

import HeaderFilter from "./HeaderFilter";
import ProductCard from "./ProductCard";

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

//
export interface ProductsListeningProps {
  productsData?: Product[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  cardType?: "card1" | "card2";
  id?: string;
}

const ProductsListening: FC<ProductsListeningProps> = ({
  productsData = DEMO_DATA,
  gridClass = "",
  heading = "Meet Our Experienced Psychiatrists",
  subHeading = "Explore our skilled psychiatrists, What type of therapy are you seeking?",
  tabs = ["Tous", "Légumes", "Fruits", "Épices"],
  id = "",
}) => {
  const { data, isLoading } = trpc.product.getAllProducts.useQuery();

  return (
    <div className="nc-SectionGridFeaturePlaces relative" id={id}>
      <HeaderFilter
        tabActive={"Tous"}
        subHeading={subHeading}
        tabs={tabs}
        heading={heading}
      />
      <div
        className={`grid gap-6 md:gap-8 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {!isLoading &&
          data &&
          data.map(
            (product: Product) =>
              product && (
                <ProductCard
                  key={product.id}
                  className="relative"
                  data={product}
                />
              ),
          )}
      </div>
    </div>
  );
};

export default ProductsListening;
