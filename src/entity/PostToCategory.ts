import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Post } from "./Post";

@Entity()
export class PostToCategory {
    @PrimaryGeneratedColumn()
    public postToCategoryId!: number

    @Column()
    public postId!: number;

    @Column()
    public categoryId!: number;

    @Column()
    public order!: number

    @ManyToOne(() => Post, (post) => post.postToCategories)
    public post! : Post

    @ManyToOne(() => Category, (category) => category.postToCategories)
    public category!: Category
}

/*
다대다 관계에서 만들어진 조인테이블에 기본적으로 생성되는 칼럼 외 다른 칼럼을 추가하고 싶다면, 
조인테이블을 따로 생성해준 후 관계설정을 직접 해주어야한다. 
위의 경우에는 포스트와 카테고리 테이블의 조인테이블에 order 칼럼을 추가하기 위해, PostToCategory 테이블을 만들었다.
이때 각각 Post와 PostToCategory, Category와 PostToCategory는 1대다의 관계를 가지므로, 
위와같이 관계를 작성해준다. 
*/