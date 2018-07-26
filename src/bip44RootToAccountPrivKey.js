
export default function bip44RootToAccountPrivKey(rootNode, path, accountNumber) {
    if (typeof rootNode !== 'object') { return Promise.reject(new Error('You must call bip44RootToAccountPrivKey with a rootNode, and the rootNode must be an object')); }
    if (typeof path !== 'string') { return Promise.reject(new Error('You must call bip44RootToAccountPrivKey with a path, and the path must be a string')); }
    if (typeof accountNumber !== 'number') { return Promise.reject(new Error('You must call bip44RootToAccountPrivKey with a accountNumber, and the accountNumber must be a number')); }
    
    return new Promise((resolve, reject) => {
        try {
            const splitPath = path.split('/');
            splitPath[3] = `${accountNumber}'`;
            const derivedPath = splitPath.splice(0, 4).join('/');
            const child = rootNode.derivePath(derivedPath);
           
            resolve(child.toBase58());
        } catch (err) {
            reject(err);
        }
    });
}
