// src/data.js

export const locations = [
  {
    id: 1,

    slug: "boat",

    type: "matterport",

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

    type: "matterport",

    name: "Vườn hoa",

    x: "43.9%",

    y: "39%",

    url: "https://mpembed.com/show/?m=3sqakaY2UWT&mpu=826",

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

    type: "matterport",

    name: "Tượng đài",

    x: "44%",

    y: "60.4%",

    url: "https://my.matterport.com/show/?m=EZK6zFRUefb",

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

  /* PANORAMA 360 */

  {
    id: 4,

    slug: "lake",

    type: "panorama",

    name: "Hồ Trung Tâm",

    x: "74%",

    y: "42.5%",

    image: "https://pannellum.org/images/alma.jpg",

    description: "Panorama 360 khu hồ trung tâm.",

    audio: "/audio/lake.mp3",

    nearby: [
      {
        name: "Bến thuyền",

        direction: "← Đi bên trái khoảng 80m",

        pitch: 10,

        yaw: 120,

        audio: "/audio/boat-guide.mp3",
      },

      {
        name: "Vườn hoa",

        direction: "↑ Đi thẳng khoảng 150m",

        pitch: -2,

        yaw: 220,

        audio: "/audio/flower-guide.mp3",
      },
    ],
  },
];
