import { useState, useEffect } from 'react';
import useFetchRace from '../Custom Hooks/useFetchRace';

const Qualifying = () => {
    const [qualiStandings, setQualiStandings] = useState(null);
    const [isPending, setIsPending] = useState(true)
    const {currentRound, currentRaceLoc} = useFetchRace();

    useEffect(() => {
        fetch(`https://ergast.com/api/f1/2022/${currentRound}/qualifying.json`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            let qualiData = data.MRData.RaceTable.Races[0].QualifyingResults;
            let standings = [];
            qualiData.forEach(element => {
                let qualiDriver = {name: `${element.Driver.givenName} ${element.Driver.familyName}`, 
                                   team: element.Constructor.name, position: element.position};
                standings.push(qualiDriver);
            });
            setQualiStandings(standings);
            setIsPending(false);
        })
        .catch(err => {
            console.log(err.message);
        });
    })

    return (
        <div className="content">
            <div className="header">
                <h2>{currentRaceLoc}</h2>
                <h3>Round {currentRound}</h3>
            </div>
            {isPending && <div>Loading...</div>}
            <div className='positions'>
                {qualiStandings && qualiStandings.map((driver) => (
                    <div className="position" key={driver.position}>
                        <h2>{driver.position}</h2>
                        <h3>{driver.name}</h3>
                        <h3>{driver.team}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Qualifying;