const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/../.env` });

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token; 
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided, unauthorized' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token is not valid' });
      }
  
      req.user = user; 
      next();
    });
  };

  module.exports={authenticateToken}
  