const getImageName = (url) => {
  const arrayOfUrl = url.split("/");
  const imageName = arrayOfUrl[arrayOfUrl.length - 1].split(".")[0];
  return imageName;
};

export default getImageName;
