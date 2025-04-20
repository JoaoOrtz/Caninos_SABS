import React, { useEffect, useState } from "react";
import { getCategories } from "./service/categories.services";

export const CategoriesLanding = () => {
  const [categories, setCategories] = useState([])
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories()
        setCategories(response.data.categories)
      } catch (error) {
        console.error("Error fetching categories:", err);
      }
    }

    fetchCategories()
  }, [])
  
  return (
    <>
    <div className="container py-5 mt-5">
      <h1 className="text-center mb-4 text-info">Categorías de Nuestros Productos</h1>

      <div className="row justify-content-center">

        {categories.map((categorie) => (
          <div key={categorie.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 ">

            <div className="border rounded shadow-sm text-center p-4 bg-white h-100 shadow-lg">

              <h4 className="mb-2 text-primary">{categorie.name}</h4>

              <p className="text-muted medium">{categorie.description}</p>

            </div>

          </div>
        ))}
      </div>
    </div>
  </>
  );
};
