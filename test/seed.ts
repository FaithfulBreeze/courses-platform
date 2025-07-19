import { Course } from 'src/courses/entities/course.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource, EntityManager } from 'typeorm';

export const seed = async (dataSource: DataSource) => {
  dataSource.transaction(async (manager) => {
    await createUsers(manager);
    await createCourses(manager);
    await updateUsers(manager);
    await createLessons(manager);
  });
};

const createUsers = async (manager: EntityManager) => {
  const johnDoe = manager.create(User, {
    email: 'johndoe@gmail.com',
    name: 'John Doe',
    password: '$2b$04$TDRHP3KTjMMd4uWmecBMCussftbIkRFaRg080NTNEMsKCKd3Yuve2',
  });

  const janeDoe = manager.create(User, {
    email: 'janedoe@gmail.com',
    name: 'Jane Doe',
    password: '$2b$04$TDRHP3KTjMMd4uWmecBMCussftbIkRFaRg080NTNEMsKCKd3Yuve2',
  });

  const jeffDoe = manager.create(User, {
    email: 'jeffdoe@gmail.com',
    name: 'Jeff Doe',
    password: '$2b$04$TDRHP3KTjMMd4uWmecBMCussftbIkRFaRg080NTNEMsKCKd3Yuve2',
  });

  await manager.save([johnDoe, janeDoe, jeffDoe]);
};

const createCourses = async (manager: EntityManager) => {
  const janeDoe = await manager.findOne(User, { where: { id: 2 } });

  if (!janeDoe) return;

  const course1 = manager.create(Course, {
    owner: janeDoe,
    title: 'React Native in a nutshell',
    description: 'Learn today how to use react native and create awesome apps.',
    thumbnail:
      'https://4409803.fs1.hubspotusercontent-na1.net/hubfs/4409803/react-native%20%281%29.png',
  });

  const course2 = manager.create(Course, {
    owner: janeDoe,
    title: 'Vue.js Masterclass',
    description: 'Master Vue.js framework to build reactive and scalable frontend applications.',
    thumbnail: 'https://blog.geekhunter.com.br/wp-content/uploads/2019/12/vue-js.png',
  });

  const course3 = manager.create(Course, {
    owner: janeDoe,
    title: 'Angular, the Google framework',
    description: 'The robust, opiniated and enterprise focused framework built by google.',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTeNhddUQInfcuwztyqws-yWCaGB-y1gzJmg&s',
  });

  const course4 = manager.create(Course, {
    owner: janeDoe,
    title: 'Postgres, the only relational database you need',
    description: 'Store your data in a robust an reliable database',
    thumbnail: 'https://aembit.io/wp-content/uploads/2023/09/The-Strange-World-of-Postgres-TLS.png',
  });

  const course5 = manager.create(Course, {
    owner: janeDoe,
    title: 'Graphql masterclass',
    description: 'No more than you need, ask what you want, receive what you expect.',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA3_xJ6WRWOrac_NwofY5bIFxE6Q7r0b-5Dg&s',
  });

  const course6 = manager.create(Course, {
    owner: janeDoe,
    title: 'Nestjs for noobs',
    description: 'This course will make you go from noob to high skilled Nestjs developer.',
    thumbnail: 'https://nestjs.com/img/nest-og.png',
  });

  const course7 = manager.create(Course, {
    owner: janeDoe,
    title: 'Fastify, the lightweight easy setup framework',
    description: 'Learn how to easily create apis with Fastify Framework',
    thumbnail:
      'https://repository-images.githubusercontent.com/69495170/8125e100-61bc-11e9-8d9f-eb01f522f962',
  });

  await manager.save([course1, course2, course3, course4, course5, course6, course7]);
};

const updateUsers = async (manager: EntityManager) => {
  const johnDoe = await manager.findOne(User, { where: { id: 1 } });

  if (!johnDoe) return;
  const janeDoeCourses = await manager.find(Course, {
    relations: { owner: true },
    where: {
      owner: {
        id: 2,
      },
    },
  });

  johnDoe.purchasedCourses = janeDoeCourses;

  await manager.save(johnDoe);
};

const createLessons = async (manager: EntityManager) => {
  const lesson1 = manager.create(Lesson, {
    courseId: 1,
    title: 'Understanding core concepts',
    description: 'In this lesson we will understand the fundamentals of the React Native',
    url: 'https://apjakoxmjctsnnmw.public.blob.vercel-storage.com/Grava%C3%A7%C3%A3o%20de%20tela%20de%202025-07-05%2000-16-46.webm',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPu6kSUxjLXBDW3_j0XIQTihfo4WRs1fC8Zg&s',
  });

  await manager.save(lesson1);
};
