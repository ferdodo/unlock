use super::puzzle::Puzzle;
use super::block::Block;
use super::latch::Latch;
use super::bit::Bit;

pub fn there_is_few_empty_slots(puzzle: &Puzzle) -> bool {
	let totalSlots: i32 = puzzle.block.h * puzzle.block.w;
	let mut occupiedSlots: i32 = 0;

	for bit in &puzzle.bits {
		occupiedSlots = occupiedSlots + (bit.block.h * bit.block.w);
	}

	occupiedSlots = occupiedSlots + puzzle.latch.block.w * puzzle.latch.block.h;

	let emptySlots = totalSlots - occupiedSlots;
	return emptySlots == 4;
}


mod tests {
    use super::*;

    #[test]
    fn test_there_is_few_empty_slots() {
        let puzzle = Puzzle {
            bits: vec![
                Bit { id: 0, block: Block { x: 0, y: 0, w: 1, h: 2 } },
                Bit { id: 1, block: Block { x: 1, y: 0, w: 1, h: 2 } },
                
                Bit { id: 2, block: Block { x: 2, y: 0, w: 1, h: 3 } },
                Bit { id: 3, block: Block { x: 3, y: 0, w: 1, h: 3 } },
                Bit { id: 4, block: Block { x: 4, y: 0, w: 1, h: 3 } },
                Bit { id: 5, block: Block { x: 5, y: 0, w: 1, h: 3 } },

                Bit { id: 6, block: Block { x: 0, y: 3, w: 1, h: 3 } },
                Bit { id: 7, block: Block { x: 1, y: 3, w: 1, h: 3 } },
                Bit { id: 8, block: Block { x: 2, y: 3, w: 1, h: 3 } },
                Bit { id: 9, block: Block { x: 3, y: 3, w: 1, h: 3 } },
                Bit { id: 10, block: Block { x: 4, y: 3, w: 1, h: 2 } },
            ],
            block: Block { x: 0, y: 0, w: 6, h: 6 },
            latch: Latch { block: Block { x: 0, y: 2, w: 2, h: 1 } },
        };

        assert_eq!(there_is_few_empty_slots(&puzzle), true);
    }
}
