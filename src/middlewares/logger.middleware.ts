// src/middlewares/logger.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { promises as fs } from 'fs';
import path from 'path';

class LoggerMiddleware {
  private logFilePath: string;

  constructor() {
    this.logFilePath = path.join(__dirname, 'requests.log');
  }

  public middleware() {
    return async (req: Request, _res: Response, next: NextFunction) => {
      const logEntry: string = `${new Date().toISOString()} ${req.method} ${req.url}\n`;
      try {
        console.log(logEntry);
        await fs.appendFile(this.logFilePath, logEntry);
      } catch (error) {
        console.error('Error escribiendo en el archivo de log:', error);
      }
      next();
    };
  }
}

const logger = new LoggerMiddleware();
export default logger.middleware();