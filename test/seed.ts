import { Course } from 'src/courses/entities/course.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource, EntityManager } from 'typeorm';

export const seed = async (dataSource: DataSource) => {
  dataSource.transaction(async (manager) => {
    await createUsers(manager);
    await createCourses(manager);
    await updateUsers(manager);
    await createLessons(manager);
    await createReviews(manager);
  });
};

const createUsers = async (manager: EntityManager) => {
  const users = manager.create(User, [
    {
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      password: '$2b$04$TDRHP3KTjMMd4uWmecBMCussftbIkRFaRg080NTNEMsKCKd3Yuve2',
      avatar:
        'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?_gl=1*f3b8uv*_ga*MTc3ODg5MDAzLjE3NTMxNDI0MDA.*_ga_8JE65Q40S6*czE3NTMxNDI0MDAkbzEkZzEkdDE3NTMxNDI0MTIkajQ4JGwwJGgw',
    },
    {
      email: 'janedoe@gmail.com',
      name: 'Jane Doe',
      password: '$2b$04$TDRHP3KTjMMd4uWmecBMCussftbIkRFaRg080NTNEMsKCKd3Yuve2',
      avatar:
        'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?_gl=1*oho9v4*_ga*MTc3ODg5MDAzLjE3NTMxNDI0MDA.*_ga_8JE65Q40S6*czE3NTMxNDI0MDAkbzEkZzEkdDE3NTMxNDI1MjEkajU0JGwwJGgw',
    },
    {
      email: 'jeffdoe@gmail.com',
      name: 'Jeff Doe',
      password: '$2b$04$TDRHP3KTjMMd4uWmecBMCussftbIkRFaRg080NTNEMsKCKd3Yuve2',
      avatar:
        'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?_gl=1*7xzj01*_ga*MTc3ODg5MDAzLjE3NTMxNDI0MDA.*_ga_8JE65Q40S6*czE3NTMxNDI0MDAkbzEkZzEkdDE3NTMxNDI0NTYkajQkbDAkaDA.',
    },
    {
      name: 'Emily Carter',
      email: 'emilycarter@gmail.com',
      password: '$2b$04$TDRHP3KTjMMd4uWmecBMCussftbIkRFaRg080NTNEMsKCKd3Yuve2',
      avatar:
        'https://images.pexels.com/photos/1960183/pexels-photo-1960183.jpeg?_gl=1*n4hl9e*_ga*MTc3ODg5MDAzLjE3NTMxNDI0MDA.*_ga_8JE65Q40S6*czE3NTMxNDI0MDAkbzEkZzEkdDE3NTMxNDI3MTMkajQyJGwwJGgw',
    },
    {
      name: 'Liam Turner',
      email: 'liamturner@gmail.com',
      password: '$2b$04$TDRHP3KTjMMd4uWmecBMCussftbIkRFaRg080NTNEMsKCKd3Yuve2',
      avatar:
        'https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?_gl=1*5rf4qt*_ga*MTc3ODg5MDAzLjE3NTMxNDI0MDA.*_ga_8JE65Q40S6*czE3NTMxNDI0MDAkbzEkZzEkdDE3NTMxNDI3NTIkajMkbDAkaDA.',
    },
    {
      name: 'Sophia Nguyen',
      email: 'sophianguyen@gmail.com',
      password: '$2b$04$TDRHP3KTjMMd4uWmecBMCussftbIkRFaRg080NTNEMsKCKd3Yuve2',
      avatar:
        'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?_gl=1*mi8cv9*_ga*MTc3ODg5MDAzLjE3NTMxNDI0MDA.*_ga_8JE65Q40S6*czE3NTMxNDI0MDAkbzEkZzEkdDE3NTMxNDI3NzkkajU0JGwwJGgw',
    },
    {
      name: 'Noah Wilson',
      email: 'noahwilson@gmail.com',
      password: '$2b$04$TDRHP3KTjMMd4uWmecBMCussftbIkRFaRg080NTNEMsKCKd3Yuve2',
      avatar:
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?_gl=1*bf6873*_ga*MTc3ODg5MDAzLjE3NTMxNDI0MDA.*_ga_8JE65Q40S6*czE3NTMxNDI0MDAkbzEkZzEkdDE3NTMxNDI4MTQkajE5JGwwJGgw',
    },
    {
      name: 'Ava Patel',
      email: 'avapatel@gmail.com',
      password: '$2b$04$TDRHP3KTjMMd4uWmecBMCussftbIkRFaRg080NTNEMsKCKd3Yuve2',
      avatar:
        'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?_gl=1*1c7r2lm*_ga*MTc3ODg5MDAzLjE3NTMxNDI0MDA.*_ga_8JE65Q40S6*czE3NTMxNDI0MDAkbzEkZzEkdDE3NTMxNDI4NTEkajQ0JGwwJGgw',
    },
    {
      name: 'James Lee',
      email: 'jameslee@gmail.com',
      password: '$2b$04$TDRHP3KTjMMd4uWmecBMCussftbIkRFaRg080NTNEMsKCKd3Yuve2',
    },
    {
      name: 'Olivia Davis',
      email: 'oliviadavis@gmail.com',
      password: '$2b$04$TDRHP3KTjMMd4uWmecBMCussftbIkRFaRg080NTNEMsKCKd3Yuve2',
      avatar:
        'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?_gl=1*954rii*_ga*MTc3ODg5MDAzLjE3NTMxNDI0MDA.*_ga_8JE65Q40S6*czE3NTMxNDI0MDAkbzEkZzEkdDE3NTMxNDI5MjYkajMyJGwwJGgw',
    },
    {
      name: 'William Garcia',
      email: 'williamgarcia@gmail.com',
      password: '$2b$04$TDRHP3KTjMMd4uWmecBMCussftbIkRFaRg080NTNEMsKCKd3Yuve2',
      avatar:
        'https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?_gl=1*k4glep*_ga*MTc3ODg5MDAzLjE3NTMxNDI0MDA.*_ga_8JE65Q40S6*czE3NTMxNDI0MDAkbzEkZzEkdDE3NTMxNDI5ODgkajM2JGwwJGgw',
    },
    {
      name: 'Isabella Kim',
      email: 'isabellakim@gmail.com',
      password: '$2b$04$TDRHP3KTjMMd4uWmecBMCussftbIkRFaRg080NTNEMsKCKd3Yuve2',
      avatar:
        'https://images.pexels.com/photos/3916455/pexels-photo-3916455.jpeg?_gl=1*q4kod7*_ga*MTc3ODg5MDAzLjE3NTMxNDI0MDA.*_ga_8JE65Q40S6*czE3NTMxNDI0MDAkbzEkZzEkdDE3NTMxNDMwMTckajckbDAkaDA.',
    },
    {
      name: 'Benjamin Scott',
      email: 'benjaminscott@gmail.com',
      password: '$2b$04$TDRHP3KTjMMd4uWmecBMCussftbIkRFaRg080NTNEMsKCKd3Yuve2',
      avatar:
        'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?_gl=1*2ncrr5*_ga*MTc3ODg5MDAzLjE3NTMxNDI0MDA.*_ga_8JE65Q40S6*czE3NTMxNDI0MDAkbzEkZzEkdDE3NTMxNDMwNDAkajUzJGwwJGgw',
    },
    {
      name: 'Mia Thompson',
      email: 'miathompson@gmail.com',
      password: '$2b$04$TDRHP3KTjMMd4uWmecBMCussftbIkRFaRg080NTNEMsKCKd3Yuve2',
      avatar:
        'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?_gl=1*10coxjk*_ga*MTc3ODg5MDAzLjE3NTMxNDI0MDA.*_ga_8JE65Q40S6*czE3NTMxNDI0MDAkbzEkZzEkdDE3NTMxNDMwNzEkajIyJGwwJGgw',
    },
    {
      name: 'Daniel Martinez',
      email: 'danielmartinez@gmail.com',
      password: '$2b$04$TDRHP3KTjMMd4uWmecBMCussftbIkRFaRg080NTNEMsKCKd3Yuve2',
      avatar:
        'https://images.pexels.com/photos/33090604/pexels-photo-33090604.jpeg?_gl=1*9y5ivh*_ga*MTc3ODg5MDAzLjE3NTMxNDI0MDA.*_ga_8JE65Q40S6*czE3NTMxNDI0MDAkbzEkZzEkdDE3NTMxNDMxMDkkajQ2JGwwJGgw',
    },
    {
      name: 'Grace Rivera',
      email: 'gracerivera@gmail.com',
      password: '$2b$04$TDRHP3KTjMMd4uWmecBMCussftbIkRFaRg080NTNEMsKCKd3Yuve2',
      avatar:
        'https://images.pexels.com/photos/2505031/pexels-photo-2505031.jpeg?_gl=1*zdhxmx*_ga*MTc3ODg5MDAzLjE3NTMxNDI0MDA.*_ga_8JE65Q40S6*czE3NTMxNDI0MDAkbzEkZzEkdDE3NTMxNDMxMzIkajIzJGwwJGgw',
    },
    {
      name: 'Elijah Moore',
      email: 'elijahmoore@gmail.com',
      password: '$2b$04$TDRHP3KTjMMd4uWmecBMCussftbIkRFaRg080NTNEMsKCKd3Yuve2',
      avatar:
        'https://images.pexels.com/photos/33076472/pexels-photo-33076472.jpeg?_gl=1*jxf4ws*_ga*MTc3ODg5MDAzLjE3NTMxNDI0MDA.*_ga_8JE65Q40S6*czE3NTMxNDI0MDAkbzEkZzEkdDE3NTMxNDMxNTkkajU2JGwwJGgw',
    },
  ]);

  await manager.save(users);
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
    trailer:
      'https://apjakoxmjctsnnmw.public.blob.vercel-storage.com/React_Native_Course_Trailer_Generated.mp4',
    trailerDuration: 8,
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
  const lessons = manager.create(Lesson, [
    // React Native Lessons (courseId: 1)
    {
      courseId: 1,
      title: 'Understanding core concepts',
      description: 'In this lesson we will understand the fundamentals of React Native.',
      url: 'https://apjakoxmjctsnnmw.public.blob.vercel-storage.com/Grava%C3%A7%C3%A3o%20de%20tela%20de%202025-07-05%2000-16-46.webm',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPu6kSUxjLXBDW3_j0XIQTihfo4WRs1fC8Zg&s',
      completedBy: [{ id: 1 }],
    },
    {
      courseId: 1,
      title: 'Setting up the development environment',
      description:
        'Learn how to configure your tools for React Native development on different platforms.',
      url: 'https://example.com/video2.webm',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPu6kSUxjLXBDW3_j0XIQTihfo4WRs1fC8Zg&s',
    },
    {
      courseId: 1,
      title: 'Building your first component',
      description: 'Dive into creating your first functional component using React Native.',
      url: 'https://example.com/video3.webm',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPu6kSUxjLXBDW3_j0XIQTihfo4WRs1fC8Zg&s',
    },
    {
      courseId: 1,
      title: 'Styling in React Native',
      description:
        'Understand how styles are applied in React Native and how they differ from web CSS.',
      url: 'https://example.com/video4.webm',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPu6kSUxjLXBDW3_j0XIQTihfo4WRs1fC8Zg&s',
    },
    {
      courseId: 1,
      title: 'Handling navigation',
      description: 'Explore React Navigation and how to manage screen transitions in your app.',
      url: 'https://example.com/video5.webm',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPu6kSUxjLXBDW3_j0XIQTihfo4WRs1fC8Zg&s',
    },
    {
      courseId: 1,
      title: 'Working with APIs',
      description:
        'Learn to fetch and display remote data using `fetch` and async operations in React Native.',
      url: 'https://example.com/video6.webm',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPu6kSUxjLXBDW3_j0XIQTihfo4WRs1fC8Zg&s',
    },
    {
      courseId: 1,
      title: 'Deploying your app',
      description:
        'A step-by-step guide on how to build and deploy your React Native app to app stores.',
      url: 'https://example.com/video7.webm',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPu6kSUxjLXBDW3_j0XIQTihfo4WRs1fC8Zg&s',
    },

    // Vue.js Lessons (courseId: 2)
    {
      courseId: 2,
      title: 'Introduction to Vue.js',
      description: 'Learn the core concepts of Vue.js and how it compares to other frameworks.',
      url: 'https://example.com/vue-intro.webm',
      thumbnail: 'https://vuejs.org/images/logo.png',
    },
    {
      courseId: 2,
      title: 'Setting up a Vue.js project',
      description: 'Set up your first Vue.js project using the Vue CLI.',
      url: 'https://example.com/vue-setup.webm',
      thumbnail: 'https://vuejs.org/images/logo.png',
    },
    {
      courseId: 2,
      title: 'Creating components in Vue',
      description: 'Build reusable Vue components and understand the component lifecycle.',
      url: 'https://example.com/vue-components.webm',
      thumbnail: 'https://vuejs.org/images/logo.png',
    },
    {
      courseId: 2,
      title: 'Vue directives and data binding',
      description: "Explore Vue's powerful template syntax and learn how data binding works.",
      url: 'https://example.com/vue-directives.webm',
      thumbnail: 'https://vuejs.org/images/logo.png',
    },
    {
      courseId: 2,
      title: 'Routing with Vue Router',
      description: 'Implement navigation between views using Vue Router.',
      url: 'https://example.com/vue-router.webm',
      thumbnail: 'https://vuejs.org/images/logo.png',
    },
    {
      courseId: 2,
      title: 'State management with Vuex',
      description: 'Learn to manage application state in larger apps using Vuex.',
      url: 'https://example.com/vuex.webm',
      thumbnail: 'https://vuejs.org/images/logo.png',
    },
    {
      courseId: 2,
      title: 'Deploying a Vue.js app',
      description: 'Steps to build and deploy a Vue.js app to the web.',
      url: 'https://example.com/vue-deploy.webm',
      thumbnail: 'https://vuejs.org/images/logo.png',
    },
    {
      courseId: 3,
      title: 'Getting Started with Angular',
      description:
        'Introduction to Angular and setting up your development environment using Angular CLI.',
      url: 'https://example.com/angular-intro.webm',
      thumbnail: 'https://angular.io/assets/images/logos/angular/angular.png',
    },
    {
      courseId: 3,
      title: 'Understanding Angular Modules',
      description: 'Explore NgModules and how they help organize an Angular app.',
      url: 'https://example.com/angular-modules.webm',
      thumbnail: 'https://angular.io/assets/images/logos/angular/angular.png',
    },
    {
      courseId: 3,
      title: 'Building Components in Angular',
      description: 'Learn to create components and how they interact via inputs and outputs.',
      url: 'https://example.com/angular-components.webm',
      thumbnail: 'https://angular.io/assets/images/logos/angular/angular.png',
    },
    {
      courseId: 3,
      title: 'Templates and Data Binding',
      description: 'Understand Angular templates and various data binding techniques.',
      url: 'https://example.com/angular-binding.webm',
      thumbnail: 'https://angular.io/assets/images/logos/angular/angular.png',
    },
    {
      courseId: 3,
      title: 'Angular Routing and Navigation',
      description: 'Implement navigation and dynamic views using Angular Router.',
      url: 'https://example.com/angular-routing.webm',
      thumbnail: 'https://angular.io/assets/images/logos/angular/angular.png',
    },
    {
      courseId: 3,
      title: 'Using Angular Services and Dependency Injection',
      description: 'Build reusable services and understand Angular’s DI system.',
      url: 'https://example.com/angular-services.webm',
      thumbnail: 'https://angular.io/assets/images/logos/angular/angular.png',
    },
    {
      courseId: 3,
      title: 'Deploying an Angular Application',
      description:
        'How to build and deploy your Angular app using Angular CLI and hosting platforms.',
      url: 'https://example.com/angular-deploy.webm',
      thumbnail: 'https://angular.io/assets/images/logos/angular/angular.png',
    },
  ]);

  await manager.save(lessons);
};

const createReviews = async (manager: EntityManager) => {
  const sampleContents = [
    'This course changed the way I write code. Amazing explanation of concepts.',
    'I expected more depth, but it was still a good introduction.',
    'Great pace and lots of examples. Loved the coding challenges.',
    'The visuals were super helpful and the instructor was easy to follow.',
    'I already had some experience but learned many new tricks.',
    'The course could use some updating, but it’s solid overall.',
    'Awesome experience! Now I feel confident building full-stack apps.',
    'Some parts were too fast-paced for beginners.',
    'Perfect for intermediate developers. Loved the GraphQL section.',
    "Sound quality wasn't great, but the content made up for it.",
    'Really clear explanations, even for tough concepts like closures.',
    "Didn't finish the course but liked what I saw so far.",
    'Animations and diagrams helped me understand things better.',
    'I wish the course had more hands-on projects.',
    'Solid fundamentals and practical examples.',
    'Could improve quizzes, some of them were too easy.',
    'Learned more in this course than a whole semester in college.',
    'Great Docker walkthrough! CI/CD section was top-notch.',
    'I’d recommend this to any junior dev looking to grow.',
    'Fantastic intro to Node.js and Express.',
    'The course community was very helpful.',
    'There were a few typos, but nothing major.',
    'Instructor was fun and made the course enjoyable.',
    'Very dry presentation style, hard to stay focused.',
    'Challenging but rewarding.',
    'The real-world projects were the best part.',
    'I felt lost during the testing section.',
    'Easy to follow and build along.',
    'Better than expected!',
    'Wish it had subtitles in other languages.',
    'The instructor skipped over some advanced topics.',
    'Informative but not very engaging.',
    'A comprehensive crash course!',
    'Too many assumptions about prior knowledge.',
    'Loved the React Native tips!',
    'Deep dive into TypeScript was excellent.',
    'Learned REST APIs and MongoDB integration in a weekend.',
    'Could’ve explained Redux better.',
    'Very good overview of deployment pipelines.',
    'Would recommend to friends and coworkers.',
    'Binge-watched it in two days.',
    'Helpful even for experienced devs.',
    'Outdated React version, but still useful.',
    'Gave me confidence to apply for dev jobs.',
    'Hard to understand some code examples.',
    'Each module was well-organized.',
    'I appreciate the extra resources and cheat sheets.',
    'The animations were super engaging.',
    'I feel like I can build a full-stack app now.',
    'Fantastic content, poor editing.',
    'Wished for more interactive code playgrounds.',
  ];

  const reviews: any[] = [];

  for (let i = 0; i < 50; i++) {
    const reviewerId = Math.floor(Math.random() * 15) + 1; // user id 1–15

    if (reviews.some((review) => review.reviewer.id == reviewerId)) continue;
    reviews.push({
      content: sampleContents[i % sampleContents.length],
      course: {
        id: Math.floor(Math.random() * 6) + 1, // course id 1–6
      },
      reviewer: {
        id: reviewerId,
      },
      rate: Math.floor(Math.random() * 3) + 3, // 3–5 stars
    });
  }

  const createdReviews = manager.create(Review, reviews);
  await manager.save(createdReviews);
};
