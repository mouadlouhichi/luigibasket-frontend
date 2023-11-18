"use client";

import React, { FC, Fragment, use, useCallback, useEffect } from "react";
import useAppStore from "@/store";
import ncNanoId from "@/utils/ncNanoId";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { SubmitHandler, useForm } from "react-hook-form";
import { nan } from "zod";

import { basketItemSchema, IBasketForm } from "@/data/valids/cart";
import ButtonSubmit from "@/components/Button";

import AddProductForm from "./AddProductForm";

interface AddProductModalProps {
  className?: string;
  closeModal: () => void;
  showModal: boolean;
  showDialog: boolean;
  setShowDialog: any;
  resetIsShowingDialog: any;
  product: Product;
}

type FormValues = {
  price: number;
  quantity: number;
  totalPrice: number;
};

const AddProductModal: FC<AddProductModalProps> = ({
  className = "",
  closeModal = () => {},
  showModal = false,
  showDialog = false,
  setShowDialog = () => {},
  resetIsShowingDialog = () => {},
  product,
}) => {
  const { handleSubmit, control, resetField, formState, watch, setValue } =
    useForm<IBasketForm>({
      resolver: zodResolver(basketItemSchema),
    });

  const watchTotal = watch("totalPrice", 0);
  const watchPrice = watch("price", 0);
  const watchQuantity = watch("quantity", 0);

  useEffect(() => {
    if (watchPrice && watchQuantity) {
      setValue("totalPrice", watchPrice * watchQuantity);
    } /* else if (!watchQuantity) {
      setValue("total", NaN);
    } */
  }, [watchQuantity, watchPrice]);

  useEffect(() => {
    if (
      watchPrice &&
      watchQuantity &&
      watchTotal !== watchPrice * watchQuantity
    ) {
      setValue("price", NaN);
      setValue("quantity", NaN);
    }
    console.log(watchTotal);
  }, [watchTotal]);

  const { addBasketItem } = useAppStore();

  const onSubmit = useCallback<SubmitHandler<FormValues>>(
    async (data) => {
      try {
        addBasketItem(
          {
            id: ncNanoId(),
            productId: product.id.toString(),
            quantity: data.quantity,
            price: data.price,
            totalPrice: data.totalPrice,
            name : product.name,
            image : product.image,
            description : product.description || "",
            category : product.category,
          },
          "GUEST",
        );
        closeModal();
      } catch (err) {
        console.error(err);
      }
    },
    [product],
  );

  return (
    <div className="AddProductModal">
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="HeroSearchFormMobile__Dialog relative z-max"
          onClose={closeModal}
        >
          <div className="fixed inset-0 bg-neutral-100 dark:bg-neutral-900">
            <div className="flex h-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out transition-transform"
                enterFrom="opacity-0 translate-y-52"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in transition-transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-52"
              >
                <Dialog.Panel className="relative w-full">
                  {showDialog && (
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="relative h-full overflow-hidden flex-1 flex flex-col justify-between "
                    >
                      <div className="absolute left-4 top-4">
                        <button className="" onClick={closeModal}>
                          <XMarkIcon className="w-5 h-5 text-black dark:text-white" />
                        </button>
                      </div>
                      <div className="flex-1 pt-3 px-1.5 sm:px-4 flex overflow-hidden">
                        <AddProductForm
                          control={control}
                          formState={formState}
                          product={product}
                        />
                      </div>
                      <div className="px-4 py-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 flex justify-between">
                        <button
                          type="button"
                          className="underline font-semibold flex-shrink-0"
                          onClick={() => {
                            setShowDialog(false);
                            resetIsShowingDialog();
                          }}
                        >
                          Réinitialiser
                        </button>
                        <ButtonSubmit type="submit">
                          {" "}
                          Ajouter
                          <PlusIcon className="w-5 h-5 ml-2 text-white dark:text-primary-6000" />
                        </ButtonSubmit>
                      </div>
                    </form>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AddProductModal;
