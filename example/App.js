import React, { createRef } from 'react';
import { SelectableGroup, createSelectable } from 'react-selectable';
import Album from './Album';

const isNodeInRoot = (node, root) => {
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
};

const SelectableAlbum = createSelectable(Album);

class App extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			selectedItems: [],
			tolerance: 0,
			selectOnMouseMove: false,
		};

		this.selectableRef = createRef();

		this.handleSelection = this.handleSelection.bind(this);
		this.clearItems = this.clearItems.bind(this);
		this.handleToleranceChange = this.handleToleranceChange.bind(this);
		this.toggleSelectOnMouseMove = this.toggleSelectOnMouseMove.bind(this);
	}


	componentDidMount () {
		document.addEventListener('click', this.clearItems);
	}


	componentWillUnmount () {
		document.removeEventListener('click', this.clearItems);
	}


	handleSelection (keys) {
		this.setState({
			selectedItems: keys
		});
	}


	clearItems (e) {
		if(this.selectableRef.current && !isNodeInRoot(e.target, this.selectableRef.current)) {
			this.setState({
				selectedItems: []
			});
		}
	}


	handleToleranceChange (e) {
		this.setState({
			tolerance: parseInt(e.target.value)
		});
	}

	toggleSelectOnMouseMove () {
		this.setState({
			selectOnMouseMove: !this.state.selectOnMouseMove
		});
	}

	render () {
		return (
			<div id="main" style={{ height: "100%" }}>
				<h1>React Selectable Demo</h1>
				<div className="sidebar">
					<div className="info">						
						<strong>Tolerance</strong>: <span>{this.state.tolerance}</span><br/>
						<em>The number of pixels that must be in the bounding box in order for an item to be selected.</em>
						<p><input type="range" min="0" max="50" step="1" onChange={this.handleToleranceChange} value={this.state.tolerance} /></p>

						<label>
							<input type="checkbox" checked={this.state.selectOnMouseMove} onChange={this.toggleSelectOnMouseMove} />
							Select on mouse move
						</label>

						{this.state.selectedItems.length > 0 &&
							<h3>You have selected the following items:</h3>
						}
						{this.state.selectedItems.length === 0 &&
							<p>Please select some items from the right by clicking and dragging a box around them.</p>
						}
						<ul>
						{this.state.selectedItems.map((key, i) => (
							<li key={i}>{this.props.items[key].title}</li>
						))}
						</ul>
					</div>
				</div>
				<div ref={this.selectableRef}>
					<SelectableGroup
						className="main" 
						onSelection={this.handleSelection} 
						onEndSelection={this.handleSelection}
						tolerance={this.state.tolerance}
						onBeginDrag={(e) => {
							console.log("onBeginDrag", e);
						}}>
					
					{this.props.items.map((item, i) => {
						const selected = this.state.selectedItems.indexOf(i) > -1;
						return (
							<SelectableAlbum
								selectableKey={i}
								key={i} 
								title={item.title} 
								year={item.year} 
								selected={selected} />
						);
					})}
					</SelectableGroup>
				</div>
			</div>

		);		
	}
}

export default App;
