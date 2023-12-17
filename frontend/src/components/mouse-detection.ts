import { defineComponent } from "vue";
import { render } from "unlock/components/mouse-detection.template";
import { setMousePosition } from "unlock/observables/mouse-position";
import { emitMouseClick } from "unlock/observables/mouse-clicks";
import { emitMouseRightClick } from "unlock/observables/mouse-right-clicks";
import { emitMouseUp } from "unlock/observables/mouse-ups";
import { Block } from "blockwise";

export const MouseDetectionComponent = defineComponent({
    props: {
        x: { type: Number, required: true },
        y: { type: Number, required: true }
    },
	setup(props: { x: number, y: number }) {
		const x = props.x - 1;
		const y = props.y - 1;
		const position: Block = { x, y, w: 0, h: 0 };

		return {
            clickMouseDetectionComponent: () => emitMouseClick(position),
            hoverMouseDetectionComponent: () => setMousePosition(position),
            rightClickDetectionComponent: () => emitMouseRightClick(position),
            mouseUpDetectionComponent: () => emitMouseUp(position),
            x: props.x,
            y: props.y
        };
	},
	render
});
