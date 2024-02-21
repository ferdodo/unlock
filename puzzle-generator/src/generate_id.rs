static mut id: u32 = 0;

pub fn generate_id() -> u32 {
	unsafe {
		id = id + 1;
		id.clone()
	}
}
