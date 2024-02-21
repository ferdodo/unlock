use resvg::tiny_skia::Pixmap;

pub fn pixmap_to_png_string(pixmap: Pixmap) -> String {
	let bytes = match pixmap.encode_png() {
		Ok(b) => b,
		Err(err) => panic!("Failed to encode pixmap to PNG ! \n {:?}", err)
	};

	let hex_string = bytes.iter()
		.map(|&byte| format!("{:02X}", byte))
		.collect();

	hex_string
}
