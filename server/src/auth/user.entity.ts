import { Board } from "src/boards/board.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

// enum UserRole {
//     NORMAL = 'NORMAL',
//     ADMIN = 'ADMIN'
// }
@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    image: string;

    // @Column({ default: UserRole.NORMAL })
    // role: UserRole;

    @OneToMany(type => Board, board => board.user, { eager: true })
    boards: Board[];
}