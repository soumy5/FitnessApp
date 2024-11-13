const jwt = require('jsonwebtoken');
const secretKey = '1234567'; 
const User = require('../models/usermodel'); 





const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    return res.status(401).json({message:'you must be logged in.'});
  }

  const token = req.headers.authorization.split(' ')[1];

  try {
    const payload = jwt.verify(token, secretKey);

    if (!payload) {
      return res.status(501).json({message:'Error in verifying token'});
    } else {
      const user = await User.findOne({ _id: payload.userId});

      if (!user) {
        return res.status(401).json({message:'You must be logged in.'});
      } else {
            req.user = user;
            next();
      }
    }
  } catch (error) {
    return res.status(401).json({message:'You must be logged in.'});
  }
};


module.exports=verifyToken
