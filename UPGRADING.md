## Upgrading to 4.0

Version 4.0 modernizes `react-selectable` to work with React 16.8 through React 18, while maintaining the same API surface.

### Breaking Changes

#### React Version Requirement

- **Minimum React version is now 16.8** (for hooks and `createRef` support)
- Supports React 16.8+, 17.x, and 18.x

#### Components Must Forward Refs

Components wrapped with `createSelectable` **must forward refs** to their underlying DOM element. This is required because we no longer use the deprecated `findDOMNode` API.

**Before (v3.x):**
```jsx
// This worked because findDOMNode could find the DOM node
const Album = ({ title, year, selected }) => (
  <div className={selected ? 'item selected' : 'item'}>
    <h2>{title}</h2>
    <small>{year}</small>
  </div>
);

const SelectableAlbum = createSelectable(Album);
```

**After (v4.x):**
```jsx
import React, { forwardRef } from 'react';

// Must use forwardRef to pass ref to the DOM element
const Album = forwardRef(({ title, year, selected }, ref) => (
  <div className={selected ? 'item selected' : 'item'} ref={ref}>
    <h2>{title}</h2>
    <small>{year}</small>
  </div>
));

Album.displayName = 'Album';

const SelectableAlbum = createSelectable(Album);
```

#### React 18 Rendering

If using React 18, update your app entry point to use `createRoot`:

**Before:**
```jsx
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('root'));
```

**After:**
```jsx
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

### Removed APIs

The following deprecated React APIs are no longer used internally:

- `findDOMNode` - replaced with refs
- Legacy Context API (`childContextTypes`, `contextTypes`, `getChildContext`) - replaced with `React.createContext`
- String refs - replaced with `createRef`

### New Export

`SelectableContext` is now exported for advanced use cases where you need direct access to the context:

```jsx
import { SelectableContext } from 'react-selectable';
```

### Installation from GitHub

You can now install directly from GitHub, and the package will build automatically:

```bash
npm install github:Siemko/react-selectable
```

---

## Significant API changes since 0.1

This module now does a lot _less_ than it used to. The sole function of `react-selectable` is now to provide mouse events that draw a box around the UI, and fire an event telling you which of components are in the group. You are responsible for wiring up everything else, and that's a good thing.

The primary change in this version is that `Selectable` no longer assumes that all of its children, and only its children, are selectable. This is a false premise and precludes you from creating lists that may include non-selectable items, or lists that are grouped in other child components. You now have to explicitly compose a component as selectable by running it through the `createSelectable` higher-order component.

`const MySelectableItem = createSelectable(MyItem);`. 

Note that this is merely sugar for wiring up `this.context.selectable.register(key, domNode)` and `this.context.selectable.unregister(key)` on lifecycle methods.

To disambiguate the two, the `<Selectable />` component should now be referred to as `<SelectableGroup />`

### In addition the following features have been removed in 0.2:

* **Cmd-clicking** to concatenate items (just wire up your own `keyup` listener to toggle a multiselection state in your store(s))

* **The `distance` prop**: This assumed that you had the mouse events attached above the Selectable node (i.e. `document`), which gives this plugin too much scope. If you want the entire document to be selectable, just make the root component a `<SelectableGroup />`. If you want distance padding, just place the `<SeletableGroup />` at the level at which you want the selection box to be available. It will only select those items that are composed with `createSelectable`.

* **The `globalMouse` prop**: For many of the same reasons as `distance`.

* **Managing your `onClick` events**: You can do that on your own now. By default, a selectable item will not become selected on click. You should wire up a click handler that updates your store, similar to how you would wire up your cmd-clicking.

* **You must now provide `selectableKey`**: Your selectable items have a required prop of `selectableKey`, which is the key that will be passed to the `onSelection` handler of your `SelectableGroup`.
