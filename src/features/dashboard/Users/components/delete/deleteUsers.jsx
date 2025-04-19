import { deleteUsers } from "../../services/users.service";

export const AlertDelete = (id, title, message, refreshData) => {
  Swal.fire({
    title: title,
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await deleteUsers(id);
        if (response.status === 200) {
          Swal.fire({
            title: "¡Eliminado!",
            text: "El Usuario ha sido eliminado.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          refreshData();
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.message || "No se pudo eliminar el usurio",
          icon: "error",
        });
      }
    }
  });
};
