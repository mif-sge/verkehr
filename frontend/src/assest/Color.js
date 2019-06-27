export function generateColors(count) {
    var colors = [];
    for (var i = 0; i < count; i++) {
        let hue = 360 * i / count;
        let saturation = 80;
        let lightness = 50;
        colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }
    return colors;
}
