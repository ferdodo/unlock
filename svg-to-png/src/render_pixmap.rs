use resvg::usvg;
use resvg::usvg::TreeParsing;
use resvg::usvg::Transform;
use super::pixmap_to_png_string::pixmap_to_png_string;
use super::create_pixmap::create_pixmap;

pub fn render_pixmap(hello: &str) -> String {
    let mut pixmap = create_pixmap();

	let tree = match usvg::Tree::from_str(hello, &usvg::Options::default()) {
		Ok(t) => t,
		Err(err) => panic!("Failed to parse SVG tree !\n ${:?}", err)
	};

    let translation = Transform {
        sx: 0.0,
        kx: 0.0,
        ky: 0.0,
        sy: 0.0,
        tx: 0.0,
        ty: 0.0,
    };

    resvg::render(&tree, translation, &mut pixmap.as_mut());
    let hex_string = pixmap_to_png_string(pixmap);
    hex_string
}

#[cfg(test)]
mod tests {
    use super::render_pixmap;

    #[test]
    fn test_render_pixmap() {
        let svg = r#"<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="red" /></svg>"#;
        let result = render_pixmap(svg);
        assert!(!result.is_empty());
    }

    #[test]
    fn test_render_pixmap2() {
        let svg = r#"
        	<svg width="100" height="100" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        		<rect width="100" height="100" fill="transparent" stroke="black" stroke-width="0.1">
			    <image id="image1" height="200" xlink:href="bit-h-2.png"/>
        			<!--v-if-->
        		</rect>
        	</svg>
        "#;
        let result = render_pixmap(svg);
        assert!(!result.is_empty());
    }

    #[test]
    fn test_render_pixmap3() {
    	let svg = r#"
			<svg id="svg1" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"
			     xmlns:xlink="http://www.w3.org/1999/xlink">

			    <rect id="frame" x="0" y="0" width="200" height="200" fill="red"/>

			    <image id="image1" height="200" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAXBJREFUeF7t1VEJACAUxVDtj1XsZQoFU5yPvQRj4/Lm2ueOjjEwC8K0+CAFsXoUBOtRkIJoBjCefkhBMAMYTgspCGYAw2khBcEMYDgtpCCYAQynhRQEM4DhtJCCYAYwnBZSEMwAhtNCCoIZwHBaSEEwAxhOCykIZgDDaSEFwQxgOC2kIJgBDKeFFAQzgOG0kIJgBjCcFlIQzACG00IKghnAcFpIQTADGE4LKQhmAMNpIQXBDGA4LaQgmAEMp4UUBDOA4bSQgmAGMJwWUhDMAIbTQgqCGcBwWkhBMAMYTgspCGYAw2khBcEMYDgtpCCYAQynhRQEM4DhtJCCYAYwnBZSEMwAhtNCCoIZwHBaSEEwAxhOCykIZgDDaSEFwQxgOC2kIJgBDKeFFAQzgOG0kIJgBjCcFlIQzACG00IKghnAcFpIQTADGE4LKQhmAMNpIQXBDGA4LaQgmAEMp4UUBDOA4bSQgmAGMJwWUhDMAIbzAGCeOiB4QsvLAAAAAElFTkSuQmCC"/>

			</svg>
        "#;

        let result = render_pixmap(svg);
        assert!(!result.is_empty());
    }
}
