import jwt from 'jsonwebtoken';

// auth middleware next: do something then move to the next thing
// for any kind of action that happens before something, next is crucial
const auth = async (req, res, next) => {
    // check if the user's token is valid
    try {
        // get the token from the front end (token is on the first position of the array)
        const token = req.headers.authorization.split(" ")[1];
        // two kinds of token: 1. Google OAuth 2. Custom token
        const isCustomAuth = token.length < 500;
    
        let decodedData;
        
        // Custom token
        if (token && isCustomAuth) {   
            // give the data from each specific token (username and id)   
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id;
        // Google OAuth
        } else {
            decodedData = jwt.decode(token);
            // sub: google's name for a specific id that differentiates every single google user
            req.userId = decodedData?.sub;
        }    
    
        // pass the action onto the next thing
        // e.g., the user wants to like a post:
        // user click the like button -> auth middleware () confirms/denies that request 
        // -> if everything is correct, auth middleware (next) -> call the like controller -> ...
        next();
    } catch (error) {
      console.log(error);
    }
};

// use auth middleware in the routes
export default auth;