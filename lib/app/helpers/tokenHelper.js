import jwt from 'jsonwebtoken';
import config from '../../config';

const superSecret = config.secret;

function verifyToken(req, res, next){
      let token = req.body.token || req.query.token || req.headers['x-access-token'];
      if (token) {
        jwt.verify(token, superSecret, function(err, decoded) {

          if (err) {
            let forbidden = new Error("Forbidden, failed to authenticate token");
            forbidden.status = 403;
            return next(forbidden);
          } else {
            req.decoded = decoded;
            next();
          }
        });

      } else {
        let forbiddenNoToken = new Error("Forbidden, no token provided");
            forbiddenNoToken.status = 403;
            return next(forbiddenNoToken);
      }
}


export default verifyToken;
