import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: "dgpbzgp04",
  api_key: "395256484813675",
  api_secret: "0sWZmR4E5zKzJ5zr0k1gri29Swg"
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

const uploadImage = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};

export default uploadImage;
