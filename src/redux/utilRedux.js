export function copy(oldObj) {
    return Object.assign({}, oldObj);
}

export function copyAndSet(oldObj, newObj) {
    return Object.assign({}, oldObj, newObj);
}
