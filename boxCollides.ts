
export function boxCollides(
	aX: number,
	aY: number,
	aW: number,
	aH: number,
	bX: number,
	bY: number,
	bW: number,
	bH: number
) {
	return aX + aW> bX
		&& aX < bX+ bW
		&& aY + aH > bY
		&& aY < bY + bH;
}
