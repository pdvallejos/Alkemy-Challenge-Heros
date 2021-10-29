import axios from "axios";
//-----------------state inicial-------------------//
const dataInicial = {
  loading: false,
  activp: false,
  error: "",
};
//-----------------type-------------------//
const LOADING = "LOADING";
const USER_EXITO = "USER_EXITO";
const CERRAR_SESION = "CERRAR_SESION";
const USER_ERROR_INVALID = "USER_ERROR_INVALID";

//-----------------reducer-------------------//
export default function usuarioReducer(state = dataInicial, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case USER_ERROR_INVALID:
      return { ...state, loading: false, error: action.payload };
    case USER_EXITO:
      return { ...state, loading: false, activo: true };
    case CERRAR_SESION:
      return { ...dataInicial };
    default:
      return { ...state };
  }
}
//-----------------action-------------------//

export const iniciarSesionAction = (values) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  const { email, password } = values;
  try {
    // Mala direccion web al enviar datos del usuario al no ser https //
    const res = await axios.post("http://challenge-react.alkemy.org/", {
      email,
      password,
    });
    localStorage.setItem("token", res.data.token);
    dispatch({
      type: USER_EXITO,
    });
  } catch (error) {
    if(!error)return ;
    dispatch({
      type: USER_ERROR_INVALID,
      payload: error.response.data.error,
    });
    setTimeout(() => {
      dispatch({
        type: CERRAR_SESION
      })
    }, 3000);
  }
};
export const obtenerUsuarioAction = () => (dispatch) => {
  // localStorage.setItem("token", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJjaGFsbGVuZ2VAYWxrZW15Lm9yZyIsImlhdCI6MTUxNjIzOTAyMn0.ilhFPrG0y7olRHifbjvcMOlH7q2YwlegT0f4aSbryBE');
  if (localStorage.getItem("token")) {
    dispatch({
      type: USER_EXITO,
    });
  } else {
    dispatch({
      type: CERRAR_SESION,
    });
  }
};
export const cerrarSesionAction = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: CERRAR_SESION,
  });
};
