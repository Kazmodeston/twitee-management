import { CreateDateColumn, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Activate } from "./activate.entity";

@Entity({ name: 'users' })
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @Column({ unique: true })
    email: string;
    
    @Column()
    password: string;
    
    @Column({ default: false })
    is_active: boolean;
    
    @CreateDateColumn()
    created_at: string;
    
    @UpdateDateColumn()
    updated_at: string;
    
    @OneToOne(() => Activate, activate => activate.user)
    activation: Activate
    
    /* @OneToOne(() => Activate)
    @JoinColumn()
    activation: Activate; */
} 