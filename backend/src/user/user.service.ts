import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserDocument, User } from './user.model';
const ObjectId = mongoose.Types.ObjectId;
interface loginUser {
  email: string;
}

export class UserService {
  constructor(
    @InjectModel('users') private readonly userModel: Model<UserDocument>,
  ) {}

  async register(data: User): Promise<User> {
    try {
      const user = this.userModel.create(data);
      if (user) {
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async login(email: string): Promise<any> {
    return this.userModel.findOne({ email: email });
  }

  async getUser(_id: string): Promise<any> {
    return this.userModel.findOne({ _id });
  }
}
