import { render } from "./template";
import { ref, defineComponent } from "vue";
import { getBit } from "unlock/get-bit";
import { currentPuzzle$ } from "unlock/current-puzzle";

export const BitComponent = defineComponent({
	props: {
		id: Number
	},
	setup(props: { id: number| undefined }) {	
		if (props.id === undefined) {
			throw new Error("Id was not provided !");
		}

		const id: number = props.id;
		let bit = getBit(id);
		const x = ref(bit.block.x);
		const y = ref(bit.block.y);
		const xEnd = ref(bit.block.x + bit.block.w);
		const yEnd = ref(bit.block.y + bit.block.h);
		
		currentPuzzle$.subscribe(function() {
			bit = getBit(id);
			x.value = bit.block.x;
			y.value = bit.block.y;
			xEnd.value = bit.block.x + bit.block.w;
			yEnd.value = bit.block.y + bit.block.h;
		});

		return { x, y, xEnd, yEnd };
	},
	render
});
