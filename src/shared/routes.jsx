import React from "react";
import { Route, Routes } from "react-router-dom";
import { Landing } from "../features/landing/landing";
import { Home } from "../features/landing/home/home";
import { About } from "../features/landing/About/about";
import { ProductsLanding } from "../features/landing/Products/products";
import { ServicesLanding } from "../features/landing/services/services";
import { CategoriesLanding } from "../features/landing/categories/categories";
import { Login } from "../features/auth/login";
import { Record } from "../features/auth/record";
import { Layout } from "../features/dashboard/layout";
import { UserDashboard } from "../features/dashboard/Users/users";
import { RoleDashboard } from "../features/dashboard/roles/roles";
import { CompanyDashboard } from "../features/dashboard/companies/company";
import { ProductDashboard } from "../features/dashboard/products/product";
import { CategoryDashboard } from "../features/dashboard/categories/category";
import { ServiceDashboard } from "../features/dashboard/services/service";
import { PrivateRoute } from "../features/dashboard/components/privateRoutes";

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
          <Route path="Servicios" element={<ServicesLanding />} />
          <Route path="Categorias" element={<CategoriesLanding />} />
        </Route>

        {/* Ingreso */}
        <Route path="/login" element={<Login />} />
        <Route path="/Registrarse" element={<Record />} />

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
          <Route path="Roles" element={<RoleDashboard />} />
          <Route path="Compañias" element={<CompanyDashboard />} />
          <Route path="Productos" element={<ProductDashboard />} />
          <Route path="Categorias" element={<CategoryDashboard />} />
          <Route path="Servicios" element={<ServiceDashboard />} />
        </Route>
      </Routes>
    </>
  );
};
