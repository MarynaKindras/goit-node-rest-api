import Jimp from "jimp";

export const resizeAvatar = async (oldPath, newPath) => {
  const img = await Jimp.read(oldPath);
  return img.resize(250, 250).write(newPath);
};
