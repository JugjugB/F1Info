import { useState, useEffect } from "react"
import useFetchRace from "../Custom Hooks/useFetchRace";

const Results = () => {
    const [results, setResults] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const {currentRound, currentRaceLoc} = useFetchRace();

    useEffect(() => {
        fetch('https://ergast.com/api/f1/current/last/results.json')
        .then(res => {
            return res.json();
        })
        .then(data => {
            let standingsData = data.MRData.RaceTable.Races[0].Results;
            let standingsList = [];
            standingsData.forEach(element => {
                let driverInfo = {name: `${element.Driver.givenName} ${element.Driver.familyName}`, team: element.Constructor.name, 
                                  position: element.position, points: element.points};
                standingsList.push(driverInfo);
            });
            setResults(standingsList);
            setIsPending(false);
        })
    });

    return (
        <div className="content">
            <div className="header">
                <h2>{currentRaceLoc}</h2>
                <h3>Round {currentRound}</h3>
            </div>
            {isPending && <div>Loading...</div>}
            <div className='positions'>
                {results && results.map((driver) => (
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

export default Results;