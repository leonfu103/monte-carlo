import React, { Component } from 'react'
import { Canvas } from '../Canvas'
import { ResultsList } from '../ResultsList'
import { generateRandomPoints, calcPointsInsideCircle, calcPi } from '../lib/pi'
import './style.css'

export class MainContainer extends Component {
	constructor (props) {
		super(props)
		this.state = {
			gridSize: undefined,
			circleDiameter: undefined,
			number: undefined,
			iteration: undefined,
			points: [],
			arrayOfPi: [],
			averagePi: undefined
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.estimatePIByMonteCarlo = this.estimatePIByMonteCarlo.bind(this)
		this.onChange = this.onChange.bind(this)
	}

	handleSubmit (e) {
		e.preventDefault()
		const {
			gridSize,
			circleDiameter,
			number,
			iterations
		} = this.state

		this.estimatePIByMonteCarlo(gridSize, circleDiameter, number, iterations)
	}

	onChange (e) {
		e.preventDefault()
		const {
			name,
			value
		} = e.target

		this.setState({
			[name]: value
		})
	}

	estimatePIByMonteCarlo (gridSize, circleDiameter, n, iterations) {
		const centerX = gridSize / 2
		const centerY = centerX
		const radius = circleDiameter / 2
		let i, pointsInsideCircle, average = 0
		let points, arrayOfPi = []

		for (i = 0; i < iterations; ++i) {
			points = generateRandomPoints(gridSize, n)
			pointsInsideCircle = calcPointsInsideCircle(points, centerX, centerY, radius)
			arrayOfPi.push(calcPi(gridSize, radius, pointsInsideCircle, n))
		}

		average = arrayOfPi.reduce((acc, value) => {
			return acc + value
		}, 0) / iterations
		
		this.setState({
			points: points,
			arrayOfPi: arrayOfPi,
			averagePi: average
		})
	}

	render () {
		const {
			gridSize,
			circleDiameter,
			number,
			iteration,
			points,
			arrayOfPi,
			averagePi
		} = this.state

		return (
			<div className='MainContainer'>
				<Canvas
					gridSize={gridSize}
					circleRadius={circleDiameter / 2}
					points={points} />
				<ResultsList arrayOfPi={arrayOfPi} pi={averagePi}/>
				<form onSubmit={this.handleSubmit}>
					<input
						type='number'
						name='gridSize'
						placeholder='Grid Size'
						value={gridSize}
						onChange={this.onChange} />
					<input
						type='number'
						name='circleDiameter'
						placeholder='Circle Diameter'
						value={circleDiameter}
						onChange={this.onChange} />
					<input
						type='number'
						name='number'
						placeholder='Number of Points'
						value={number}
						onChange={this.onChange} />
					<input
						type='number'
						name='iterations'
						placeholder='Iteration times'
						value={iteration}
						onChange={this.onChange} />
					<input
						type='submit'
						value='Submit' />
				</form>
			</div>
		)
	}
}
