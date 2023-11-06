"use client";

import React from "react";
import { Control, Controller, FormState } from "react-hook-form";

import Input from "@/components/Input";

interface Props {
  loading?: boolean;
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

const AddProductForm: React.FC<Props> = ({ control, formState }) => {
  // Define the component's logic and rendering here

  return (
    <div className="w-full space-y-5 mt-12">
      <div
        className={`w-full bg-white dark:bg-neutral-800 overflow-hidden rounded-2xl shadow-lg `}
      >
        <div className="p-5 flex gap-2 flex-col">
          <span className="block font-semibold text-xl sm:text-2xl my-4">
            Ajoutez ce produit
          </span>
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
                  inputmode="numeric"
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
                  inputmode="numeric"
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
                  inputmode="numeric"
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
