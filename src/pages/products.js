import { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router";
import Rating from "@mui/material/Rating";
import { ToastContainer, toast } from "react-toastify";
import UserContext from "./UserContext";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Products() {
  const notify = () => {
    toast.dismiss()
    toast("Item added to cart", { autoClose: 3000 });
  };
  const notifyWish = () => {
    toast.dismiss()
    toast("Item added to WishList", { autoClose: 3000 });
  };
  const products = useContext(UserContext);
  const user_id = localStorage.getItem("user_id");

  const [clickedHearts, setClickedHearts] = useState({}); // Store state per product

  const FetchData = async (product) => {
    const data = new FormData();
    data.append("user_id", user_id);
    data.append("product_id", product.product_id);
    const response = await axios.post(
      "https://amazon.indianhackerslab.com/insert-cart.php",
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    if (response) notify();
  };

  const InsertWish = async (product) => {
    const data = new FormData();
    data.append("user_id", user_id);
    data.append("product_id", product.product_id);
    const response = await axios.post(
      "https://amazon.indianhackerslab.com/Insert_wishlist_item.php",
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (response) {
      notifyWish();
      setClickedHearts((prev) => ({
        ...prev,
        [product.product_id]: !prev[product.product_id], // Toggle for specific product
      }));
    }
  };

  return (
    <div className="products">
      <div className="blocks">
        {products ? (
          products.map((product) => (
            <div className="block" key={product.product_id}>
              <img className="img-prods" src={product.images} alt={product.name} />
              <FavoriteIcon
                className={`heart-icon ${clickedHearts[product.product_id] ? "red" : "pink"}`}
                onClick={() => InsertWish(product)}
              />
              <p>{product.name}</p>
              <div className="rating-div">
                <p>Ratings :</p>
                <Rating readOnly defaultValue={product.rating} precision={1} />
              </div>
              <div className="button-div">
                <Link to={`/item-details/${product.product_id}`} className="btn btn-primary">
                  Details
                </Link>
                <button onClick={() => FetchData(product)} className="btn btn-warning">
                  Cart
                </button>
              </div>
              <ToastContainer />
            </div>
          ))
        ) : (
          <div>
            <p><b>No products</b></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
