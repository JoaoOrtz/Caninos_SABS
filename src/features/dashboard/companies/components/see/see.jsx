import React, { useEffect, useState } from 'react';
import { FiEye } from "react-icons/fi";
import { getCompany } from '../../services/companies.service';


export const SeeCompany = ({ id }) => {
    const [companyData, setCompanyData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getCompany(id);
            setCompanyData(response.data);
        };
        fetchData();
    }, [id]);

    // Usa el ID de la compañía para crear un ID único para el modal
    const modalId = `companyModal-${id}`;
    const modalLabelId = `companyModalLabel-${id}`;

    return (
        <>
            <button 
                type="button" 
                className="btn btn-outline-warning" 
                data-bs-toggle="modal" 
                data-bs-target={`#${modalId}`} // Corregido aquí
            >
                <FiEye />
            </button>

            <div 
                className="modal fade" 
                id={modalId} 
                tabIndex="-1" 
                aria-labelledby={modalLabelId} // Corregido aquí
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={modalLabelId}>
                                Detalles de la Compañía
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body" style={{ overflowX: 'auto' }}>
                            {companyData ? (
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre</th>
                                            <th>NIT</th>
                                            <th>Dirección</th>
                                            <th>Teléfono</th>
                                            <th>Correo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{companyData.id}</td>
                                            <td>{companyData.name}</td>
                                            <td>{companyData.nit || 'N/A'}</td>
                                            <td>{companyData.address || 'N/A'}</td>
                                            <td>{companyData.phone || 'N/A'}</td>
                                            <td>{companyData.email || 'N/A'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            ) : (
                                <p>Cargando información de la compañía...</p>
                            )}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
