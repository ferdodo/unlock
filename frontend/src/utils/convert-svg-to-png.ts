import { svg_to_png } from "svg-to-png/pkg/svg_to_png";

export function convertSvgToPng (svgText: string): string {
	return svg_to_png(svgText) as string;
};
