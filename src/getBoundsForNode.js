/**
 * Given a node, get everything needed to calculate its boundaries
 * @param  {HTMLElement} node
 * @return {Object}
 */
export default (node) => {
  if (!node) {
    return { top: 0, left: 0, width: 0, height: 0 };
  }

  const rect = node.getBoundingClientRect();

  // Handle cases where getBoundingClientRect might return unexpected values
  const realHeight = rect.height || 0;
  const realWidth = rect.width || 0;

  // Ensure window scroll values exist (for older browsers or test environments)
  const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
  const scrollX =
    window.pageXOffset || document.documentElement.scrollLeft || 0;

  const box = {
    top: (rect.top || 0) + scrollY,
    left: (rect.left || 0) + scrollX,
    width: realWidth,
    height: realHeight,
  };

  return box;
};
