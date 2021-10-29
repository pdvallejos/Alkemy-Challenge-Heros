import { useEffect } from "react";
// hooks react redux
import { useDispatch, useSelector } from "react-redux";
import { obtenerUsuarioAction } from "../redux/loginReducer";
import Hero from "./hero";
import Loading from "./Loading";
import Team from "./team";
import HeroSearch from "./team/HeroSearch";

const Home = ({ history }) => {
  const usuarioActivo = useSelector((store) => store.login.activo);
  const { heroes, loading2 } = useSelector((store) => store.hero);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!usuarioActivo) {
      return history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuarioActivo]);

  useEffect(() => {
    dispatch(obtenerUsuarioAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Team />
      <div className="mt-4">
        <HeroSearch />
      </div>
      {loading2 && (
        <div className="d-flex justify-content-center">
          <Loading />
        </div>
      )}
      <div className="container mt-4 pt-5  border border-white">
        <div className="row">
          {heroes &&
            heroes.map((hero) => (
              <div
                key={hero.id}
                className=" pl-5 col-xl-4 col-md-6 mb-5 col-sm-10 "
              >
                <Hero hero={hero} addToTeam={true} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
