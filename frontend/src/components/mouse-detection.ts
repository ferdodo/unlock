import { defineComponent } from "vue";
import { render } from "unlock/components/mouse-detection.template";
import { setMousePosition } from "unlock/observables/mouse-position";
import { emitMouseClick } from "unlock/observables/mouse-clicks";
import { emitMouseRightClick } from "unlock/observables/mouse-right-clicks";
import { emitMouseUp } from "unlock/observables/mouse-ups";
import { emitPlaygroundTouch } from "unlock/observables/playground-touch";
import { Block } from "blockwise";
import { TouchTracking } from "core";

export const MouseDetectionComponent = defineComponent({
    props: {
        x: { type: Number, required: true },
        y: { type: Number, required: true }
    },
	setup(props: { x: number, y: number }) {
		const x = props.x - 1;
		const y = props.y - 1;
		const position: Block = { x, y, w: 1, h: 1 };
		let startX = 0;
		let startY = 0;

		function handleTouchStart(touchEvent: TouchEvent) {
			const touch = touchEvent.targetTouches.item(0);

			if (touch === null) {
				return;
			}
			
			startX = touch.clientX;
			startY = touch.clientY;
			emitTouchTracking(touchEvent);
		}

		function createTouchTracking(touch: Touch): TouchTracking {
			return {
				cordStartX: x,
				cordStartY: y,
				startX,
				startY,
				x: touch.clientX,
				y: touch.clientY
			};
		}

		function emitTouchTracking(touchEvent: TouchEvent) {
			const touch = touchEvent.targetTouches.item(0);	

			if (touch === null) {
				return;
			}

			const touchTracking = createTouchTracking(touch);
			emitPlaygroundTouch(touchTracking);
		}

		return {
            clickMouseDetectionComponent: () => emitMouseClick(position),
            hoverMouseDetectionComponent: () => setMousePosition(position),
            rightClickDetectionComponent: () => emitMouseRightClick(position),
            handleTouchStart,
            emitTouchTracking,
            emitMouseUp,
            x: props.x,
            y: props.y,
            console
        };
	},
	render
});
