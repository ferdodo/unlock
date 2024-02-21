use resvg::tiny_skia::{PixmapMut, Pixmap};
use super::create_buffer::create_buffer;

pub fn create_pixmap() -> Pixmap {
    let mut bytes = create_buffer();

	let pixmap = match PixmapMut::from_bytes(&mut bytes, 50, 50) {
		Some(p) => p,
		None => panic!("Failed to create a pixmap from buffer !")
	};
    
    pixmap.to_owned()
}
