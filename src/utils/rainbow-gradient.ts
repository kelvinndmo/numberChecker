export const hslToRgb = (h, s, l) => {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    var hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return `rgb${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(
    b * 255
  )}`;
};

export const rainbowGradient = (len, saturation = 1, lightness = 0.5) => {
  const gradient: any[] = [];
  for (let x = 0; x < len; x++) {
    const gradientValues = [x / len, saturation, lightness].map((c) =>
      Math.round(c * 255)
    ) as any;
    console.log(gradientValues);
    gradient.push(
      // hslToRgb((x / len, saturation, lightness).map((c) => Math.round(c * 255)))
      hslToRgb(gradientValues[0], gradientValues[1], gradientValues[2])
    );
  }
  return gradient;
};
