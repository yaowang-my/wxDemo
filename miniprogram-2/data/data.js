var postList = [{
    date: 'Jan 28 2021',
    postId: 1,
    title: '风景得描述',
    postImg: '/images/post/avatar-2.jpg',
    avatar: '/images/avatar/1.jpg',
    content: ['关于风景图片得描述1'],
    dianzanNum: '110',
    shoucangNum: '20',
    pinglunNum: '222',
    dateTime: '2021-3-5',
    detail: '风景1得detail',
    authorName: '貂蝉',
    upNum: 10,
    commentNum: 20,
    collectionNum: 30,
    collectionStatus: true,
    upStatus: true,
    readingNum: 0,
    music: {
      url: "https://ws.stream.qqmusic.qq.com/C400000P8dMF2jHCRB.m4a?guid=4300921140&vkey=9F2E232A2184E40575DC0239817DFC9886F749FE86E490790F4DE2B761933E2D6583CC55461FDBD4731A5F215DF748B9279CD29DE0F26EF1&uin=0&fromtag=66",
      title: "phut hon",
      coverImg: "",
    },
    comments: [{
      avatar: '/images/avatar/1.jpg',
      content: {
        audio: null,
        img: [],
        txt: '',
      },
      create_time: '2021-01-02',
      comment: '2021-01-02',
      username: '貂蝉'

    }]
  },
  {
    date: 'Jan 28 2021',
    postId: 2,
    title: '风景得描述2',
    postImg: '/images/post/avatar-3.jpg',
    avatar: '/images/avatar/1.jpg',
    content: ['关于风景图片得描述2'],
    dianzanNum: '10',
    shoucangNum: '20',
    pinglunNum: '32',
    dateTime: '2021-3-6',
    detail: '风景2得detail',
    authorName: '雷欧娜',
    upNum: 20,
    commentNum: 30,
    collectionNum: 40,
    collectionStatus: true,
    upStatus: false,
    readingNum: 0,
    music: {
      url: "https://ws.stream.qqmusic.qq.com/C400000P8dMF2jHCRB.m4a?guid=4300921140&vkey=9F2E232A2184E40575DC0239817DFC9886F749FE86E490790F4DE2B761933E2D6583CC55461FDBD4731A5F215DF748B9279CD29DE0F26EF1&uin=0&fromtag=66",
      title: "phut hon",
      coverImg: "",
    },
    comments: [{
        avatar: '/images/avatar/1.jpg',
        content: {
          audio: {},
          // imgage要用绝对路径
          img: ['/images/post/comment_1.jpeg',
            '/images/post/comment_2.jpg',
            '/images/post/comment_3.jpg'

          ],
          txt: '啦啦啦',
        },
        create_time: '2021-01-03',
        comment: '2021-01-03',
        username: '雷欧娜'

      },
      {
        avatar: '/images/avatar/1.jpg',
        content: {
          audio: {
            url: "http://123",
            timeLen: 8
          },
          img: [],
          txt: '',
        },
        create_time: '2021-01-03',
        comment: '2021-01-03',
        username: '雷欧娜'

      }
    ]
  },
  {
    date: 'Jan 28 2021',
    postId: 3,
    title: '风景得描述3',
    postImg: '/images/post/avatar-5.jpg',
    avatar: '/images/avatar/1.jpg',
    content: ['关于风景图片得描述3'],
    dianzanNum: '20',
    shoucangNum: '20',
    pinglunNum: '222',
    dateTime: '2021-3-7',
    detail: '风景3得detail',
    authorName: '杜甫',
    upNum: 40,
    commentNum: 50,
    collectionNum: 60,
    collectionStatus: false,
    upStatus: false,
    readingNum: 0,
    music: {
      url: "https://ws.stream.qqmusic.qq.com/C400000P8dMF2jHCRB.m4a?guid=4300921140&vkey=9F2E232A2184E40575DC0239817DFC9886F749FE86E490790F4DE2B761933E2D6583CC55461FDBD4731A5F215DF748B9279CD29DE0F26EF1&uin=0&fromtag=66",
      title: "phut hon",
      coverImg: "",
    },
    comments: [{
      avatar: '/images/avatar/1.jpg',
      content: {
        audio: null,
        img: [],
        txt: '',
      },
      create_time: '2021-01-04',
      comment: '2021-01-04',
      username: '杜甫'

    }]
  },
  {
    date: 'Jan 28 2021',
    postId: 4,
    title: '风景得描述4',
    postImg: '/images/post/avatar-6.jpg',
    avatar: '/images/avatar/1.jpg',
    content: ['关于风景图片得描述4'],
    dianzanNum: '10',
    shoucangNum: '20',
    pinglunNum: '30',
    dateTime: '2021-3-8',
    detail: '风景4得detail',
    authorName: '李白',
    upNum: 60,
    commentNum: 50,
    collectionNum: 40,
    collectionStatus: false,
    upStatus: false,
    readingNum: 0,
    music: {
      url: "https://ws.stream.qqmusic.qq.com/C400000P8dMF2jHCRB.m4a?guid=4300921140&vkey=9F2E232A2184E40575DC0239817DFC9886F749FE86E490790F4DE2B761933E2D6583CC55461FDBD4731A5F215DF748B9279CD29DE0F26EF1&uin=0&fromtag=66",
      title: "phut hon",
      coverImg: "",
    },
    comments: [{
      avatar: '/images/avatar/1.jpg',
      content: {
        audio: null,
        img: [],
        txt: '',
      },
      create_time: '2021-01-05',
      comment: '2021-01-05',
      username: '李白'

    }]
  }
]
//向外部暴漏
module.exports = {
  postList: postList
}