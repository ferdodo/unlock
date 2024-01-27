import { Bit } from "unlock/interfaces/bit";

export function getBitImage(bit: Bit): string {
	switch (bit.block.w) {
		case 2:
			return "bit-v-2.png";
		case 3:
			return "bit-v-3.png";
		default:
			switch (bit.block.h) {
				case 2:
					return "bit-h-2.png";
				case 3:
					return "bit-h-3.png";
				default:
					throw new Error("Unknown block size !");
			}
	}
}
