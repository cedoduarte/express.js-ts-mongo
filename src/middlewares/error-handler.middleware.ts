import { Request, Response, NextFunction } from 'express';

class ErrorHandlerMiddleware {
  public middleware() {
    return async (err: Error, _req: Request, res: Response, _next: NextFunction) => {
      const errorString: string = err.stack || err.message;
      console.error(errorString);
      res.status(500).json({ message: errorString });
    };
  }
}

const errorHandler = new ErrorHandlerMiddleware();
export default errorHandler.middleware();