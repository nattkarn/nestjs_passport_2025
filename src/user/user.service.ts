import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
};

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    try {
      const hashedPassword = await hashPassword(data.password);
      const createUser = await this.prisma.user.create({
        data: {
          username: data.username,
          email: data.email,
          password: hashedPassword,
          name: data.name,
          tel: data.tel,
        },
        select: {
          id: true,
          username: true,
          email: true,
          name: true,
          tel: true,
          createdAt: true,
        },
      });

      return {
        message: 'User created successfully',
        data: createUser,
      };
    } catch (error) {
      // ตรวจสอบ Prisma unique constraint error (เช่น username หรือ email ซ้ำ)
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const field = error.meta?.target?.[0] ?? 'Field';
        throw new BadRequestException(`${field} already exists`);
      }

      console.error('❌ Unexpected error during user creation:', error);
      throw new InternalServerErrorException('User creation failed');
    }
  }

  async findByEmail(data: { email: string }) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return {
        message: 'User found successfully',
        // httpStatus: 200,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          tel: user.tel,
          email: user.email
        },
      };
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async findByEmailHavePassword(data: { email: string }) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return {
        message: 'User found successfully',
        httpStatus: 200,
        data: {
          id: user.id,
          username: user.username,
          name: user.name,
          tel: user.tel,
          email: user.email,
          password: user.password,
        },
      };
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
