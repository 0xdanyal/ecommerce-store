import jwt from 'jsonwebtoken';
import User from '../models/authModel.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.headers.authorization) {
      token = req.headers.authorization;
    }

    if (!token) return res.status(401).json({ message: 'Not authorized to access this route' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Load full user from DB to get current role/status
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'User no longer exists' });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Not authorized to access this route' });
    }
    next();
  };
};




// import jwt from 'jsonwebtoken';
// import User from '../models/authModel.js';

// export const protect = async (req, res, next) => {
//   try {
//     let token;

//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
//       token = req.headers.authorization.split(' ')[1];
//     } else if (req.headers.authorization) {
//       // allow raw token (for quick testing) but prefer Bearer
//       token = req.headers.authorization;
//     }

//     if (!token) return res.status(401).json({ message: 'Not authorized to access this route' });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Load full user from DB to get current role/status
//     const user = await User.findById(decoded.id).select('-password');
//     if (!user) return res.status(401).json({ message: 'User no longer exists' });

//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Not authorized to access this route' });
//   }
// };

// export const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!req.user || !roles.includes(req.user.role)) {
//       return res.status(403).json({ message: 'Not authorized to access this route' });
//     }
//     next();
//   };
// };

