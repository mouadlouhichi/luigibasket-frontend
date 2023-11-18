"use client";

import React, { FC, Fragment } from "react";
import Image from "next/image";
import { Icons } from "@/images/icons";
import noProduct from "@/images/icons/no-product.svg";
import useAppStore from "@/store";
import { Dialog, Transition } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import ReactPDF, { PDFDownloadLink } from "@react-pdf/renderer";

import { useIsClient } from "@/hooks/use-is-client";
import Button from "@/components/Button";

import CartDoc from "./CartDoc";

interface CartProps {
  className?: string;
  closeModal: () => void;
  showModal: boolean;
  showDialog: boolean;
  setShowDialog: any;
  resetIsShowingDialog: any;
}

type FormValues = {
  price: number;
  quantity: number;
  totalPrice: number;
};

const Cart: FC<CartProps> = ({
  className = "",
  closeModal = () => {},
  showModal = false,
  showDialog = false,
  setShowDialog = () => {},
  resetIsShowingDialog = () => {},
}) => {
  const { cart, removeBasketItem } = useAppStore();
  const mounted = useIsClient();

  console.log("cart", cart, "mounted", mounted);

  return (
    <div className="Cart">
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="HeroSearchFormMobile__Dialog relative z-max"
          onClose={closeModal}
        >
          <div className="fixed inset-0 ">
            <div className="flex h-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out transition-transform"
                enterFrom="opacity-0 translate-x-52"
                enterTo="opacity-100 translate-x-14"
                leave="ease-in transition-transform"
                leaveFrom="opacity-100 translate-x-14"
                leaveTo="opacity-0 translate-x-52"
              >
                <Dialog.Panel className="relative w-full bg-white shadow-md">
                  {showDialog && (
                    <div className="relative w-[calc(100%-3rem)] h-full overflow-hidden flex-1 flex flex-col ">
                      <div className=" flex w-full border-b p-4  justify-between items-center">
                        <h1 className="text-xl font-bold font-mono text-center">
                          Produits de Basket
                        </h1>
                        <button className="" onClick={closeModal}>
                          <XMarkIcon className="w-5 h-5 text-black dark:text-white" />
                        </button>
                      </div>
                      <div className="h-full">
                        {cart && cart.basketItems?.length > 0 && mounted ? (
                          cart.basketItems.map((item) => (
                            <div className="flex flex-col p-4 " key={item.id}>
                              <div className="flex justify-between">
                                <div className="flex space-x-4 ">
                                  <div className=" w-20 h-24  relative flex items-center justify-center">
                                    <Image
                                      src={item.image}
                                      fill
                                      alt="listing card gallery"
                                      className={`object-cover   rounded-xl`}
                                    />
                                  </div>
                                  <div className="flex justify-between flex-col">
                                    <span className="text-base  font-bold">
                                      {item.name}
                                    </span>

                                    <p className="text-xs text-gray-600">
                                      prix unitaire: {item.price} DH
                                    </p>
                                    <p className="text-xs text-gray-600">
                                      quantité: {item.quantity}
                                    </p>

                                    <p className="font-semibold text-primary-6000">
                                      total: {item.totalPrice} DH
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <button
                                    className=""
                                    onClick={() => removeBasketItem(item)}
                                  >
                                    <TrashIcon className="w-5 h-5 mt-1 text-secondary-6000 dark:text-white" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="flex justify-center gap-4 flex-col items-center translate-y-20">
                            <Image
                              src={noProduct}
                              alt="no product"
                              className={`object-cover w-40`}
                            />
                            <p className="text-xl  font-bold text-gray-600">
                              Votre panier est vide
                            </p>
                          </div>
                        )}
                      </div>
                      {cart && cart.basketItems?.length > 0 && mounted && (
                        <div className=" flex w-full border-t p-4  justify-between items-center">
                          <Button
                            className="w-full"
                            onClick={() => {
                              resetIsShowingDialog();
                              closeModal();
                            }}
                          >
                            <PDFDownloadLink
                              document={<CartDoc />}
                              fileName="fee_acceptance.pdf"
                            >
                              {({ blob, url, loading, error }) =>
                                loading
                                  ? "Loading"
                                  : "Sauvegarder"
                              }
                            </PDFDownloadLink>
                            <Icons.Save className="w-5 h-5 ml-2" />
                          </Button>
                        </div>
                      )}
                    </div>
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

export default Cart;
