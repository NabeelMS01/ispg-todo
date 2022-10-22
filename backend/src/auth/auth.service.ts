import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService, 
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email); 
 
    const isValid =await bcrypt.compare(password, user.password)
    console.log(isValid);
    if (isValid) {
     
      
      return user;
    }
    return null;
  }

  async  loginAuth(user: any) {
   
   try {
     
    const payload = { name: user.name, id: user._id };
  
    const token=  {
      access_token: await this.jwtService.signAsync(payload),
    }
console.log(token);

return token  

   } catch (error) {
    console.log(error);
    
   }
  }
}
