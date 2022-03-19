import { useState } from 'react';
import { useEffect } from 'react';
import './index.css';
import TeamList from './TeamList';

const Home = () => { 
    const [teams, setTeams] = useState(null);
    const [isPending, setPending] = useState(true);
     

    const handleDelete = (id) => {
        const newTeams = teams.filter(team => team.name !== id);
        setTeams(newTeams);
    }

    async function getStandings() {
        const response = await fetch('https://ergast.com/api/f1/current/constructorStandings.json');
        const standingsData = await response.json();
        let standingList = await standingsData.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        let teamStandings = [];
        standingList.forEach((element) => {
            let teamInfo = {name: `${element.Constructor.name}`, points: `${element.points}`};
            teamStandings.push(teamInfo)
        });
        return teamStandings;
    }

    useEffect(() => {
        fetch('https://ergast.com/api/f1/current/constructorStandings.json')
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                let standingList = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
                let teamStandings = [];
                standingList.forEach((element) => {
                    let teamInfo = {name: `${element.Constructor.name}`, points: `${element.points}`};
                    teamStandings.push(teamInfo)
                });
                setPending(false);
                setTeams(teamStandings);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [])
    
    return (
        <div className="home">
            <h2>Teams</h2>
            {isPending && <div>Loading...</div>}
            {teams && <TeamList teams={teams} handleDelete={handleDelete}/>}
        </div>
      );
}
 
export default Home;