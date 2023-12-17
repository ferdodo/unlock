import { defineComponent } from "vue";
import { render } from "unlock/components/mouse-detection.template";
import { setMousePosition } from "unlock/observables/mouse-position";
import { emitMouseClick } from "unlock/observables/mouse-clicks";
import { emitMouseRightClick } from "unlock/observables/mouse-right-clicks";

export const MouseDetectionComponent = defineComponent({
	components: {
    },
    props: {
        x: { type: Number, required: true },
        y: { type: Number, required: true }
    },
	setup(props: { x: number, y: number }) {
        function clickMouseDetectionComponent() {
            emitMouseClick({
                x: props.x-1,
                y: props.y-1,
                w: 0,
                h: 0
            });
        }

        function hoverMouseDetectionComponent() {
            setMousePosition({
                x: props.x-1,
                y: props.y-1,
                w: 0,
                h: 0
            });
        }

        function rightClickDetectionComponent() {
            emitMouseRightClick({
                x: props.x-1,
                y: props.y-1,
                w: 0,
                h: 0
            });
        }

		return {
            clickMouseDetectionComponent,
            hoverMouseDetectionComponent,
            rightClickDetectionComponent,
            x: props.x,
            y: props.y
        };
	},
	render
});
