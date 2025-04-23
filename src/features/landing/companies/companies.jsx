import React, { useEffect, useState } from 'react'
import { getCompanies } from './service/companies.service'

export const CompanyLanding = () => {
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    const fetchCompanie = async () => {
      try {
        const response = await getCompanies()
        setCompanies(response.data)
      } catch (error) {
        console.error("Error fetching categories:", err);
      }
    }

    fetchCompanie()
  }, [])

  return (
    <>
    <div className="container py-5 mt-5">
      <h1 className="text-center mb-4 text-info">Empresas asociadas a nosotros</h1>

      <div className="row justify-content-center">

        {companies.map((companie) => (
          <div key={companie.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 ">

            <div className="border rounded shadow-sm text-center p-4 bg-white h-100 shadow-lg">

              <h4 className="mb-2 text-primary">{companie.name}</h4>

              <p className="text-muted medium">NIT: {companie.nit}</p>

              <p className="text-muted medium">Teléfono: {companie.phone}</p>

              <p className="text-muted medium">Email: {companie.email}</p>

              <p className="text-muted medium">Dirección: {companie.address || "Sin dirección"}</p>

            </div>

          </div>
        ))}
      </div>
    </div>
  </>
  )
}
