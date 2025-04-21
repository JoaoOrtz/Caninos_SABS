import { deleteCompany } from '../../services/companies.service';

export const AlertDeleteCompany = (id, title, message, refreshData) => { 
  Swal.fire({
    title: title,
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await deleteCompany(id);
        if (response.status === 204) {
          Swal.fire({
            title: "¡Eliminado!",
            text: "La categoría ha sido eliminado.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          // Llama a la función para actualizar los datos
          if (refreshData) refreshData();
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.message || "No se pudo eliminar la categoría",
          icon: "error"
        });
      }
    }
  });
};
