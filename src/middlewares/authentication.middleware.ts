import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { environment } from '../config/environment';

class AuthenticationMiddleware {
  public middleware() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const authorizationHeader = req.headers['authorization'] as string | undefined;
      const jwtToken = authorizationHeader?.split(' ')[1];
      if (!jwtToken) {
        res.status(401).json({ message: "Authorization header missing" });
        return;
      }
      jwt.verify(jwtToken, environment.JWT_SECRET, (error: any, _user: any) => {
        if (error) {
          res.sendStatus(403); // Forbidden
          return;
        }
        next();
      });
    }
  }
}

const authentication = new AuthenticationMiddleware();
export default authentication.middleware();