export const generateRandomPoints = (gridSize, n) => {
	let points = []
	let i

	for (i = 0; i < n; ++i) {
		points.push({
			x: Math.round(Math.random() * gridSize),
			y: Math.round(Math.random() * gridSize)
		})
	}

	return points
}

export const calcPointsInsideCircle = (points, centerX, centerY, radius) => {
	return points.reduce((acc, p) => {
		if (Math.sqrt((p.x - centerX) * (p.x - centerX) + (p.y - centerY) * (p.y - centerY)) <= radius) {
			return acc + 1
		} else {
			return acc
		}
	}, 0)
}

export const calcPi = (gridSize, radius, pointsInsideCircle, n) => {
	return (gridSize * gridSize) / (radius * radius) * (pointsInsideCircle / n)
}
