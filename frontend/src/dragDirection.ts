
export enum DragDirection {
	Up,
	Down,
	Left,
	Right
}

export function dragDirection(event: DragEvent): DragDirection | undefined {
	const srcElement = event.srcElement as HTMLElement;
	const dragX = srcElement.offsetLeft - event.x + (srcElement.offsetWidth / 2);
	const dragY = srcElement.offsetTop - event.y + (srcElement.offsetHeight / 2);
	const dragXAbs = Math.abs(dragX);
	const dragYAbs = Math.abs(dragY);
	const margin = 20;

	if (dragYAbs > margin && dragYAbs > (dragXAbs+margin)) {
		if (dragY > 0) {
			return DragDirection.Up;
		} else {
			return DragDirection.Down;
		}
	} else if (dragXAbs > margin && dragXAbs > (dragYAbs+margin)) {
		if (dragX > 0) {
			return DragDirection.Left;
		} else {
			return DragDirection.Right;
		}
	}
}
