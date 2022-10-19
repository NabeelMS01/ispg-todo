import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserDocument, User } from './user.model';
const ObjectId = mongoose.Types.ObjectId;
interface loginUser {
  email: string;
  password: string;
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

  async login(data: loginUser): Promise<any> {
    console.log(data);

    return this.userModel.findOne({ email: data.email });
  }

  async getUser(_id: string): Promise<any> {
    return this.userModel.findOne({ _id });
  }
}
