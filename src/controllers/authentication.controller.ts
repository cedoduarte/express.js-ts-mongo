import { inject, injectable } from "inversify";
import { TYPES } from "../types/types";
import { AuthenticationService } from "../services/authentication.service";
import { AuthenticateDto } from "../dtos/authenticate.dto";
import jwt from 'jsonwebtoken';
import { environment } from '../config/environment';
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from 'express';
import 'reflect-metadata';

@injectable()
export class AuthenticationController {
  constructor(@inject(TYPES.AuthenticationService) private readonly authenticationService: AuthenticationService) { }

  async authenticate(req: Request, res: Response) {
    const authenticateDto = plainToClass(AuthenticateDto, req.body);
    const errors = await validate(authenticateDto);
    if (errors.length > 0) {
      res.status(400).json({
        message: "Validation failed",
        errors
      });
      return;
    } else {
      const authenticated: boolean = await this.authenticationService.authenticate(authenticateDto);
      if (authenticated) {
        const token: string = jwt.sign({ email: authenticateDto.email }, environment.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json(token);
        return;
      }
    }
    res.status(400).json({ message: "Authentication failed. Please check your credentials." });
  }
}