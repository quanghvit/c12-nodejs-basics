import bcrypt from 'bcryptjs';
import BaseModel from './base.entity';
import { UsersPosts } from './usersPosts.entity';
import { Entity, Column, BeforeInsert, OneToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity('users')
export class User extends BaseModel {
    @Column({ name: 'name', type: 'varchar', nullable: false })
    name: string;

    @Column({ name: 'email', type: 'varchar', nullable: false, unique: true })
    email: string;

    @Column({ name: 'password', type: 'varchar', nullable: false })
    password: string;

    @Column({ name: 'photo', type: 'varchar', nullable: true })
    photo: string;

    @Column({ name: 'is_active', type: 'boolean', nullable: false, default: true })
    isActive: boolean;

    // relations
    @Column({ name: 'created_by', type: 'uuid' , nullable: true })
    @OneToOne(() => User)
    @JoinColumn({ name: 'created_by' })
    createdBy: User | string;

    @Column({ name: 'updated_by', type: 'uuid', nullable: true })
    @OneToOne(() => User)
    @JoinColumn({ name: 'updated_by', referencedColumnName: 'id' })
    updatedBy: User | string;

    @OneToMany(() => UsersPosts, userPosts => userPosts.user)
    @JoinColumn({ referencedColumnName: 'user_id' })
    userPosts: UsersPosts[];

    // methods
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12);
    }

    validateHashedPassword(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}

