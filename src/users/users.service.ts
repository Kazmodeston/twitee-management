import { Injectable,  HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dtos/create-users.dto';
import { User } from './entities/User.entity';
import { hashPassword } from 'src/utils/bcrypt';
import { Activate } from './entities/activate.entity';
import { generateActivationCode, md5 } from '../utils/bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { Md5 } from 'ts-md5';

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
        let checkUser = await this.usersRepository.findOneBy({email: getEmail});

        if (checkUser) {
            throw new HttpException('Email already exist', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        // Hash Password
        const password = hashPassword(req.password);
        
        const user = this.usersRepository.create({...formatedData, password});
      
        const userObject = await this.usersRepository.save(user);
        
        // create activation code Snapshot
        const actionSnapshot = this.activationRepository.create({key: code});
        
        actionSnapshot.userId = user.id;
        // Save Activation code
       const getActivation = await this.activationRepository.save(actionSnapshot);
        
        if (userObject) {
            const fullUrl = `${url}/users/activate/${hashedEmail}/${getActivation.key}`;
            
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
        
        let success = false;
        
        // Check if the action code exist, then get the id
        const activation = await this.activationRepository.findOne({ where:{ key }, relations: { user: true } });
        
        if (!activation || !activation.user) {
            throw new HttpException('Activation not found', HttpStatus.NOT_FOUND);
        }
        
        // Relate it with User entity to get the object
        const user = activation.user;
        
        const getUserObject = await this.usersRepository.findOneBy({ id: activation.userId });

        // Check if Email coming from url is the same with DB
        if (!(Md5.hashStr(getUserObject.email) === email)) {
            throw new HttpException('Cannot activat account', HttpStatus.BAD_REQUEST);
        }
        
        const newUser = {...user, is_active: true}

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        
        // Update the is_active column and Delete Activation code
        const updatedData = await this.usersRepository.save(newUser) && this.activationRepository.remove(activation);
        
        if (updatedData) success = true;
        
        if (!success) {
            throw new HttpException('Error updating status', HttpStatus.BAD_REQUEST);
        }
        
        return success;
        
    }
    
    async findByEmail(email: string): Promise<User | null> {
        return await this.usersRepository.findOneBy({ email });
    }
}
