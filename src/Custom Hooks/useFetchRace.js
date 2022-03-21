import { useState, useEffect } from 'react';

const useFetchRace = () => {
    const [currentRound, setCurrentRound] = useState(1);
    const [currentRaceLoc, setCurrentRaceLoc] = useState(null);

    useEffect(() => {
        let currentDateRaw = new Date();
        let currentDate = new Date(currentDateRaw.toISOString().split('T')[0]);

        fetch('http://ergast.com/api/f1/2022.json')
        .then(res => {
            return res.json();
        })
        .then(data => {
            let roundData = data.MRData.RaceTable.Races
            roundData.every(function(element, index) {
                let roundDate = new Date(element.date);
                if (roundDate.getTime() > currentDate.getTime()) {
                    setCurrentRound(index);
                    return false;
                }
                else {
                    return true;
                }
            })
            setCurrentRaceLoc(roundData[currentRound-1].raceName)
        })
        .catch(err => {
            console.log(err.message);
        });
    });

    return {currentRound, currentRaceLoc};

}

export default useFetchRace;
