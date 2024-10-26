import { Request, Response, NextFunction } from 'express';
import { environment } from '../config/environment';

class AuthorizationMiddleware {
  public middleware() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const tokenHeader = req.headers['token'] as string | undefined;
      if (!tokenHeader) {
        res.status(401).json({ message: 'Token header missing' });
        return;
      }
      if (tokenHeader !== environment.TOKEN) {
        res.status(403).json({ message: 'Unauthorized' });
        return;
      }
      next();
    };
  }
}

const authorization = new AuthorizationMiddleware();
export default authorization.middleware();