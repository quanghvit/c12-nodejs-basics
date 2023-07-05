import BaseModel from './base.entity';
import { User } from './users.entity';
import { Post } from './posts.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('users_posts')
export class UsersPosts extends BaseModel {
    @Column({ name: 'user_id', type: 'uuid' })
    userId: string;

    @Column({ name: 'post_id', type: 'uuid' })
    postId: string;

    @Column({ name: 'is_delete', type: 'boolean', nullable: false, default: false })
    isDeleted: boolean;

    @Column({ name: 'created_by', type: 'uuid' })
    createdBy: User;

    @Column({ name: 'updated_by', type: 'uuid' })
    updatedBy: User;    

    // relations
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;

    @ManyToOne(() => Post)
    @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
    post: Post;
}

