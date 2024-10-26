import { inject, injectable } from "inversify";
import 'reflect-metadata';
import { AuthenticateDto } from "../dtos/authenticate.dto";
import { UserRepository } from "../repositories/user.repository";
import { TYPES } from "../types/types";
import bcrypt from 'bcryptjs';

@injectable()
export class AuthenticationService {
  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) { }

  async authenticate(authenticateDto: AuthenticateDto) {
    let foundUser = await this.userRepository.findByEmail(authenticateDto.email);
    if (foundUser) {
      if (await bcrypt.compare(authenticateDto.password, foundUser.passwordHash)) {
        return true;
      }
    }
    return false;
  }
}