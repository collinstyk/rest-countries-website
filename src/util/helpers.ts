/**
 * encodeSvg take an svg string argument,
 * returns relative URL
 */
export const encodeSvg = (svgContent: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
