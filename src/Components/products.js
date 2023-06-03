import { useState, useEffect } from "react";
import axios from "axios";
import AddToCart from "./addtocart";

export default function Products(props) {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState({});
  const [popup, setPopUp] = useState("");
  const token = JSON.parse(localStorage.getItem("accesstoken"));
  const headers = { Authorization: `Bearer ${token}` };
  let params = { id: JSON.parse(localStorage.getItem("player_id")) };

  const display_popup = async (e) => {
    params["product_id"] =
      e.target.parentElement.parentElement.getAttribute("product_key");
    const result = await axios
      .get("https://eplaza-backend.onrender.com/getProduct", {
        params,
        headers,
      })
      .catch((err) => console.log(err));
    setDetails(result.data);
    setOpen(true);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <AddToCart open={open} details={details} setOpen={setOpen}></AddToCart>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {props.products.map((product) => {
            return (
              <a
                onClick={display_popup}
                product_key={product.id}
                key={product.id}
                className="group"
              >
                <div className="aspect-h-1 border-gray-500 border-2 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.image}
                    alt="Product"
                    className="h-48 w-96 object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">
                  {product.product_name}
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {product.price}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
