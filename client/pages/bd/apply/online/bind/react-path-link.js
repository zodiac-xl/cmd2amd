class ReactPathLink {
    constructor(component, key) {
        this._component = component;
        this._key = key;
        this.getComponentValue();
    }

    getComponentValue() {
       this.value = this.getByPath(this._component.state, this._key); 
    }

    requestChange(value) {
        let partialState = this._component.state;
        this.setByPath(partialState, this._key, value);
        this._component.setState(partialState);
    }

    getArrayKey(key) {
        let matches = key.match(/^\$_(.*?)_\$$/);
        if(matches) {
            return matches[1];
        }
    }

    getByPath(obj, path) {
        //convert some syntax like a[0] to a.0
        path = path.replace(/\[(\w+)\]/g, '.$1');
        let segs = path.split('.');
        let i, ln = segs.length;
        for(i = 0; i < ln; i++) {
            let key = segs[i];
            if(typeof obj === 'object' && key in obj) {
                obj = obj[key];
            } else {
                return;
            }
        }
        return obj;
    }

    setByPath(obj, path, value) {
        //convert array syntax a[0] to a.$_0_$
        //we will create object or array depend on this formal.
        path = path.replace(/\[(\w+)\]/g, '.\$_$1_\$');
        let segs = path.split('.');
        let i, ln = segs.length;
        for(i = 0; i < ln-1; i++) {
            let key = segs[i];
            let isArray = false;
            let nextKey = segs[i+1];
            let nextIsArrayKey = false;
            let arrayKey = this.getArrayKey(key);
            let nextArrayKey = this.getArrayKey(nextKey);
            if(arrayKey) {
                key = arrayKey;
            }
    
            if(nextArrayKey) {
                isArray = true;
            }
            
            if(obj[key]) {
                obj = obj[key];
            } else {
                if(isArray) {
                    obj[key] = [];
                } else {
                    obj[key] = {};
                }
                obj = obj[key];
            }
        }
        obj[segs[ln - 1]] = value;
    }

}

export default ReactPathLink;
