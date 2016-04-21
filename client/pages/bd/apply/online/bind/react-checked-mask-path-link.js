import ReactPathLink            from './react-path-link';

class ReactCheckedMaskPathLink extends ReactPathLink {
    constructor(component, key, maskValue) {
        super(component, key);
        this._maskValue = maskValue;
        this.getComponentValue();
    }

    getComponentValue() {
        let value = this.getByPath(this._component.state, this._key); 
        this.value = !!(value & this._maskValue);
    }

    requestChange(value) {
        let stateValue = this.getByPath(this._component.state, this._key); 
        //set bit
        if(value) {
            value = this._maskValue | stateValue;    
        } else {
            //clear bit
            value = ~(this._maskValue) & stateValue; 
        }
        let partialState = this._component.state;
        this.setByPath(partialState, this._key, value);
        this._component.setState(partialState);
    }
}

export default ReactCheckedMaskPathLink;
