import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addHeroToTeamAction, deleteHeroAction } from "../../redux/heroReducer";
import PorwerStats from "./PorwerStats";
import "./hero.css";
import Error from "../Error";

const Hero = ({ hero, addToTeam }) => {
  const dispatch = useDispatch();
  const { teamError, team, heroes } = useSelector((store) => store.hero);
  const [heroInYourTeam, setHeroInYourTeam] = useState(false)

  useEffect(() => {
    const checkHeroTeam = team.map((heroo) => {return heroo.id === hero.id})
    if(checkHeroTeam.includes(true)){
      setHeroInYourTeam(true)
    }else setHeroInYourTeam(false)
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team, heroes])

  return (
      <div className={heroInYourTeam&&addToTeam?"flip-card in-your-team " : "flip-card "}>
        <div className="flip-card-inner ">
          <div className="flip-card-front  ">
            <span className="hero-name">{hero.name}</span>
            <img
              src={hero.image.url}
              alt="Avatar"
              style={{ width: "18rem", height: "25rem", borderRadius: "20px" }}
            />
          </div>
             {/* detras de la card */}
          <div className="flip-card-back text-white"> 
            <h3 >{hero.name}</h3>
            <p> He is a {hero.biography.alignment} Hero </p>
            <PorwerStats powerStats={hero.powerstats} />
            {teamError.length > 0 && addToTeam && <Error error={teamError} />}
            <div
              className="btn-group p-2"
              role="group"
            >
              <Link
                to={{ pathname: "/HeroInfo", state: hero.id }}
                className="btn btn-outline-primary mr-2"
              >
                info
              </Link>
              {addToTeam ? (
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={() => dispatch(addHeroToTeamAction(hero.id))}
                >
                  add to team
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => dispatch(deleteHeroAction(hero.id))}
                >
                  delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Hero;
