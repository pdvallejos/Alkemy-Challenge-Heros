import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// importamos la acción
import { cerrarSesionAction } from "../redux/loginReducer";
import { resetHeroAction } from "../redux/heroReducer";
const Navbar = () => {
  const dispatch = useDispatch();
  // leer state
  const logueado = useSelector((store) => store.login.activo);
  // const media = window.matchMedia("(max-width: 468px)")
  // console.log(media);
  return (
    <>
      <div
        style={{
          fontFamily: "Dela Gothic One, cursive",
        }}
        className="text-center p-4"
      >
        <Link style={{ color: "red", textDecorationLine: "none" }} to="/">
          <h1 style={{fontSize:'6vw'}}>HERO<span className="text-muted">TEAM</span></h1>
        </Link>
      </div>
      <div className=" navbar navbar-dark bg-dark d-flex justify-content-around">
        <div className="">
          <div className="">
            {logueado ? (
              <NavLink className="btn btn-dark mr-2" to="/" exact>
                Home
              </NavLink>
            ) : (
              <div>
                <NavLink className="btn btn-dark mr-2" to="/login" exact>
                  Login
                </NavLink>
              </div>
            )}

            {logueado && (
              <button
                className="btn btn-dark"
                onClick={() => {
                  dispatch(cerrarSesionAction());
                  dispatch(resetHeroAction());
                }}
              >
                Sing Off
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
