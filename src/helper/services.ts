export const getVideo = (): string => {
  // List of video IDs
  const videoIds = [
    "8yxoyJuD4Ng",
    "dQw4w9WgXcQ",
    "3JZ_D3ELwOQ",
    "L_jWHffIx5E",
    "eVTXPUF4Oz4",
    "kXYiU_JCYtU",
    "hTWKbfoikeg",
    "fJ9rUzIMcZQ",
    "YQHsXMglC9A",
    "RgKAFK5djSk",
    "CevxZvSJLk8",
    "OPf0YbXqDm0",
    "2Vv-BfVoq4g",
    "JGwWNGJdvx8",
    "kJQP7kiw5Fk",
    "6Dh-RL__uN4",
    "3tmd-ClpJxA",
    "9bZkp7q19f0",
    "60ItHLz5WEA",
    "hT_nvWreIhg",
    "ktvTqknDobU",
    "YykjpeuMNEk",
    "uelHwf8o7_U",
    "CevxZvSJLk8",
    "hLQl3WQQoQ0",
    "e-ORhEE9VVg",
    "2vjPBrBU-TM",
    "kXYiU_JCYtU",
    "hTWKbfoikeg",
    "fJ9rUzIMcZQ",
    "YQHsXMglC9A",
    "RgKAFK5djSk",
    "CevxZvSJLk8",
    "OPf0YbXqDm0",
    "2Vv-BfVoq4g",
    "JGwWNGJdvx8",
    "kJQP7kiw5Fk",
    "6Dh-RL__uN4",
    "3tmd-ClpJxA",
    "9bZkp7q19f0",
  ];

  // Get a random video ID from the list
  const randomIndex = Math.floor(Math.random() * videoIds.length);
  return videoIds[randomIndex];
};
