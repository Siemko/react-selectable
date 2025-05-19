/**
 * Given a node, get everything needed to calculate its boundaries
 * @param  {HTMLElement} node
 * @return {Object}
 */
export default (node) => {
  const rect = node.getBoundingClientRect();

  let realHeight = rect.height;
  let realWidth = rect.width;

  const child = node.firstElementChild;
  const childBox = child.getBoundingClientRect();
  if (child && (childBox.height < realHeight || childBox.width < realWidth)) {
    realHeight = childBox.height;
    realWidth = childBox.width;
  }

  const box = {
    top: childBox.top + window.pageYOffset,
    left: childBox.left + window.pageXOffset,
    width: realWidth,
    height: realHeight,
  };
  return box;
};
