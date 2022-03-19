const TeamList = ({teams, handleDelete}) => {
    
    return(
        <div className='teams'>
            {teams.map((team) => (
                <div className="team" key={team.name}>
                    <h2>{team.name}</h2>
                    <h3>Points: {team.points}</h3>
                    <button onClick={() => handleDelete(team.name)}>Delete Team</button>
                </div>
            ))}
        </div>
    );
}
 
export default TeamList;