import ReactPathLink            from './react-path-link';

class ReactCheckedPathLink extends ReactPathLink {
    constructor(component, key) {
        super(component, key);
        this._has = has;
        this.getComponentValue();
    }

    getComponentValue() {
        let value = this.getByPath(this._component.state, this._key); 
        this.value = this._has === !!value;
    }

    requestChange(value) {
        let partialState = this._component.state;
        if(value !== this._has) {
            this.setByPath(partialState, this._key, '');
            this._component.setState(partialState);
        }
    }
}

export default ReactCheckedHasPathLink;
