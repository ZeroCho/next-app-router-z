import { rest } from 'msw'

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

  rest.get('/api/postRecommends', (req, res, ctx) => {
    return res(
      ctx.json(
        [
          { id: 1, User: { id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg' }, content: 'Z.com is so marvelous. I\'m gonna buy that.', Images: [{ link: '/-NEfK-ll.jpg' }] },
          { id: 2, User: { id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg' }, content: 'Z.com is so marvelous. I\'m gonna buy that.', Images: [{ link: '/-NEfK-ll.jpg' }] },
          { id: 3, User: { id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg' }, content: 'Z.com is so marvelous. I\'m gonna buy that.', Images: [{ link: '/-NEfK-ll.jpg' }] },
          { id: 4, User: { id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg' }, content: 'Z.com is so marvelous. I\'m gonna buy that.', Images: [{ link: '/-NEfK-ll.jpg' }] },
          { id: 5, User: { id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg' }, content: 'Z.com is so marvelous. I\'m gonna buy that.', Images: [{ link: '/-NEfK-ll.jpg' }] },
        ]
      )
    )
  }),

  rest.get('/api/trends', (req, res, ctx) => {
    return res(
      ctx.json(
        [
          { title: '제로초', count: 1264 },
          { title: '제로초', count: 1264 },
          { title: '제로초', count: 1264 },
          { title: '제로초', count: 1264 },
          { title: '제로초', count: 1264 },
          { title: '제로초', count: 1264 },
          { title: '제로초', count: 1264 },
          { title: '제로초', count: 1264 },
          { title: '제로초', count: 1264 },
        ]
      )
    )
  }),

  rest.get('/api/followRecommends', (req, res, ctx) => {
    return res(
      ctx.json(
        [
          { id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg' },
          { id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg' },
          { id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg' }
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
        { id: Math.random(), User: { id: 'zerohch0', nickname: '조현영', image: '/5Udwvqim.jpg' }, content: body.content, Images: [{ link: '/5Udwvqim.jpg' }] },
      )
    )
  }),

  rest.get<null, { tag: string }>('/api/search/:tag', async (req, res, ctx) => {
    const tag = req.params.tag;
    return res(
      ctx.json(
        [
          { id: 1, User: { id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg' }, content: `Z.com search result for ${tag}`, Images: [{ link: '/-NEfK-ll.jpg' }] },
          { id: 2, User: { id: 'zerohch0', nickname: '조현영', image: '/5Udwvqim.jpg' }, content: `Z.com search result for ${tag}`, Images: [{ link: '/-NEfK-ll.jpg' }] },
          { id: 3, User: { id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg' }, content: `Z.com search result for ${tag}`, Images: [{ link: '/-NEfK-ll.jpg' }] },
          { id: 4, User: { id: 'zerohch0', nickname: '조현영', image: '/5Udwvqim.jpg' }, content: `Z.com search result for ${tag}`, Images: [{ link: '/-NEfK-ll.jpg' }] },
          { id: 5, User: { id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg' }, content: `Z.com search result for ${tag}`, Images: [{ link: '/-NEfK-ll.jpg' }] },
        ],
      )
    )
  }),

  rest.post('/api/posts/:id/repost', async (req, res, ctx) => {
    const body = await req.json();
    return res(
      ctx.json(
        { id: Math.random(), User: { id: 'zerohch0', nickname: '조현영', image: '/5Udwvqim.jpg' }, content: body.content, Images: [{ link: '/5Udwvqim.jpg' }] },
      )
    )
  }),

  rest.post('/api/posts/:id/heart', async (req, res, ctx) => {
    const body = await req.json();
    return res(
      ctx.json(
        { id: Math.random(), User: { id: 'zerohch0', nickname: '조현영', image: '/5Udwvqim.jpg' }, content: body.content, Images: [{ link: '/5Udwvqim.jpg' }] },
      )
    )
  }),

  rest.delete('/api/posts/:id/heart', async (req, res, ctx) => {
    const body = await req.json();
    return res(
      ctx.json(
        { id: Math.random(), User: { id: 'zerohch0', nickname: '조현영', image: '/5Udwvqim.jpg' }, content: body.content, Images: [{ link: '/5Udwvqim.jpg' }] },
      )
    )
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

