"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@prisma/client";
import { Control, Controller, FormState } from "react-hook-form";

import Input from "@/components/Input";

interface Props {
  loading?: boolean;
  product: Product;
  formState: FormState<{
    price: number;
    quantity: number;
    total: number;
  }>;
  control: Control<
    {
      price: number;
      quantity: number;
      total: number;
    },
    any
  >;
}

const AddProductForm: React.FC<Props> = ({ control, formState, product }) => {
  // Define the component's logic and rendering here deploy

  return (
    <div className="w-full space-y-5 mt-12">
      <div
        className={`w-full bg-white dark:bg-neutral-800 overflow-hidden rounded-2xl shadow-lg `}
      >
        <div className="p-5 flex gap-2 flex-col">
          <span className="block font-semibold text-xl sm:text-2xl my-4">
            Ajoutez ce produit
          </span>
          <div className="w-full  gap-2 flex">
            <div>
              <Image
                src={product.image}
                alt="listing card gallery"
                className={`relative object-cover rounded-2xl `}
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-base  font-bold">{product.name}</span>
              <span className="text-sm  font-semibold bg-primary-200 text-white px-4 w-fit rounded-xl">
                {product.category}
              </span>
            </div>
          </div>
          <label className="flex items-center gap-2 relative justify-between">
            <span className="font-medium text-neutral-800 dark:text-neutral-200">
              Prix
            </span>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  placeholder="Prix unitaire"
                  className="mt-1 w-3/4"
                  rounded="min"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  {...field}
                />
              )}
            />
            {formState.errors.price && (
              <p className="text-sm text-red-500 dark:text-red-500 absolute">
                {formState.errors.price.message}
              </p>
            )}
          </label>

          <label className="flex items-center gap-2 relative justify-between">
            <span className="text-neutral-800 dark:text-neutral-200">
              Quantité
            </span>
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  placeholder="Quantité"
                  className="mt-1 w-3/4"
                  rounded="min"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  {...field}
                />
              )}
            />
            {formState.errors.quantity && (
              <p className="text-sm text-red-500 dark:text-red-500 absolute ">
                {formState.errors.quantity.message}
              </p>
            )}
          </label>
          <div className="w-full border-b my-4 border-neutral-200 dark:border-neutral-700"></div>
          <label className="flex items-center gap-8 relative justify-between">
            <span className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
              Total
            </span>
            <Controller
              name="total"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  placeholder="Total"
                  className="mt-1 w-3/4"
                  rounded="min"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  {...field}
                />
              )}
            />
            {formState.errors.total && (
              <p className="text-sm text-red-500 dark:text-red-500 ">
                {formState.errors.total.message}
              </p>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
