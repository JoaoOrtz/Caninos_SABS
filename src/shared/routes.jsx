import React from "react";
import { Route, Routes } from "react-router-dom";
import { Landing } from "../features/landing/landing";
import { Home } from "../features/landing/home/home";
import { About } from "../features/landing/About/about";
import { ProductsLanding } from "../features/landing/Products/products";
import { CategoriesLanding } from "../features/landing/categories/categories";
import { Login } from "../features/auth/login";
import { Layout } from "../features/dashboard/layout";
import { UserDashboard } from "../features/dashboard/Users/users";
import { RoleDashboard } from "../features/dashboard/roles/roles";
import { CompanyDashboard } from "../features/dashboard/companies/company";
import { ProductDashboard } from "../features/dashboard/products/product";
import { CategoryDashboard } from "../features/dashboard/categories/category";
import { PrivateRoute } from "../features/dashboard/components/privateRoutes";  // Si usas PrivateRoute
import { FormProduct } from "../features/dashboard/products/components/create/formProduct";
import { FormProductUpdate } from "../features/dashboard/products/components/update/formProductUpdate";
import { ObjectVision } from "../features/dashboard/objetivevision/objetiveVision";
import { CreateUser } from "../features/dashboard/Users/components/create/createUsers";
import { FormUserUpdate } from "../features/dashboard/Users/components/update/updateUsers";
import { FormRols } from "../features/dashboard/roles/components/create/formRoles";
import { FormRolUpdate } from "../features/dashboard/roles/components/update/formRolUpdate";
import { CreateCategorie } from "../features/dashboard/categories/components/create/createCategorie";
import { UpdateCategorie } from "../features/dashboard/categories/components/update/UpdateCategorie";


export const RouteComponent = () => {
  return (
    <>
      <Routes>
        {/* Ruta de la landing */}
        <Route path="/" element={<Landing />}>
          <Route index element={<Home />} />
          <Route path="inicio" element={<Home />} />
          <Route path="Sobre-Nosotros" element={<About />} />
          <Route path="productos" element={<ProductsLanding />} />
          <Route path="Categorias" element={<CategoriesLanding />} />
        </Route>

        {/* Ingreso */}
        <Route path="/login" element={<Login />} />

        {/* Rutas de la dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="Usuarios" element={<UserDashboard />} /> 
          <Route path="nuevo-user" element={<CreateUser/>} />
          <Route path="editar-user/:id" element={<FormUserUpdate/>} />
          <Route path="Usuarios" element={<UserDashboard />} /> 
          <Route path="nuevo-user" element={<CreateUser/>} />
          <Route path="editar-user/:id" element={<FormUserUpdate/>} />
          <Route path="Roles" element={<RoleDashboard />} />
          <Route path="nuevo-Rol" element={<FormRols/>} />
          <Route path="editar-Rol/:id" element={<FormRolUpdate/>} />
          <Route path="Compañias" element={<CompanyDashboard />} />
          <Route path="Productos" element={<ProductDashboard />} />
          <Route path="nuevo-producto" element={<FormProduct />} />
          <Route path="editar-producto/:id" element={<FormProductUpdate />} />
          <Route path="categorias" element={<CategoryDashboard />} />
          <Route path="nueva-categoria" element={<CreateCategorie/>} />
          <Route path="editar-categoria/:id" element={<UpdateCategorie/>} />
          <Route path="Objetico-Vision" element={<ObjectVision />} />
        </Route>
      </Routes>
    </>
  );
};
