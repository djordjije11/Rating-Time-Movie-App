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

export function successToastPopUp(title) {
  Toast.fire({
    icon: "success",
    title,
  });
}

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

export function errorOccurredPopUp(text) {
  if (!text) {
    text = "Please try again";
  }
  Swal.fire({
    ...swalOptions,
    icon: "error",
    title: "Error occurred",
    text,
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

export function invalidUsernamePopUp() {
  Swal.fire({
    ...swalOptions,
    icon: "warning",
    title: "Invalid Username",
    text: "Username must be between 3 and 40 characters",
  });
}

export function invalidPasswordPopUp() {
  Swal.fire({
    ...swalOptions,
    icon: "warning",
    title: "Invalid Password",
    text: "Password must be between 8 and 40 characters. Password must contain at least one uppercase letter, at least one lowercase letter and at least one digit.",
  });
}

export function invalidConfirmPasswordPopUp() {
  Swal.fire({
    ...swalOptions,
    icon: "warning",
    title: "Invalid Password",
    text: "Password and confirmed password are not the same.",
  });
}

export function invalidEmailPopUp() {
  Swal.fire({
    ...swalOptions,
    icon: "warning",
    title: "Invalid Email",
    text: "Email must be in the next format: _____@____.____",
  });
}

export function invalidLoginCredentials() {
  Swal.fire({
    ...swalOptions,
    icon: "error",
    title: "Invalid credentials",
    text: "Please check your username and password.",
  });
}

export async function logoutQuestionPopUpAsync() {
  const { value: shouldLogout } = await Swal.fire({
    ...swalOptions,
    title: "Log Out",
    text: "Are you sure you want to log out?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Log Out",
    cancelButtonText: "Cancel",
  });
  return shouldLogout;
}
