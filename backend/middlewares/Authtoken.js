const jwt = require("jsonwebtoken");


const authenticateToken = (req, res, next) => {
    const token = req.cookies.token; 
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided, unauthorized' });
    }
  
    jwt.verify(token, 'secretkey', async (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token is not valid' });
      }
  
      req.user = user; 
      next();
    });
  };

  module.exports={authenticateToken}
  