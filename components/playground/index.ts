import { Ref, ref, defineComponent } from "vue";
import { render } from "./template";
import { BitComponent } from "../bit";
import { DragDirection, dragDirection } from "../../dragDirection";
import { LatchComponent } from "../latch";

import {
	Bit,
	puzzle$,
	Puzzle,
	getPuzzle,
	MoveBitEvent,
	moveBitEvents$,
	MoveLatchEvent,
	moveLatchEvents$
} from "../../puzzle";


export const Playground = defineComponent({
	components: {
		Bit: BitComponent,
		Latch: LatchComponent
	},
	setup() {
		const puzzle: Ref<Puzzle> = ref(getPuzzle());
		puzzle$.subscribe(p => puzzle.value = p);

		function drag(event: DragEvent, bit: Bit) {
			const direction: DragDirection | undefined = dragDirection(event);

			if (direction !== undefined) {
				switch (direction) {
					case DragDirection.Up:
						moveBitEvents$.next({ id: bit.id, x: bit.block.x, y: bit.block.y -1 });
						break;
					case DragDirection.Down:
						moveBitEvents$.next({ id: bit.id, x: bit.block.x, y: bit.block.y +1 });
						break;
					case DragDirection.Right:
						moveBitEvents$.next({ id: bit.id, x: bit.block.x +1, y: bit.block.y });
						break;
					case DragDirection.Left:
						moveBitEvents$.next({ id: bit.id, x: bit.block.x -1, y: bit.block.y });
						break;
					default:
						break;
				}
			}
		}

		function dragLatch(event: DragEvent) {
			const direction: DragDirection | undefined = dragDirection(event);

			if (direction !== undefined) {
				switch (direction) {
					case DragDirection.Right:
						moveLatchEvents$.next({ x: puzzle.value.latch.block.x +1 });
						break;
					case DragDirection.Left:
						moveLatchEvents$.next({ x: puzzle.value.latch.block.x -1 });
						break;
					default:
						break;
				}
			}
		}

		return {
			puzzle,
			drag,
			dragLatch
		};
	},
	render
});
