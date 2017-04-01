import React from 'react'
import './style.css'

export const ResultsList = ({arrayOfPi, pi}) => {
	const results = arrayOfPi.map((value) => {
		return <p>{value}</p>
	})

	if (pi && arrayOfPi.length > 0) {		
		return (
			<div className="ResultsList">
				<p>Average value of Pi: {pi}</p>
				<p>Individual values: </p>
				{results}
			</div>
		)
	} else {
		return null
	}
}