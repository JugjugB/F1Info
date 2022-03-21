import { useState } from 'react';
import { useEffect } from 'react';
import '../index.css';

const Teams = () => { 
    const [teamStandings, setTeamStandings] = useState(null);
    const [isPending, setPending] = useState(true);
     
    useEffect(() => {
        fetch('https://ergast.com/api/f1/current/constructorStandings.json')
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            let standingsData = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
            let standingsList = [];
            standingsData.forEach((element) => {
                let teamInfo = {name: `${element.Constructor.name}`, points: `${element.points}`};
                standingsList.push(teamInfo)
            });
            setPending(false);
            setTeamStandings(standingsList);
        })
        .catch(err => {
            console.log(err.message);
        });

    }, [])
    
    return (
        <div className="content">
            <h2 className='header'>Teams</h2>
                {isPending && <div>Loading...</div>}
                {teamStandings && 
            <div className='teams'>
                {teamStandings.map((team) => (
                    <div className="team" key={team.name}>
                        <h2>{team.name}</h2>
                        <h3>Points: {team.points}</h3>
                    </div>
                ))}
            </div>}
        </div>
      );
}
 
export default Teams;