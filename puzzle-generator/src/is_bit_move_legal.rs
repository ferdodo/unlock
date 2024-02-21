use crate::block::Block;
use crate::puzzle::Puzzle;
use crate::latch::Latch;
use crate::bit::Bit;
use crate::block_includes::block_includes;
use crate::block_collides::block_collides;

pub fn is_bit_move_legal(puzzle: &Puzzle, bit_id: u32, moved_block: &Block) -> bool {
    if !block_includes(&puzzle.block, moved_block) {
        return false;
    }

    for bit in &puzzle.bits {
        if bit.id != bit_id && block_collides(&bit.block, moved_block) {
            return false;
        }
    }

    if block_collides(&puzzle.latch.block, moved_block) {
        return false;
    }

    true
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_is_bit_move_legal() {
        let puzzle = Puzzle {
            bits: vec![
                Bit { id: 1, block: Block { x: 1, y: 1, w: 1, h: 1 } },
                Bit { id: 2, block: Block { x: 2, y: 2, w: 2, h: 2 } },
            ],
            block: Block { x: 0, y: 0, w: 5, h: 5 },
            latch: Latch { block: Block { x: 3, y: 3, w: 1, h: 1 } },
        };

        let moved_block = Block { x: 4, y: 4, w: 1, h: 1 };

        assert_eq!(is_bit_move_legal(&puzzle, 1, &moved_block), true);
    }
}

