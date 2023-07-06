import BaseModel from './base.entity';
import { User } from './users.entity';
import { UsersPosts } from './usersPosts.entity';
import { Entity, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity('posts')
export class Post extends BaseModel {
    @Column({ name: 'html_code', type: 'varchar', nullable: false })
    htmlCode: string;

    @Column({ name: 'is_delete', type: 'boolean', nullable: false, default: false })
    isDeleted: boolean;

    @Column({ name: 'created_by', type: 'uuid' })
    @ManyToOne(() => User)
    @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
    createdBy: User | string;    

    @Column({ name: 'updated_by', type: 'uuid', nullable: true })
    @ManyToOne(() => User)
    @JoinColumn({ name: 'updated_by', referencedColumnName: 'id' })
    updatedBy: User | string;

    // relations
    @OneToMany(() => UsersPosts, userPosts => userPosts.post)
    @JoinColumn({ referencedColumnName: 'post_id' })
    userPosts: UsersPosts[];
}

