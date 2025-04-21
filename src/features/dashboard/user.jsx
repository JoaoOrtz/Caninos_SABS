    import React, { useEffect, useState } from 'react';
    import { useNavigate, useParams } from 'react-router-dom';
    import { getOneUser } from './Users/services/users.service';

    export const User = () => {
        const { id } = useParams();
        const navegate = useNavigate()
        const [dataUser, setDataUser] = useState(null);
        const [loading, setLoading] = useState(true);

        // Función para formatear la fecha
        const formatDate = (dateString) => {
            if (!dateString) return 'N/A';
            const date = new Date(dateString);
            return date.toLocaleString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        };

        useEffect(() => {
            const fetchUsers = async () => {
                try {
                    let response = await getOneUser(id);
                    setDataUser(response.data);
                } catch (error) {
                    console.error("Error al traer los usuarios:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchUsers();
        }, [id]);

        const viewUpdate = (id) => {
            navegate(`/dashboard/Usuario/${id}/editar`);
        }



        if (loading) return <div>Cargando...</div>;
        if (!dataUser) return <div>Usuario no encontrado</div>;

        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-sm">
                            <div className="card-header bg-primary text-white">
                                <h3 className="card-title mb-0">Detalles del Usuario</h3>
                            </div>
                            <div className="card-body">
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Nombre Completo</label>
                                            <div className="form-control bg-light">{dataUser.fullName}</div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Email</label>
                                            <div className="form-control bg-light">{dataUser.email}</div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Rol</label>
                                            <div className="form-control bg-light">{dataUser?.role?.name}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Compañía</label>
                                            <div className="form-control bg-light">{dataUser?.company?.name}</div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Fecha de Creación</label>
                                            <div className="form-control bg-light">
                                                {formatDate(dataUser.createdAt)}
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Última Actualización</label>
                                            <div className="form-control bg-light">
                                                {formatDate(dataUser.updatedAt)}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-end gap-2">
                                    <button className="btn btn-outline-secondary" onClick={() => viewUpdate(id)} >
                                        Editar Usuario
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };