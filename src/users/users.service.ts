import { Injectable,  HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dtos/create-users.dto';
import { User } from './entities/User.entity';
import { hashPassword } from 'src/utils/bcrypt';
import { Activate } from './entities/activate.entity';
import { generateActivationCode, md5 } from '../utils/bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>, 
        @InjectRepository(Activate) private activationRepository: Repository<Activate>,
        private mailModule: MailerService 
        ) {}
    
    async store(req: CreateUsersDto) {
        const getEmail = req.email;
        const explode = getEmail.split('@');
        const name = explode[0];
        const formatedData = {...req, name};
        const code = generateActivationCode();
        const url = "http://localhost:3200";
        const hashedEmail = md5(getEmail);
        
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
            const fullUrl = `${url}/users/activate/${hashedEmail}/${userObject.activation.key}`;
            // Send Activation email link
            await this.mailModule.sendMail({
                from: '"Twitee 👻" <no-reply@twitee.com>', // sender address
                to: userObject.email,
                subject: "Thanks for registering!", // Subject line
                text: "Welcome to Twitee Post", // plain text body
                html: `
                <center>
                <h2>Welcome to Twitee Post</h2>
                <p></p>
                <h3>Cheers,</h3>
                <p></p>
                <h4>Click the link below to activate your email</h4>
                <p></p>
                <a target='_blank' href=${fullUrl}>${fullUrl}</a>
                
                </center>
                `,
            })
            
            return userObject;
        }
    }
    
    async activate(email: string, key: string) {
        
        // Check if the action code exist, then get the id
        const activation = await this.activationRepository.findOneBy({ key });
        
        // Relate it with User entity to get the object
        const user = await this.usersRepository.findBy({ activation });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.FORBIDDEN);
        }
        
        user.is_active = true;
        console.log(user)
        
        // Update the is_active column
    }
}
