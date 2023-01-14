import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dtos/create-users.dto';
import { User } from './entities/User.entity';
import { hashPassword } from 'src/utils/bcrypt';
import { Activate } from './entities/activate.entity';
import { generateActivationCode } from '../utils/bcrypt';

@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>, 
        @InjectRepository(Activate) private activationRepository: Repository<Activate> 
        ) {}
    
    async store(req: CreateUsersDto) {
        const getEmail = req.email;
        const explode = getEmail.split('@');
        const name = explode[0];
        const formatedData = {...req, name};
        const code = generateActivationCode();
        
        // TODO: Check if User already exist
        
        // Hash Password
        const password = hashPassword(req.password);
        
        const user = this.usersRepository.create({...formatedData, password});
      
        // const userObject = await this.usersRepository.save(user);
        
        // create activation code Snapshot
        const actionSnapshot = this.activationRepository.create({key: code});
        
        // Save Activation code
        const activation = await this.activationRepository.save(actionSnapshot);
        
        // update User snapshot
        user.activation = activation;
        
        const userObject = await this.usersRepository.save(user);
        
        if (userObject) {
            // Send Activation email link
            
            return userObject;
        }
    }
}
