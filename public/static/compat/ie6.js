function applyImgSize(imgElement) {
  var viewport = document.documentElement.clientWidth > 960 ? 928 : document.documentElement.clientWidth - 32
  if (!imgElement.width) {
    imgElement.width = "100%";
  }
  if (imgElement.width && !imgElement.originalWidth) {
    imgElement.originalWidth = imgElement.width;
  }
  if (imgElement.originalWidth > viewport) {
    imgElement.width = viewport;
  } else {
    imgElement.width = imgElement.originalWidth;
  }
  if (!imgElement.height) {
    imgElement.height = "auto";
  } else {
    imgElement.height = imgElement.height;
  }
}

function fixImageSize(imgElement) {
  if (imgElement.complete) {
    applyImgSize(imgElement)
  } else {
    // If not loaded, attach the function to the onload event
    imgElement.onload = function () {
      applyImgSize(imgElement)
    };
  }
}

// To apply this to all images, you could iterate through them:
window.onload = function () {
  var images = document.getElementsByTagName("img");
  for (var i = 0; i < images.length; i++) {
    fixImageSize(images[i]);
  }
};

window.onresize = function () {
  var images = document.getElementsByTagName("img");
  for (var i = 0; i < images.length; i++) {
    if (images[i].complete) {
      applyImgSize(images[i]);
    }
  }
};