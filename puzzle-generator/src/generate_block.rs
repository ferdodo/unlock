use super::block::Block;
use super::generate_random_number::generate_random_number;

pub fn generate_block() -> Block {
    let direction: bool = generate_random_number(0, 100) > 50;

    Block {
        x: generate_random_number(0, 6) as i32,
        y: generate_random_number(0, 6) as i32,
        w: if direction { generate_random_number(2, 4) as i32 } else { 1 },
        h: if direction { 1 } else { generate_random_number(2, 4) as i32 },
    }
}


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_generate_block() {
        let block = generate_block();
        assert!(block.x >= 0 && block.x <= 6);
        assert!(block.y >= 0 && block.y <= 6);
        assert!((block.w >= 2 && block.w <= 4) || block.w == 1);
        assert!((block.h >= 2 && block.h <= 4) || block.h == 1);
    }
}
