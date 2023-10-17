import {rest} from 'msw'
import { faker } from '@faker-js/faker';

export const handlers = [
  // Handles a POST /login request
  rest.post('/api/login', (req, res, ctx) => {
    return res(
      // Calling `ctx.cookie()` sets given cookies
      // on `document.cookie` directly.
      ctx.cookie('connect.sid', 'msw-cookie', {
        httpOnly: true,
        path: '/'
      }),
      ctx.json({
        userId: 1,
        nickname: '제로초',
        id: 'zerocho',
      })
    )
  }),
  rest.post('/api/logout', (req, res, ctx) => {
    return res(
      // Calling `ctx.cookie()` sets given cookies
      // on `document.cookie` directly.
      ctx.cookie('connect.sid', '', {
        httpOnly: true,
        path: '/'
      }),
    )
  }),

  rest.post('/api/users/:id/follow', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        'ok'
      )
    )
  }),

  rest.get('/api/postRecommends', (req, res, ctx) => {
    const cursor = parseInt(req.url.searchParams.get('cursor') || '0');
    return res(
      ctx.json(
        [
          {
            postId: cursor + 1,
            User: {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
            content: `${cursor + 1} Z.com is so marvelous. I'm gonna buy that.`,
            Images: [{link: faker.image.urlLoremFlickr()}],
            createdAt: new Date(),
          },
          {
            postId: cursor + 2,
            User: {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
            content: `${cursor + 2} Z.com is so marvelous. I'm gonna buy that.`,
            Images: [{link: faker.image.urlLoremFlickr()}],
            createdAt: new Date(),
          },
          {
            postId: cursor + 3,
            User: {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
            content: `${cursor + 3} Z.com is so marvelous. I'm gonna buy that.`,
            Images: [{link: faker.image.urlLoremFlickr()}],
            createdAt: new Date(),
          },
          {
            postId: cursor + 4,
            User: {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
            content: `${cursor + 4} Z.com is so marvelous. I'm gonna buy that.`,
            Images: [{link: faker.image.urlLoremFlickr()}],
            createdAt: new Date(),
          },
          {
            postId: cursor + 5,
            User: {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
            content: `${cursor + 5} Z.com is so marvelous. I'm gonna buy that.`,
            Images: [{link: faker.image.urlLoremFlickr()}],
            createdAt: new Date(),
          },
        ]
      )
    )
  }),

  rest.get('/api/followingPosts', (req, res, ctx) => {
    const cursor = parseInt(req.url.searchParams.get('cursor') || '0');
    return res(
      ctx.json(
        [
          {
            postId: cursor + 1,
            User: {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
            content: 'Stop follow me. I\'m too famous,',
            Images: [{link: faker.image.urlLoremFlickr()}],
            createdAt: new Date(),
          },
          {
            postId: cursor + 2,
            User: {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
            content: 'Stop follow me. I\'m too famous,',
            Images: [{link: faker.image.urlLoremFlickr()}],
            createdAt: new Date(),
          },
          {
            postId: cursor + 3,
            User: {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
            content: 'Stop follow me. I\'m too famous,',
            Images: [{link: faker.image.urlLoremFlickr()}],
            createdAt: new Date(),
          },
          {
            postId: cursor + 4,
            User: {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
            content: 'Stop follow me. I\'m too famous,',
            Images: [{link: faker.image.urlLoremFlickr()}],
            createdAt: new Date(),
          },
          {
            postId: cursor + 5,
            User: {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
            content: 'Stop follow me. I\'m too famous,',
            Images: [{link: faker.image.urlLoremFlickr()}],
            createdAt: new Date(),
          },
        ]
      )
    )
  }),

  rest.get('/api/users/:id', (req, res, ctx) => {
    return res(
      ctx.json(
        {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'}
      )
    )
  }),

  rest.get('/api/users/:id/posts', (req, res, ctx) => {
    return res(
      ctx.json(
        [
          {
            postId: 1,
            User: {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
            content: faker.lorem.text(),
            Images: [{link: faker.image.urlLoremFlickr()}],
            createdAt: new Date(),
          },
          {
            postId: 2,
            User: {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
            content: faker.lorem.text(),
            Images: [{link: faker.image.urlLoremFlickr()}],
            createdAt: new Date(),
          },
          {
            postId: 3,
            User: {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
            content: faker.lorem.text(),
            Images: [{link: faker.image.urlLoremFlickr()}],
            createdAt: new Date(),
          },
          {
            postId: 4,
            User: {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
            content: faker.lorem.text(),
            Images: [{link: faker.image.urlLoremFlickr()}],
            createdAt: new Date(),
          },
          {
            postId: 5,
            User: {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
            content: faker.lorem.text(),
            Images: [{link: faker.image.urlLoremFlickr()}],
            createdAt: new Date(),
          },
        ]
      )
    )
  }),

  rest.get('/api/trends', (req, res, ctx) => {
    return res(
      ctx.json(
        [
          {title: '제로초', count: 1264},
          {title: '원초', count: 1264},
          {title: '투초', count: 1264},
          {title: '쓰리초', count: 1264},
          {title: '포초', count: 1264},
          {title: '파이브초', count: 1264},
          {title: '식스초', count: 1264},
          {title: '세븐초', count: 1264},
          {title: '나인초', count: 1264},
        ]
      )
    )
  }),

  rest.get('/api/followRecommends', (req, res, ctx) => {
    return res(
      ctx.json(
        [
          {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
          {id: faker.internet.userName().toLowerCase(), nickname: faker.person.fullName(), image: faker.image.urlLoremFlickr()},
          {id: faker.internet.userName().toLowerCase(), nickname: faker.person.fullName(), image: faker.image.urlLoremFlickr()}
        ]
      )
    )
  }),

  rest.post('/api/posts', async (req, res, ctx) => {
    const body = await req.json();
    console.log('body', body);
    return res(
      ctx.status(201),
      ctx.json(
        {
          id: Math.random(),
          User: {id: 'zerohch0', nickname: '조현영', image: '/5Udwvqim.jpg'},
          content: body.content,
          Images: [],
        },
      )
    )
  }),

  rest.get<null, { tag: string }>('/api/search/:tag', async (req, res, ctx) => {
    const tag = req.params.tag;
    const live = req.url.searchParams.get('f') === 'live';
    const followingOnly = req.url.searchParams.get('pf') === 'on';
    return res(
      ctx.json(
        [
          {
            postId: 1,
            User: {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
            content: `Z.com search result for ${tag} ${live ? 'sort by date' : ''} ${followingOnly ? 'only following' : ''}`,
            Images: [{link: faker.image.urlLoremFlickr()}],
            createdAt: new Date(),
          },
          {
            postId: 2,
            User: {id: 'zerohch0', nickname: '조현영', image: '/5Udwvqim.jpg'},
            content: `Z.com search result for ${tag} ${live ? 'sort by date' : ''} ${followingOnly ? 'only following' : ''}`,
            Images: [{link: faker.image.urlLoremFlickr()}],
            createdAt: new Date(),
          },
          {
            postId: 3,
            User: {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
            content: `Z.com search result for ${tag} ${live ? 'sort by date' : ''} ${followingOnly ? 'only following' : ''}`,
            Images: [{link: faker.image.urlLoremFlickr()}],
            createdAt: new Date(),
          },
          {
            postId: 4,
            User: {id: 'zerohch0', nickname: '조현영', image: '/5Udwvqim.jpg'},
            content: `Z.com search result for ${tag} ${live ? 'sort by date' : ''} ${followingOnly ? 'only following' : ''}`,
            Images: [{link: faker.image.urlLoremFlickr()}],
            createdAt: new Date(),
          },
          {
            postId: 5,
            User: {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
            content: `Z.com search result for ${tag} ${live ? 'sort by date' : ''} ${followingOnly ? 'only following' : ''}`,
            Images: [{link: faker.image.urlLoremFlickr()}],
            createdAt: new Date(),
          },
        ],
      )
    )
  }),

  rest.get('/api/users/:id/posts/:postId', async (req, res, ctx) => {
    return res(
      ctx.json(
        {
          postId: 6,
          User: {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
          content: `single post`,
          Images: [{link: faker.image.urlLoremFlickr()}],
          createdAt: new Date(),
        },
      )
    )
  }),

  rest.get('/api/users/:id/posts/:postId/comments', async (req, res, ctx) => {
    return res(
      ctx.json(
        [
          {
            postId: 1,
            User: {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
            content: faker.lorem.text(),
            Images: [{link: faker.image.urlLoremFlickr()}],
            createdAt: new Date(),
          },
          {
            postId: 2,
            User: {id: 'zerohch0', nickname: '조현영', image: '/5Udwvqim.jpg'},
            content: faker.lorem.text(),
            Images: [{link: faker.image.urlLoremFlickr()}],
            createdAt: new Date(),
          },
          {
            postId: 3,
            User: {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
            content: faker.lorem.text(),
            Images: [{link: faker.image.urlLoremFlickr()}],
            createdAt: new Date(),
          },
          {
            postId: 4,
            User: {id: 'zerohch0', nickname: '조현영', image: '/5Udwvqim.jpg'},
            content: faker.lorem.text(),
            Images: [{link: faker.image.urlLoremFlickr()}],
            createdAt: new Date(),
          },
          {
            postId: 5,
            User: {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
            content: faker.lorem.text(),
            Images: [{link: faker.image.urlLoremFlickr()}],
            createdAt: new Date(),
          },
        ],
      )
    )
  }),

  rest.post('/api/posts/:id/comments', async (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json(
        {
          postId: Math.random(),
          User: {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
          content: `new comment added`,
          Images: [{link: faker.image.urlLoremFlickr()}],
          createdAt: new Date(),
        },
      )
    )
  }),

  rest.get('/api/posts/:id', async (req, res, ctx) => {
    return res(
      ctx.json(
        {
          postId: 6,
          User: {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
          content: `single post`,
          Images: [{link: faker.image.urlLoremFlickr()}],
          createdAt: new Date(),
        },
      )
    )
  }),

  rest.post('/api/posts/:id/repost', async (req, res, ctx) => {
    const body = await req.json();
    return res(
      ctx.json(
        {
          id: Math.random(),
          User: {id: 'zerohch0', nickname: '조현영', image: '/5Udwvqim.jpg'},
          content: body.content,
          Images: [{link: '/5Udwvqim.jpg'}]
        },
      )
    )
  }),

  rest.post('/api/posts/:id/heart', async (req, res, ctx) => {
    const body = await req.json();
    return res(
      ctx.json('ok')
    )
  }),

  rest.delete('/api/posts/:id/heart', async (req, res, ctx) => {
    const body = await req.json();
    return res(ctx.json('ok'));
  }),

  // Handles a GET /user request
  rest.get('/api/user', (req, res, ctx) => {
    console.log('cookies', req.cookies, !!req.cookies['connect.sid']);
    if (req.cookies['connect.sid']) {
      return res(
        ctx.json({
          userId: 1,
          nickname: '제로초',
          id: 'zerocho',
          image: '/5Udwvqim.jpg',
        })
      );
    }
    return res(ctx.json(false));
  }),
];

