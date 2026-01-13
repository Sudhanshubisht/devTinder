const adminAuth = (req, res, next) => {
    const token = 'aaa'; // example token
    const isAuthorized = token === 'aaa';
    console.log("authorizing.......")

    if (isAuthorized) {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
};

const userAuth = (req,res,next) => {
    const token = 'user';
    const isAuthorized = token === 'user';
    console.log("user authorizing...........")
    if(isAuthorized){
        next();
    }else{
        res.status(401).send('unauthorized');
    }
}

module.exports = {
    adminAuth,
    userAuth
};
