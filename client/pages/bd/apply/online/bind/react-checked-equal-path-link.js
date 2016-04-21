import ReactPathLink            from './react-path-link';

class ReactCheckedEqualPathLink extends ReactPathLink {
    constructor(component, key, equalValue) {
        super(component, key);
        this._equalValue = equalValue;
        this.getComponentValue();
    }

    getComponentValue() {
        let value = this.getByPath(this._component.state, this._key); 
        this.value = value === this._equalValue;
    }

    requestChange(value) {
        let partialState = this._component.state;
        this.setByPath(partialState, this._key, this._equalValue);
        this._component.setState(partialState);
    }
}

export default ReactCheckedEqualPathLink;
