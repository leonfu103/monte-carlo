import React, { Component } from 'react'
import './style.css'

const CanvasWidth = 500
const CanvasHeight = 500

export class Canvas extends Component {
	constructor (props) {
		super(props)

		this.draw = this.draw.bind(this)
	}

	componentDidMount () {
		this.draw()
	}

	componentDidUpdate () {
		this.draw()
	}

	draw () {
		const {
			gridSize,
			circleRadius,
			points
		} = this.props
		const canvas = this.refs.canvas
		const ctx = canvas.getContext('2d')
		const centerX = gridSize / 2
		const centerY = centerX
		const scale = CanvasWidth / gridSize

		//reset canvas every time before redrawing
		canvas.width = canvas.height

		ctx.scale(scale, scale)
		// draw a circle
		ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI);
		ctx.fillStyle = "#de8585"
		ctx.fill()

		// draw the random dots
		ctx.fillStyle = "#000000"
		points.forEach((point) => {
			ctx.fillRect(point.x, gridSize - point.y, 3, 3)
		})
		ctx.stroke()
	}

	render () {
		return (
			<div className='Canvas'>
				<canvas 
					className='Canvas__canvas'
					ref='canvas'
					width={CanvasWidth}
					height={CanvasHeight} />
			</div>
		)		
	}
}

Canvas.propTypes = {
	gridSize: React.PropTypes.number,
	circleRadius: React.PropTypes.number,
	points: React.PropTypes.array,
}
