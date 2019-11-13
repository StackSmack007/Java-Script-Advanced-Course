function validate(obj) {
    const requiredProperties = [
        ['Method', x => ["GET", "POST", "DELETE", "CONNECT"].includes(x)],
        ['URI', x => {
            let matches = x.match(/^(\*|[\w\.])+$/);
            return matches !== null && matches[0] === x
        }],
        ['Version', x => ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'].includes(x)],
        ['Message', x => {
            let matches = x.match(/^[^\<\>\\\&\'\"]+$/);
            return x == "" || (matches !== null && matches[0] === x)
        }]];
    const validateProperty = function (subject, name, predicate) {
        if (!subject.hasOwnProperty(name.toLowerCase()) ||
            !predicate(subject[name.toLowerCase()])) {
            throw new Error(`Invalid request header: Invalid ${name}`);
        }
    }

    requiredProperties.forEach(x => validateProperty(obj, x[0], x[1]));
    return obj;
}

// •	method - can be GET, POST, DELETE or CONNECT
// •	uri - must be a valid resource address or an asterisk (*); a resource address is a combination of alphanumeric characters and periods; all letters are Latin; the URI cannot be an empty string
// •	version - can be HTTP/0.9, HTTP/1.0, HTTP/1.1 or HTTP/2.0 supplied as a string
// •	message - may contain any number or non-special characters;special characters are <, >, \, &, ', "

console.log(validate({
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: ''
}
));