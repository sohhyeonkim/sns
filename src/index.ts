import { DataSource } from "typeorm";
import { User } from "./entity/User";
import "reflect-metadata";
import { Photo } from "./entity/Photo";
import { PhotoMetadata } from "./entity/PhotoMetadata";
import { Question } from "./entity/Question";
import { Category } from "./entity/Category";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "soh",
  database: "typeormTest",
  entities: [User, Photo, PhotoMetadata, Question, Category],
  synchronize: true,
  logging: true,
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Database has been initialized");
    // insert data by repository
    // const photo = new Photo();
    // photo.name = "Me and Bears";
    // photo.description = "I am near polar bears";
    // photo.filename = "photo-with-bears.jpg";
    // photo.views = 1;
    // photo.isPublished = true;

    // const photoRepository = AppDataSource.getRepository(Photo);

    // await photoRepository.save(photo);
    // console.log("photo has been saved");

    // const savedPhotos = await photoRepository.find();
    // console.log(savedPhotos);

    // ✅loading from the db
    // const photoRepository = AppDataSource.getRepository(Photo);
    // const firstPhoto = await photoRepository.findOneBy({
    //   id: 1,
    // });
    // console.log(firstPhoto);

    // const [photos, photosCount] = await photoRepository.findAndCount();
    // console.log("all photos: ", photos);
    // console.log("photos count: ", photosCount);

    // ✅save a one to one relation
    // const photo = new Photo();
    // photo.name = "Me and Bears";
    // photo.description = "I am near poalr bears";
    // photo.filename = "photo-with-bears.jpg";
    // photo.views = 1;
    // photo.isPublished = true;

    // const metadata = new PhotoMetadata();
    // metadata.height = 100;
    // metadata.width = 200;
    // metadata.compressed = true;
    // metadata.comment = "cybershoot";
    // metadata.orientation = "portrait";
    // metadata.photo = photo; //this way we connect them

    // const photoRepository = AppDataSource.getRepository(Photo);
    // const meatdataRepository = AppDataSource.getRepository(PhotoMetadata);

    // await photoRepository.save(photo);
    // await meatdataRepository.save(metadata);

    //loading objects with their relations by find method
    // const photoRepository = AppDataSource.getRepository(Photo);
    // const photos = await photoRepository.find({
    //   relations: {
    //     metadata: true,
    //   },
    // });
    // console.log(photos);

    // ✅querybuilder
    // const photos = await AppDataSource.getRepository(Photo)
    //   .createQueryBuilder("photo")
    //   .innerJoinAndSelect("photo.metadata", "metadata")
    //   .getMany();
    // console.log(photos);

    // ✅using cascade
    // const user = new User();
    // user.firstName = "soh";
    // user.lastName = "kim";
    // user.age = 10;

    // const photo1 = new Photo();
    // photo1.name = "Me and Bears2";
    // photo1.description = "I am near polar bears2";
    // photo1.filename = "photo-with-bears.jpg2";
    // photo1.isPublished = true;
    // photo1.views = 1;
    // photo1.url = "me.jpg";

    // const photo2 = new Photo();
    // photo2.name = "hello";
    // photo2.description = "helloworld";
    // photo2.filename = "hello.jpg";
    // photo2.isPublished = true;
    // photo2.views = 3;
    // photo2.url = "hello.jpg";

    // const metadata = new PhotoMetadata();
    // metadata.height = 1140;
    // metadata.width = 11480;
    // metadata.compressed = true;
    // metadata.comment = "hellocybershoot";
    // metadata.orientation = "portrait";

    // photo1.metadata = metadata;
    // photo1.user = user;
    // photo2.metadata = metadata;
    // photo2.user = user;

    // const userRepository = AppDataSource.getRepository(User);
    // await userRepository.save(user);

    // const photoRepository = AppDataSource.getRepository(Photo);
    // await photoRepository.save(photo1);
    // await photoRepository.save(photo2);

    // const users = await userRepository.find({
    //   relations: {
    //     photos: true,
    //   },
    // });
    // console.log(users);



    // ✅soft delete relationship with cascade
    // const category1 = new Category()
    // category1.name = "animals2"
    // // await AppDataSource.manager.save(category1)
    
    // const category2 = new Category()
    // category2.name = "zoo2"
    // // await AppDataSource.manager.save(category2)
    
    // const question = new Question()
    // question.title = "dogs"
    // question.text = "who let the dogs out?"
    // question.categories = [category1, category2]
    // const newQuestion = await AppDataSource.manager.save(question)
    // console.log("two categories for one question")

    // await AppDataSource.manager.softRemove(newQuestion)
    // //soft remove는 삭제됐을때 deletedAt 칼럼에 삭제된 시간이 추가된다.
    // //이 경우에는 cascade:true 속성이 Question에 적용되어있기 때문에 150줄에서 question을 저장하면
    // //category에도 두개의 카테고리 데이터가 자동으로 저장된다.
    // console.log("soft removed question")
   
    // ✅load many-to-many relations by using querybuilder
    const questions = await AppDataSource.getRepository(Question)
.createQueryBuilder("question").leftJoinAndSelect("question.categories", "category").getMany();
console.log(questions)
  })
  .catch((error) => console.log(error));

// AppDataSource.initialize()
//   .then(async () => {
//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await AppDataSource.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await AppDataSource.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log(
//       "Here you can setup and run express / fastify / any other framework."
//     );
//   })
//   .catch((error) => console.log(error));
