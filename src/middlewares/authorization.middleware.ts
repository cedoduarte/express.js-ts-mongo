import { Request, Response, NextFunction } from 'express';
import { environment } from '../config/environment';

export function authorization(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Authorization header missing' });
    return; // Ensure to return after sending a response
  }
  if (token !== environment.TOKEN) {
    res.status(403).json({ message: 'Unauthorized' });
    return; // Ensure to return after sending a response
  }
  next(); // Call next only if the authorization is successful
}
