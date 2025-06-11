import getBoundsForNode from "./getBoundsForNode";

/**
 * Given offsets, widths, and heights of two objects, determine if they collide (overlap).
 * @param  {number} aTop        The top position of the first object
 * @param  {number} aLeft       The left position of the first object
 * @param  {number} bTop        The top position of the second object
 * @param  {number} bLeft       The left position of the second object
 * @param  {number} aWidth      The width of the first object
 * @param  {number} aHeight     The height of the first object
 * @param  {number} bWidth      The width of the second object
 * @param  {number} bHeight     The height of the second object
 * @param  {number} tolerance   Amount of forgiveness an item will offer to the selectbox before registering a selection
 * @return {boolean}
 */
const coordsCollide = (
  aTop,
  aLeft,
  bTop,
  bLeft,
  aWidth,
  aHeight,
  bWidth,
  bHeight,
  tolerance
) => {
  // Ensure all values are numbers
  const numericTolerance = Number(tolerance) || 0;

  return !(
    // 'a' bottom doesn't touch 'b' top
    (
      aTop + aHeight - numericTolerance < bTop ||
      // 'a' top doesn't touch 'b' bottom
      aTop + numericTolerance > bTop + bHeight ||
      // 'a' right doesn't touch 'b' left
      aLeft + aWidth - numericTolerance < bLeft ||
      // 'a' left doesn't touch 'b' right
      aLeft + numericTolerance > bLeft + bWidth
    )
  );
};

/**
 * Given two objects containing "top", "left", "width" and "height"
 * properties, determine if they collide.
 * @param  {Object|HTMLElement} a
 * @param  {Object|HTMLElement} b
 * @param  {number} tolerance
 * @return {boolean}
 */
export default (a, b, tolerance = 0) => {
  if (!a || !b) {
    return false;
  }

  let aObj, bObj;

  // Handle HTMLElement/SVGElement
  if (a instanceof HTMLElement || a instanceof SVGElement) {
    aObj = getBoundsForNode(a);
  } else {
    // Handle plain objects - normalize property names
    aObj = {
      top: a.top || 0,
      left: a.left || 0,
      width: a.width || a.offsetWidth || 0,
      height: a.height || a.offsetHeight || 0,
    };
  }

  if (b instanceof HTMLElement || b instanceof SVGElement) {
    bObj = getBoundsForNode(b);
  } else {
    // Handle plain objects - normalize property names
    bObj = {
      top: b.top || 0,
      left: b.left || 0,
      width: b.width || b.offsetWidth || 0,
      height: b.height || b.offsetHeight || 0,
    };
  }

  return coordsCollide(
    aObj.top,
    aObj.left,
    bObj.top,
    bObj.left,
    aObj.width,
    aObj.height,
    bObj.width,
    bObj.height,
    tolerance
  );
};
