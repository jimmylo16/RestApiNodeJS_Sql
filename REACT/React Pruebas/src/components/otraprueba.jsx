import React, { useState } from 'react';

export default function Search() {
	const [ showResults1, setShowResults1 ] = useState(true);
	const [ showResults2, setShowResults2 ] = useState(true);
	const [ habitaciones, setHabitaciones ] = useState(1);

    const onClick=()=>{
        setHabitaciones(habitaciones+1);
        setShowResults1(false);
        if (habitaciones===3) {
            console.log(habitaciones);
            setShowResults2(false);
        }
    }

	return (
		<div>
			<input type="submit" value="Mas" onClick={onClick} />
			{ <Results showResults2={showResults2} showResults1={showResults1}/>}
		</div>
	);
}

const Results = ({ showResults2,showResults1 }) => (
    <>
        <div id="results" className="search-results" hidden={showResults1}>
            Some Results
        </div>
        <div id="results2" className="search-results2" hidden={showResults2}>
            asdasdasd
        </div>
    </>
);
