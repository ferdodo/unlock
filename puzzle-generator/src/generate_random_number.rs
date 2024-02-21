use rand::{Rng, SeedableRng, rngs::StdRng};
use super::get_seed::get_seed;

static mut RNG: Option<StdRng> = None;

pub fn generate_random_number(min: u32, max: u32) -> u32 {
    unsafe {
        let mut rng = RNG.take().unwrap_or_else(|| {
            let mut seed: [u8; 32] = [0; 32];
            let seed_str = get_seed();
            seed.copy_from_slice(seed_str.as_bytes());
            StdRng::from_seed(seed)
        });

        let result: u32 = rng.gen();
        RNG = Some(rng);
        (result % (max - min)) + min
    }
}



#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_generate_random_number() {
        let random_number1 = generate_random_number(0, 4294967295);
        let random_number2 = generate_random_number(0, 4294967295);
        assert_ne!(random_number1, random_number2);
    }
}
