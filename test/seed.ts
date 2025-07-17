import { Course } from 'src/courses/entities/course.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource, EntityManager } from 'typeorm';

export const seed = async (dataSource: DataSource) => {
  dataSource.transaction(async (manager) => {
    await createUsers(manager);
    await createCourses(manager);
    await updateUsers(manager);
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
    name: 'React Native in a nutshell',
    description: 'Learn today how to use react native and create awesome apps.',
    thumbnail:
      'https://4409803.fs1.hubspotusercontent-na1.net/hubfs/4409803/react-native%20%281%29.png',
  });

  const course2 = manager.create(Course, {
    owner: janeDoe,
    name: 'Vue.js Masterclass',
    description:
      'Master Vue.js framework to build reactive and scalable frontend applications.',
    thumbnail:
      'https://blog.geekhunter.com.br/wp-content/uploads/2019/12/vue-js.png',
  });

  const course3 = manager.create(Course, {
    owner: janeDoe,
    name: 'Angular, the Google framework',
    description:
      'The robust, opiniated and enterprise focused framework built by google.',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTeNhddUQInfcuwztyqws-yWCaGB-y1gzJmg&s',
  });

  const course4 = manager.create(Course, {
    owner: janeDoe,
    name: 'Angular, the Google framework',
    description:
      'The robust, opiniated and enterprise focused framework built by google.',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTeNhddUQInfcuwztyqws-yWCaGB-y1gzJmg&s',
  });

  const course5 = manager.create(Course, {
    owner: janeDoe,
    name: 'Angular, the Google framework',
    description:
      'The robust, opiniated and enterprise focused framework built by google.',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTeNhddUQInfcuwztyqws-yWCaGB-y1gzJmg&s',
  });

  const course6 = manager.create(Course, {
    owner: janeDoe,
    name: 'Angular, the Google framework',
    description:
      'The robust, opiniated and enterprise focused framework built by google.',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTeNhddUQInfcuwztyqws-yWCaGB-y1gzJmg&s',
  });

  const course7 = manager.create(Course, {
    owner: janeDoe,
    name: 'Angular, the Google framework',
    description:
      'The robust, opiniated and enterprise focused framework built by google.',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTeNhddUQInfcuwztyqws-yWCaGB-y1gzJmg&s',
  });

  await manager.save([
    course1,
    course2,
    course3,
    course4,
    course5,
    course6,
    course7,
  ]);
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
