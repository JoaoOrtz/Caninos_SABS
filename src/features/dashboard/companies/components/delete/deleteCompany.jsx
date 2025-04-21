import React, { useState } from 'react';
import { FiTrash2 } from "react-icons/fi";
import { deleteCompany } from '../../services/companyService';
import { AlertSuccess } from '../../../../../shared/alert/success';

export const DeleteCompany = ({ id, onDeleteSuccess }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar esta compañía?')) {
            return;
        }

        setIsDeleting(true);
        setError(null);
        
        try {
            const response = await deleteCompany(id);
            if (response.data.status === "success") {
                AlertSuccess('Compañía eliminada', 'La compañía se ha eliminado correctamente');
                if (onDeleteSuccess) {
                    onDeleteSuccess();
                }
            }
        } catch (err) {
            console.error('Error deleting company:', err);
            setError(err.response?.data?.message || 'Error al eliminar la compañía');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button 
            type="button" 
            className="btn btn-outline-danger" 
            onClick={handleDelete}
            disabled={isDeleting}
        >
            {isDeleting ? (
                <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span className="visually-hidden">Eliminando...</span>
                </>
            ) : (
                <FiTrash2 />
            )}
        </button>
    );
};