import { useState } from "react";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://Localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          description: "",
          image: "",
        }),
      });
      const data = await response.json();
      console.log("Product added:", data);
    } catch (error) {
      console.log("Error adding product:", error);
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>

      <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <br />
      <input type="number" placeholder="Product Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <br />
      <br />
      <button onClick={handleSubmit}>Add Product</button>
    </div>
  );
}
export default AddProduct;
