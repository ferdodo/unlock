use super::generate_block::generate_block;
use super::block_collides::block_collides;
use super::block_includes::block_includes;
use super::puzzle::Puzzle;
use super::bit::Bit;
use super::block::Block;
use super::generate_id::generate_id;
use super::latch::Latch;

pub fn generate_bits(puzzle: &Puzzle) -> Vec<Bit> {
    let mut bits: Vec<Bit> = Vec::new();
    let guide_block: Block = Block { x: 0, y: 2, w: puzzle.block.w, h: 1 };

    let mut incorrect_blocks = 0;
    while incorrect_blocks < 1000 {
        let block = generate_block();

        if bits.iter().any(|b| block_collides(&b.block, &block)) {
            incorrect_blocks += 1;
            continue;
        }

        if block_collides(&block, &guide_block) {
            incorrect_blocks += 1;  
            continue;
        }

        if !block_includes(&puzzle.block, &block) { 
            incorrect_blocks += 1;
            continue;
        }

        bits.push(Bit { id: generate_id(), block });
    }

    bits
}


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_generate_bits() {
        let puzzle = Puzzle {
            bits: Vec::new(),
            latch: Latch { block: Block { x: 0, y: 2, w: 2, h: 1 } },
            block: Block { x: 0, y: 0, w: 6, h: 6 },
        };

        let bits = generate_bits(&puzzle);
        assert_ne!(bits.len(), 0);
    }
}
