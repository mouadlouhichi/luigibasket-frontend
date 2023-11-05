"use client";

import React, { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { useForm } from "react-hook-form";

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

const AddProductModal: FC<AddProductModalProps> = ({
  className = "",
  closeModal = () => {},
  showModal = false,
  showDialog = false,
  setShowDialog = () => {},
  resetIsShowingDialog = () => {},
}) => {
  const { handleSubmit, control, reset, formState } = useForm<IBasketForm>({
    defaultValues: {
      price: 0,
      quantity: 0,
      total: 0,
    },
    resolver: zodResolver(basketItemSchema),
  });
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
                <Dialog.Panel className="relative h-full overflow-hidden flex-1 flex flex-col justify-between ">
                  {showDialog && (
                    <>
                      <div className="absolute left-4 top-4">
                        <button className="" onClick={closeModal}>
                          <XMarkIcon className="w-5 h-5 text-black dark:text-white" />
                        </button>
                      </div>
                      <div className="flex-1 pt-3 px-1.5 sm:px-4 flex overflow-hidden">
                        <AddProductForm
                          control={control}
                          formState={formState}
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
                        <ButtonSubmit
                          onClick={() => {
                            closeModal();
                          }}
                        >
                          {" "}
                          Ajouter
                          <PlusIcon className="w-5 h-5 ml-2 text-white dark:text-primary-6000" />
                        </ButtonSubmit>
                      </div>
                    </>
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
