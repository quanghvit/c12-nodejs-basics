import BaseModel from './base.entity';
import { User } from './users.entity';
import { Entity, Column, OneToMany, JoinColumn } from 'typeorm';
import { UsersPosts } from './usersPosts.entity';

@Entity('posts')
export class Post extends BaseModel {
    @Column({ name: 'html_code', type: 'varchar', nullable: false })
    htmlCode: string;

    @Column({ name: 'is_delete', type: 'boolean', nullable: false, default: false })
    isDelete: boolean;

    @Column({ name: 'created_by', type: 'uuid' })
    createdBy: User;    

    @Column({ name: 'updated_by', type: 'uuid' })
    updatedBy: User;

    // relations
    @OneToMany(() => UsersPosts, userPosts => userPosts.post)
    @JoinColumn({ referencedColumnName: 'post_id' })
    userPosts: UsersPosts[];
}

