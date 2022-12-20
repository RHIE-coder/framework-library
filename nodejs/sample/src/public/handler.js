function $(selector){
    if(selector.startsWith("#")) return document.getElementById(selector.replace("#",""))
    else if(selector.startsWith(".")) return document.getElementsByClassName(selector.replace(".",""));
}

function template$(selector){
    return $(selector).content.cloneNode(true).children[0];
}

class Storage {

    static set(key, value) {
        if(value instanceof Object) value = JSON.stringify(value);
        localStorage.setItem(key, value);
        return JSON.stringify(JSON.parse(value), null, 4);
    }

    static get(key) {
        const data = localStorage.getItem(key);
        if(data && data !== "undefined") return JSON.stringify(JSON.parse(data), null, 4)
        return null;
    }

    static update(key, value) {
        if (this.isExist(key)) {
            this.set(key, value);
            return true;
        } else {
            return false;
        }
    }

    static remove(key) {
        if (this.isExist(key)) {
            localStorage.removeItem(key);
            return true;
        } else {
            return false;
        }
    }

    static isExist(key) {
        return this.get(key) !== null;
    }

    static isExistAndSame(key, value) {
        return this.isExist(key) && this.get(key) === value;
    }

    static clear() {
        localStorage.clear();
    }

}

export {$, template$, Storage};