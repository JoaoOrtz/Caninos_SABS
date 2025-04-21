import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCompanies } from './services/companies.service';
import { MdDelete } from 'react-icons/md';
import { RiEditBoxLine } from 'react-icons/ri';
import { SeeCompany } from './components/see/see';
import { AlertDeleteCompany } from './components/delete/deleteCompany';

export const CompanyDashboard = () => {
const navigate = useNavigate();

  const [dataCompany, setDataCompany] = useState([]);

  const [companyError, setCompanyError] = useState({
    show: false,
    title: "",
    message: "",
    type: "warning",
  });

  // Verificar categoria
  const checkCategory = (company) => {
    if (!company || company.length === 0) {
      setCompanyError({
        show: true,
        title: "Aviso",
        message: "No se encontró ninguna compañia.",
        type: "warning",
      });
      return true;
    }
    setCompanyError({ ...companyError, show: false });
    return false;
  };

  useEffect(() => {
    const data = async () => {
      try {
        const response = await getCompanies();
        console.log(response);
        
        const company = response?.data || []        
        setDataCompany(response.data);
        checkCategory(company)
      } catch (error) {
        setCompanyError({
          show: true,
          title: "Error",
          message: "Error al cargar las categorías",
          type: "danger"
        });
        console.error("Error fetching roles:", err);
      }
    };
    data();
  }, []);

  const viewForm = () => {
    navigate("/dashboard/nueva-compañia");
  };

  const viewUpdate = (id) => {
    navigate(`/dashboard/editar-compañia/${id}`);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row g-3 p-2 align-items-center">
          <div className="col">
            <h2>Lista De Compañias</h2>
          </div>
          <div className="col-auto ms-auto">
            <button
              type="button"
              className="btn btn-primary"
              onClick={viewForm}
            >
              Nueva Compañia
            </button>
          </div>
        </div>

        {/* Mensaje de error para productos */}
        {companyError.show && (
          <div className={`alert alert-${companyError.type} alert-dismissible fade show mb-2`} role="alert">
            <strong>{companyError.title}</strong> {companyError.message}
          </div>
        )}

        <div className="table-responsive">
          <table
            className="table table-hover align-middle shadow-sm"
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <thead style={{ backgroundColor: "#f0f0f0" }}>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>NIT</th>
                <th>Dirección</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dataCompany.map((e, i) => (
                <tr key={i}>
                  <td>{e.id}</td>
                  <td>{e.name}</td>
                  <td>{e.nit}</td>
                  <td>{e.address}</td>
                  <td>{e.phone}</td>
                  <td>{e.email}</td>

                  <td>
                    <div className="btn-group" role="group">
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() =>
                          AlertDeleteCompany(
                            e.id,
                            "¿De seguro quieres eliminar esta categoría?",
                            `La categoría que quieres eliminar es ${e.name}`, 
                            () => {
                              getCompanies().then((response) => {
                                const updatedCompany = response.data || [];
                                setDataCompany(updatedCompany);
                                checkCategory(updatedCompany); 
                              });
                            }
                            
                          )
                        }
                      >
                        <MdDelete />
                      </button>
                      <SeeCompany id={e.id} />
                      <button
                        type="button"
                        className="btn btn-outline-success btn-sm"
                        onClick={() => viewUpdate(e.id)}
                      >
                        <RiEditBoxLine />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
