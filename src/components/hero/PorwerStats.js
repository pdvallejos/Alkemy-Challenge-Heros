



const PorwerStats = ({ powerStats }) => {
  const namesPowerStat = Object.keys(powerStats);
  const valuesPowerStat = Object.values(powerStats);
  const powerStatsArray = []
  var powerStatsValue = {
    value:'',
    name:''
  }
  for (let i = 0; i < valuesPowerStat.length; i++) {
    if(valuesPowerStat[i]==='null')return null;
    powerStatsValue = {
      value: Number(valuesPowerStat[i]),
      name: namesPowerStat[i]
    }
    powerStatsArray.push(powerStatsValue)
  }
  const powerStatsArrayOrder = (powerStatsArray.sort(function(a, b)  { return b.value - a.value } ));

  return (
    <>
      {powerStatsArrayOrder.map((powerstat, i) => ( //name.power bla bla
        <div className="progress" style={{background:'#151515' ,height: "25px" }} key={i}>
          <div
            className="text-white progress-bar "
            role="progressbar"
            style={{
              background:'#14cc60' ,
              width: `${powerstat.value}%`,
              margin: "2px 1px ",

            }}
          >
            {` ${powerstat.name}: ${powerstat.value}%`}
          </div>
        </div>
      ))}
    </>
  );
};

export default PorwerStats;
