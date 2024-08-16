import jwtDecode from "jwt-decode";

export const hasExpiredToken = (token) => {
  if (!token) {
    console.error("Token no proporcionado o es inválido");
    return true; // Tratar como expirado si no hay token
  }

  try {
    const { exp } = jwtDecode(token);
    const currentData = new Date().getTime() / 1000; // Convertir a segundos

    if (exp <= currentData) {
      return true; // Token ha expirado
    }
    return false; // Token es válido
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return true; // Tratar como expirado si hay un error al decodificar
  }
};
