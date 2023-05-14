import Swal from "sweetalert2";

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const swalOptions = {
  customClass: {
    container: "custom-container-class",
    title: "custom-title-class",
    content: "custom-content-class",
    confirmButton: "custom-confirm-button-class",
  },
};

export const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

export function ratedSuccessfullyPopUp(title, rating) {
  Swal.fire({
    ...swalOptions,
    icon: "success",
    title: `You successfully rated ${title} with ${rating} stars!`,
  });
}

export function errorOccurredPopUp() {
  Swal.fire({
    ...swalOptions,
    icon: "error",
    title: "Error occurred",
    text: "Please try again",
  });
}

export function errorRefreshPagePopUp() {
  Swal.fire({
    ...swalOptions,
    icon: "error",
    title: "Error occurred",
    text: "Refresh the page.",
  });
}

