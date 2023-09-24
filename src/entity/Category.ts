import { Column, DeleteDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostToCategory } from "./PostToCategory";
import { Question } from "./Question";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name: string;

    @DeleteDateColumn()
    deletedAt: Date; 

    @ManyToMany(() => Question, (question) => question.categories)
    questions: Question

    @OneToMany(() => PostToCategory, (postToCategory) => postToCategory.category)
    public postToCategories!: PostToCategory[]
}