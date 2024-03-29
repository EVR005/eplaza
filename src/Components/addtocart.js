/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import React, { Fragment, useRef, useState } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import axios from "axios";

const product = {
  name: "Basic Tee 6-Pack ",
  price: "$192",
  rating: 3.9,
  reviewCount: 117,
  href: "#",
  imageSrc:
    "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
  imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  colors: [
    { name: "white", class: "bg-white", selectedClass: "ring-black-950" },
    { name: "green", class: "bg-green-600", selectedClass: "ring-black-950" },
    { name: "black", class: "bg-gray-900", selectedClass: "ring-black-950" },
    { name: "red", class: "bg-red-600", selectedClass: "ring-black-950" },
    { name: "yellow", class: "bg-yellow-400", selectedClass: "ring-black-950" },
    { name: "blue", class: "bg-blue-700", selectedClass: "ring-black-950" },
  ],
  sizes: [
    { name: "s", label: "S", checked: false },
    { name: "m", label: "M", checked: false },
    { name: "l", label: "L", checked: false },
    { name: "xl", label: "XL", checked: false },
    { name: "xxl", label: "XXL", checked: false },
    { name: "xxxl", label: "XXXL", checked: false },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AddToCart(props) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const token = JSON.parse(localStorage.getItem("accesstoken"));
  const headers = { Authorization: `Bearer ${token}` };
  let params = { id: JSON.parse(localStorage.getItem("player_id")) };
  // //console.log(
  //   product.colors.find((item) => item["name"] === props.details.color)
  //     ? product.colors.find((item) => item["name"] === props.details.color)[
  //         "class"
  //       ]
  //     : ""
  // );
  const submitref = useRef(null);

  const addToCart = async () => {
    // params["product_key"] = props.details.id;
    submitref.current.disabled = true;
    await axios
      .post(
        "https://eplaza-backend.onrender.com/pushtocart",
        { product_key: props.details.id, req_quantity: quantity },
        { params, headers }
      )
      .catch((err) => console.log(err));
    submitref.current.disabled = false;
  };

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={() => {
                      props.setOpen(false);
                      localStorage.setItem(
                        "dispCartPopUp",
                        JSON.stringify(false)
                      );
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                      <img
                        src={props.details.image}
                        alt="Product"
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                        {props.details.product_name}
                      </h2>

                      <section
                        aria-labelledby="information-heading"
                        className="mt-2"
                      >
                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>

                        <p className="text-2xl text-gray-900">
                          {props.details.price}
                        </p>

                        {/* Reviews */}
                        <div>{props.details.caption}</div>
                        <div className="text-red-600">
                          {props.details.quantity == 0
                            ? "Product Currently Unavailbale"
                            : ""}
                        </div>
                        <div className="grid grid-cols-3 w-20">
                          <button
                            onClick={() => {
                              let x = quantity;
                              if (x < props.details.quantity) x++;
                              setQuantity(x);
                            }}
                          >
                            <PlusCircleIcon class="h-6 w-6 text-gray-500" />
                          </button>
                          <div className="ml-2">{quantity}</div>
                          <button
                            onClick={() => {
                              let x = quantity;
                              if (x > 1) x--;
                              setQuantity(x);
                            }}
                          >
                            <MinusCircleIcon class="h-6 w-6 text-gray-500" />
                          </button>
                        </div>
                        {/* <div className="mt-6">
                          <h4 className="sr-only">Reviews</h4>
                          <div className="flex items-center">
                            <div className="flex items-center">
                              {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                  key={rating}
                                  className={classNames(
                                    product.rating > rating
                                      ? "text-gray-900"
                                      : "text-gray-200",
                                    "h-5 w-5 flex-shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                            <p className="sr-only">
                              {product.rating} out of 5 stars
                            </p>
                            <a
                              href="#"
                              className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              {product.reviewCount} reviews
                            </a>
                          </div>
                        </div> */}
                      </section>

                      <section
                        aria-labelledby="options-heading"
                        className="mt-10"
                      >
                        <h3 id="options-heading" className="sr-only">
                          Product options
                        </h3>

                        <form>
                          {/* Colors */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">
                              Color
                            </h4>

                            <RadioGroup
                              value={selectedColor}
                              onChange={setSelectedColor}
                              className="mt-4"
                            >
                              <RadioGroup.Label className="sr-only">
                                Choose a color
                              </RadioGroup.Label>
                              <span className="flex items-center space-x-3">
                                {/* {product.colors.map((color) => ( */}
                                <RadioGroup.Option
                                  //   key={color.name}
                                  //   value={color}
                                  className={({ active, checked }) =>
                                    classNames(
                                      product.colors.find(
                                        (item) =>
                                          item["name"] === props.details.color
                                      )
                                        ? product.colors.find(
                                            (item) =>
                                              item["name"] ===
                                              props.details.color
                                          )["selectedClass"]
                                        : "",
                                      //   active && checked
                                      //     ? "ring ring-offset-1"
                                      //     : "",
                                      //   !active && checked ? "ring-2" : "",
                                      "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                    )
                                  }
                                >
                                  <RadioGroup.Label
                                    as="span"
                                    className="sr-only"
                                  >
                                    {/* {color.name} */}
                                  </RadioGroup.Label>
                                  <span
                                    aria-hidden="true"
                                    className={classNames(
                                      product.colors.find(
                                        (item) =>
                                          item["name"] === props.details.color
                                      )
                                        ? product.colors.find(
                                            (item) =>
                                              item["name"] ===
                                              props.details.color
                                          )["class"]
                                        : "",
                                      "h-8 w-8 rounded-full border border-black border-opacity-10"
                                    )}
                                  />
                                </RadioGroup.Option>
                                {/* ))} */}
                              </span>
                            </RadioGroup>
                          </div>

                          {/* Sizes */}
                          <div className="mt-10">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-gray-900">
                                Size
                              </h4>
                              {/* <a
                                href="#"
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Size guide
                              </a> */}
                            </div>

                            <RadioGroup
                              value={selectedSize}
                              onChange={setSelectedSize}
                              className="mt-4"
                            >
                              <RadioGroup.Label className="sr-only">
                                Choose a size
                              </RadioGroup.Label>
                              <div className="grid grid-cols-4 gap-4">
                                {/* {product.sizes.map((size) => ( */}
                                <RadioGroup.Option
                                  key={props.details.size}
                                  value={
                                    product.sizes.find(
                                      (item) =>
                                        item["name"] === props.details.size
                                    )
                                      ? product.sizes.find(
                                          (item) =>
                                            item["name"] === props.details.size
                                        )["label"]
                                      : ""
                                  }
                                  // disabled={!size.inStock}
                                  className={({ active }) =>
                                    classNames(
                                      true
                                        ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                        : "cursor-not-allowed bg-gray-50 text-gray-200",
                                      active ? "ring-2 ring-indigo-500" : "",
                                      "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
                                    )
                                  }
                                >
                                  {({ active, checked }) => (
                                    <>
                                      <RadioGroup.Label as="span">
                                        {product.sizes.find(
                                          (item) =>
                                            item["name"] === props.details.size
                                        )
                                          ? product.sizes.find(
                                              (item) =>
                                                item["name"] ===
                                                props.details.size
                                            )["label"]
                                          : ""}
                                      </RadioGroup.Label>
                                      {true ? (
                                        <span
                                          className={classNames(
                                            active ? "border" : "border-2",
                                            checked
                                              ? "border-indigo-500"
                                              : "border-transparent",
                                            "pointer-events-none absolute -inset-px rounded-md"
                                          )}
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <span
                                          aria-hidden="true"
                                          className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                        >
                                          <svg
                                            className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                            viewBox="0 0 100 100"
                                            preserveAspectRatio="none"
                                            stroke="currentColor"
                                          >
                                            <line
                                              x1={0}
                                              y1={100}
                                              x2={100}
                                              y2={0}
                                              vectorEffect="non-scaling-stroke"
                                            />
                                          </svg>
                                        </span>
                                      )}
                                    </>
                                  )}
                                </RadioGroup.Option>
                              </div>
                            </RadioGroup>
                          </div>

                          <button
                            type="submit"
                            disabled={
                              props.details.quantity == 0 ? true : false
                            }
                            ref={submitref}
                            onClick={addToCart}
                            className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Add to bag
                          </button>
                        </form>
                      </section>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
