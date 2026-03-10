export function isLoggedIn() {
  console.log(!!localStorage.getItem("token"));
  return !!localStorage.getItem("token");
}
