export function copyAndSet(oldObj, newObj) {
    let next = {};
    Object.keys(oldObj).forEach(key => {next[key] = oldObj[key];});
    Object.keys(newObj).forEach(key => {next[key] = newObj[key];});
    return next;
}
