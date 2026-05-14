// src/data.js

export const locations = [
  {
    id: 1,

    slug: "boat",

    type: "panorama",

    name: "Bến thuyền",

    x: "51.4%",

    y: "11.8%",

    showOnMap: true,

    image: "/360/1.jpg",

    bgAudio: "/audio/boat.mp3",
    voiceAudio: "/audio/1.mp3",
    description: "Khu vực checkin nổi bật.",

    nearby: [
      {
        name: "Tượng đài",

        pitch: 3,

        yaw: 146,

        preview: "/preview/lake.jpg",
        direction: "Đi thẳng 500m ",
      },

      {
        name: "Vườn hoa",

        pitch: -10,

        yaw: 273,

        preview: "/preview/sphere.jpg",
        direction: "Cách khoảng 500m bên phải",
      },
      {
        name: "Hồ Trung Tâm",

        pitch: -5,

        yaw: -281.5,

        preview: "/preview/sphere.jpg",
        direction: "Cách khoảng 500m bên trái",
      },
    ],
  },

  {
    id: 2,

    slug: "flower",

    type: "panorama",

    name: "Vườn hoa",

    showOnMap: true,

    x: "43.9%",

    y: "39%",

    image: "/360/2.jpg",

    description: "Khu vực checkin hoa nổi bật.",

    bgAudio: "/audio/flower.mp3",
    voiceAudio: "/audio/3.mp3",

    nearby: [
      {
        name: "Tượng đài",

        pitch: 3,

        yaw: 66,

        preview: "/preview/lake.jpg",
        direction: "Đi thẳng 500m ",
      },

      {
        name: "Bến thuyền",

        pitch: 5,

        yaw: 305,

        preview: "/preview/sphere.jpg",
        direction: "Cách khoảng 500m bên phải",
      },
    ],
  },

  {
    id: 3,

    slug: "statue",

    type: "panorama",

    name: "Tượng đài",

    showOnMap: true,

    x: "44%",

    y: "60.4%",

    image: "/360/3.jpg",

    description: "Khu tượng đài trung tâm.",

    bgAudio: "/audio/statue.mp3",

    nearby: [
      {
        name: "Bến thuyền",

        pitch: 5,

        yaw: 165,

        preview: "/preview/lake.jpg",
        direction: "Đi thẳng 500m ",
      },

      {
        name: "Vườn hoa",

        pitch: 5,

        yaw: 340,

        preview: "/preview/sphere.jpg",
        direction: "Đi thẳng 1Km",
      },
    ],
  },

  /* PANORAMA 360 */

  {
    id: 4,

    slug: "lake",

    type: "panorama",

    name: "Hồ Trung Tâm",

    showOnMap: true,

    x: "74%",

    y: "42.5%",

    image: "https://pannellum.org/images/alma.jpg",

    description: "Panorama 360 khu hồ trung tâm.",

    bgAudio: "/audio/boat-guide.mp3",

    nearby: [
      {
        name: "Bến thuyền",

        pitch: 10,

        yaw: 120,

        preview: "/preview/lake.jpg",

        audio: "/audio/boat-guide.mp3",
        direction: "Đi thẳng 500m ",
      },

      {
        name: "Vườn hoa",

        pitch: -2,

        yaw: 250,

        preview: "/preview/sphere.jpg",

        audio: "/audio/flower-guide.mp3",
        direction: "Đi thẳng 500m ",
      },
    ],
  },
];
