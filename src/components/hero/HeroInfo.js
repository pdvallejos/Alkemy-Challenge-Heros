import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HeroInfo = (props) => {
  const usuarioActivo = useSelector((store) => store.login.activo);
  const { heroes } = useSelector((store) => store.hero);

  useEffect(() => {
    if (!usuarioActivo) return props.history.push("/login");
    if (heroes.length === 0) return props.history.push("/");
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuarioActivo, heroes]);

  const heroSelect = heroes.filter((hero) => hero.id === props.location.state);

  if (heroes.length === 0) return <div>No Hero</div>;
  const { image, name, biography, appearance, work } = heroSelect[0];
  return (
    heroes.length > 0 && (
      <>
        <div className="container mt-5">
          <div className="row">
            <div className=" col-md-6 col-sm-10">
              <img src={image.url} className="img-fluid" alt="hero-imagen" />
            </div>
            <div className="col-md-6 col-sm-10 d-flex align-items-center text-white ">
              <div className='fs-2'>
                <h1 className="display-2">{name}</h1>
                <p>
                  <span className="text-danger"> Height : </span>
                  {appearance.height.map((h) => (
                    <span key={h}> {h}, </span>
                  ))}
                </p>
                <p>
                  <span className=" text-danger"> Weight : </span>
                  {appearance.weight.map((w) => (
                    <span key={w}>{w}, </span>
                  ))}
                </p>
                <p>
                  <span className="  text-danger"> Aliases : </span>
                  {biography.aliases.map((alias) => (
                    <span key={alias}> {alias}, </span>
                  ))}
                </p>
                <p>
                  <span className="text-danger"> Eyed Color : </span>
                  {appearance["eye-color"]}
                </p>
                <p>
                  <span className="text-danger"> Hair Color : </span>
                  {appearance["hair-color"]}
                </p>
                <p>
                  <span className="text-danger">  Work Base : </span>
                  {work.base}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" text-center pb-4">
          <Link to="/">Go Back</Link>
        </div>
      </>
    )
  );
};

export default HeroInfo;
