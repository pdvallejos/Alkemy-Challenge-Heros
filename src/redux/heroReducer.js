import axios from "axios";
//-----------------state inicial-------------------//
const dataInicial = {
  loading2: false,
  heroes: [],
  team: [],
  error: "",
  teamError: "",
  powerstats: {
    intelligence: 0,
    strength: 0,
    speed: 0,
    durability: 0,
    power: 0,
    combat: 0,
  },
  weightTeam: 0,
  heightTeam: 0,
};
//-----------------type-------------------//
const LOADING_HERO = "LOADING_HERO";
const HERO_ERROR = "HERO_ERROR";
const GUARDAR_HEROES = "GUARDAR_HEROES";
const GUARDAR_HERO_A_TEAM = "GUARDAR_HERO_A_TEAM";
const HERO_NAME_ERROR = "HERO_NAME_ERROR";
const TEAM_ERROR = "TEAM_ERROR";
const DELETE_HERO = "DELETE_HERO";
const POWER_STATS_TEAM = "POWER_STATS_TEAM";
const RESET_HERO_ACTION = "RESET_HERO_ACTION";
const HEIGHT_WEIGHT = "HEIGHT_WEIGHT";

//-----------------reducer-------------------//
export default function usuarioReducer(state = dataInicial, action) {
  switch (action.type) {
    case LOADING_HERO:
      return { ...state, loading2: true, error: "" };
    case GUARDAR_HEROES:
      return { ...state, heroes: action.payload, loading2: false };
    case GUARDAR_HERO_A_TEAM:
      return {
        ...state,
        team: [...state.team, action.payload],
        powerstats: {
          intelligence: 0,
          strength: 0,
          speed: 0,
          durability: 0,
          power: 0,
          combat: 0,
        },
      };
    case HERO_NAME_ERROR:
      return { ...state, error: action.payload };
    case TEAM_ERROR:
      return { ...state, teamError: action.payload };
    case DELETE_HERO:
      return {
        ...state,
        powerstats: {
          intelligence: 0,
          strength: 0,
          speed: 0,
          durability: 0,
          power: 0,
          combat: 0,
        },
        team: [...state.team.filter((hero) => hero.id !== action.payload)],
      };
    case POWER_STATS_TEAM:
      return {
        ...state,
        powerstats: {
          intelligence:
            state.powerstats.intelligence + Number(action.payload.intelligence),
          strength: state.powerstats.strength + Number(action.payload.strength),
          speed: state.powerstats.speed + Number(action.payload.speed),
          durability:
            state.powerstats.durability + Number(action.payload.durability),
          power: state.powerstats.power + Number(action.payload.power),
          combat: state.powerstats.combat + Number(action.payload.combat),
        },
      };
    case RESET_HERO_ACTION:
      return { ...dataInicial };
    case HEIGHT_WEIGHT:
      return {
        ...state,
        weightTeam: action.payload.weight.toFixed(2),
        heightTeam: action.payload.height.toFixed(2),
      };

    default:
      return { ...state };
  }
}
//-----------------action-------------------//
export const searchHeroAction = (value) => async (dispatch) => {
  dispatch({
    type: LOADING_HERO,
  });
  try {
    const { heroName } = value;
    const res = await axios.get(
      `https://superheroapi.com/api/10220411460301249/search/${heroName}`
    );
    dispatch({
      //enviar data de hero a store
      type: GUARDAR_HEROES,
      payload: res.data.results,
    });
    console.log(res.data);
    if (res.data.error) {
      dispatch({
        type: HERO_NAME_ERROR,
        payload: res.data.error,
      });
    }
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: HERO_ERROR,
    });
  }
};
export const addHeroToTeamAction = (id) => (dispatch, getState) => {
  console.log("id de afuera", id);
  const { heroes, team } = getState().hero;
  const heroSelect = heroes.filter((hero) => hero.id === id);
  console.log(heroSelect, "hero");
  //checkear si hay 6 integrantes
  if (team.length === 6) {
    dispatch({
      type: TEAM_ERROR,
      payload: "Your team is Complete",
    });
    setTimeout(() => {
      dispatch({
        type: TEAM_ERROR,
        payload: "",
      });
    }, 1000);
    return;
  }

  //chequear si ya esta el heroe en el team
  const checkHeroTeam = team.map((hero) => {
    return hero.id === id;
  });
  if (checkHeroTeam.includes(true)) {
    dispatch({
      type: TEAM_ERROR,
      payload: "Hero is already in your team",
    });
    setTimeout(() => {
      dispatch({
        type: TEAM_ERROR,
        payload: "",
      });
    }, 1000);
    return;
  } else {
    //control 3 good heroes
    if (heroSelect[0].biography.alignment === "good") {
      const control3good = team.filter(
        (hero) => hero.biography.alignment === "good"
      );
      if (control3good.length === 3) {
        dispatch({
          type: TEAM_ERROR,
          payload: "To many GOOD Heroes",
        });
        setTimeout(() => {
          dispatch({
            type: TEAM_ERROR,
            payload: "",
          });
        }, 1000);
        return;
      } else {
        dispatch({
          type: GUARDAR_HERO_A_TEAM,
          payload: heroSelect[0],
        });
      }
    } else if (heroSelect[0].biography.alignment === "bad") {
      //control 3 bad heroes
      const control3bad = team.filter(
        (hero) => hero.biography.alignment === "bad"
      );
      if (control3bad.length === 3) {
        dispatch({
          type: TEAM_ERROR,
          payload: "To many BAD Heroes",
        });
        setTimeout(() => {
          dispatch({
            type: TEAM_ERROR,
            payload: "",
          });
        }, 1000);
        return;
      } else {
        dispatch({
          type: GUARDAR_HERO_A_TEAM,
          payload: heroSelect[0],
        });
      }
    } else {
      dispatch({
        type: GUARDAR_HERO_A_TEAM,
        payload: heroSelect[0],
      });
    }
  }
};

export const deleteHeroAction = (id) => (dispatch) => {
  dispatch({
    type: DELETE_HERO,
    payload: id,
  });
};

export const PowerstasTeam = () => (dispatch, getState) => {
  const { team } = getState().hero;
  var height = 0;
  var weight = 0;
  team.forEach((hero) => {
    if (hero.powerstats.intelligence === "null")
      hero.powerstats.intelligence = 0;
    if (hero.powerstats.strength === "null") hero.powerstats.strength = 0;
    if (hero.powerstats.speed === "null") hero.powerstats.speed = 0;
    if (hero.powerstats.durability === "null") hero.powerstats.durability = 0;
    if (hero.powerstats.power === "null") hero.powerstats.power = 0;
    if (hero.powerstats.combat === "null") hero.powerstats.combat = 0;
    dispatch({
      type: POWER_STATS_TEAM,
      payload: hero.powerstats,
    });
    if (
      Number(hero.appearance.height[1].slice(0, 3)) &&
      Number(hero.appearance.weight[1].slice(0, 3))
    ) {
      height += Number(hero.appearance.height[1].slice(0, 3));
      weight += Number(hero.appearance.weight[1].slice(0, 3));
    }
  });
  height = height / team.length;
  weight = weight / team.length;
  dispatch({
    type: HEIGHT_WEIGHT,
    payload: { height, weight },
  });
};
export const resetHeroAction = () => (dispatch) => {
  dispatch({
    type: RESET_HERO_ACTION,
  });
};
