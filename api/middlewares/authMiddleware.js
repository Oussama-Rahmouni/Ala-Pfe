import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500; // Custom auth token (not OAuth)

        let decodedData;
        if (token && isCustomAuth) {      
            decodedData = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub; // Google OAuth
        }    

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Not authenticated" });
    }
};

export { authenticate };
