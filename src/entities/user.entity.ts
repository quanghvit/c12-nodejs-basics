import { Entity, Column, BeforeInsert } from 'typeorm';
import bcrypt from 'bcryptjs';
import BaseModel from './base.entity';

@Entity('users')
export class User extends BaseModel {

    @Column()
    name: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column()
    password: string;

    @Column()
    photo: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12);
    }
}

