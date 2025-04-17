export const AlertSuccess = (title, message) =>{
    Swal.fire({
        icon: "success",
        title: title,
        text: message,
        showConfirmButton: false,
        timer: 1500
      });
}