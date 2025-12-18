import React from "react";
import PropTypes from "prop-types";
import SelectableContext from "./SelectableContext";

const createSelectable = (WrappedComponent) => {
  class SelectableItem extends React.Component {
    constructor(props) {
      super(props);
      this._node = null;
      this._setNodeRef = this._setNodeRef.bind(this);
    }

    _setNodeRef(node) {
      this._node = node;
      const selectable = this.context;
      if (selectable && node) {
        selectable.register(this.props.selectableKey, node);
      }
    }

    componentWillUnmount() {
      const selectable = this.context;
      if (selectable) {
        selectable.unregister(this.props.selectableKey);
      }
    }

    render() {
      const { selectableKey, ...rest } = this.props;
      return (
        <WrappedComponent ref={this._setNodeRef} {...rest}>
          {this.props.children}
        </WrappedComponent>
      );
    }
  }

  SelectableItem.contextType = SelectableContext;

  SelectableItem.propTypes = {
    children: PropTypes.node,
    selectableKey: PropTypes.any.isRequired,
  };

  // Copy display name for better debugging
  const wrappedName = WrappedComponent.displayName || WrappedComponent.name || "Component";
  SelectableItem.displayName = `Selectable(${wrappedName})`;

  return SelectableItem;
};

export default createSelectable;
