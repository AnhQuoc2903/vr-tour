// src/data.js

export const locations = [
  {
    id: 1,

    slug: "boat",

    name: "Bến thuyền",

    x: "51.4%",
    y: "11.8%",

    url: "https://my.matterport.com/show/?m=SxQL3iGyoDo",

    description: "Khu chèo thuyền đạp vịt nổi bật tại Thung lũng Tình Yêu.",

    audio: "/audio/boat.mp3",

    nearby: [
      {
        name: "Vườn hoa",

        direction: "← Di chuyển bên trái khoảng 100m",

        audio: "/audio/flower-guide.mp3",
      },

      {
        name: "Tượng đài",

        direction: "↑ Đi thẳng khoảng 200m",

        audio: "/audio/statue-guide.mp3",
      },
    ],
  },

  {
    id: 2,

    slug: "flower",

    name: "Vườn hoa",

    x: "43.9%",
    y: "39%",

    url: "https://my.matterport.com/show/?m=xxxxx",

    description: "Khu vực checkin hoa nổi bật.",

    audio: "/audio/flower.mp3",

    nearby: [
      {
        name: "Bến thuyền",

        direction: "→ Đi bên phải khoảng 100m",

        audio: "/audio/boat-guide.mp3",
      },
    ],
  },

  {
    id: 3,

    slug: "statue",

    name: "Tượng đài",

    x: "44%",
    y: "60.4%",

    url: "https://my.matterport.com/show/?m=yyyyy",

    description: "Khu tượng đài trung tâm.",

    audio: "/audio/statue.mp3",

    nearby: [
      {
        name: "Bến thuyền",

        direction: "↓ Đi xuống khoảng 150m",

        audio: "/audio/boat-guide.mp3",
      },
    ],
  },
];
