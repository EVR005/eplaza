import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  PlusCircleIcon,
  MinusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import NavBar from "./navbar";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const token = JSON.parse(localStorage.getItem("accesstoken"));
  const headers = { Authorization: `Bearer ${token}` };
  let params = { id: JSON.parse(localStorage.getItem("player_id")) };

  const listItem = useRef();

  useEffect(() => {
    axios
      .get("http://localhost:5000/getCart", { params, headers })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteItem = async (e) => {
    //console.log(e.currentTarget.getAttribute("cart_product_key"));
    params.product_key = e.currentTarget.getAttribute("cart_product_key");
    await axios
      .delete("http://localhost:5000/deleteitem", { params, headers })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
    await axios
      .get("http://localhost:5000/getCart", { params, headers })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <NavBar></NavBar>
      <ul role="list" className="divide-y divide-gray-100 m-20">
        {products.length > 0 &&
          products.map((product) => (
            <li
              ref={listItem}
              cart_product_key={product.id}
              key={product.id}
              className="flex justify-between gap-x-6 py-5"
            >
              <div className="flex gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={product.image}
                  alt="Product"
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {product.product_name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {product.price}
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                {/* <div className="grid grid-cols-3 w-20">
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
            </div> */}
                {product.req_quantity}
              </div>
              <button cart_product_key={product.id} onClick={deleteItem}>
                <TrashIcon class="h-6 w-6 text-gray-500" />
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
