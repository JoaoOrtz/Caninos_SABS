
export const AlertError = (title, message) =>{
    Swal.fire({
        icon: "error",
        title: title,
        text: message,
        showConfirmButton: false,
        timer: 1500
      });
}

