import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteCompany, getCompanies } from './services/companies.service';

export const CompanyDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '' });
  const navigate = useNavigate();

  const fetchCompanies = async () => {
    const res = await getCompanies();
    setCompanies(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta compañía?")) {
      await deleteCompany(id);
      setToast({ show: true, message: 'Compañía eliminada correctamente' });
      fetchCompanies();
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Gestión de Compañías</h2>

      <button className="btn btn-primary mb-3" onClick={() => navigate("/dashboard/nueva-compañia")}>
        + Nueva Compañía
      </button>

      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td>{company.name}</td>
              <td>{company.address}</td>
              <td>{company.phone}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/dashboard/editar-compañia/${company.id}`)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(company.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Toast */}
      {toast.show && (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div className="toast show bg-success text-white" role="alert">
            <div className="toast-body">
              {toast.message}
              <button type="button" className="btn-close btn-close-white ms-2" onClick={() => setToast({ ...toast, show: false })}></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
