import { deleteProduct } from '../../service/product.service';

export const AlertDelete = (id, title, message) => { 
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
        const response = await deleteProduct(id);
        if (response.success === "success") {
          Swal.fire({
            title: "¡Eliminado!",
            text: "El producto ha sido eliminado.",
            icon: "success"
          });
          return true;
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.message || "No se pudo eliminar el producto",
          icon: "error"
        });
        return false;
      }
    }
  });
};