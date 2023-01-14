import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'activations' })
export class Activate {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ unique: true})
    key: string;
}