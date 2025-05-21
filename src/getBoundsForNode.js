/**
 * Given a node, get everything needed to calculate its boundaries
 * @param  {HTMLElement} node
 * @return {Object}
 */
export default (node) => {
  const rect = node.getBoundingClientRect();

  let realHeight = rect.height;
  let realWidth = rect.width;

  const box = {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset,
    width: realWidth,
    height: realHeight,
  };
  return box;
};
