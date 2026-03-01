function applyImgSize(imgElement) {
  var viewport =
    document.documentElement.clientWidth > 960
      ? 928
      : document.documentElement.clientWidth - 32;
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
    applyImgSize(imgElement);
  } else {
    imgElement.onload = function () {
      applyImgSize(imgElement);
    };
  }
}

function parseFallback(cl) {
  var start = cl.indexOf("ie-fallback=") + "ie-fallback=".length;
  var end = cl.substr(start).indexOf(" ");
  var src = cl.substr(start, end);
  if (end == -1) src = cl.substr(start);
  return src
}

window.onload = function () {
  var images = document.getElementsByTagName("img");
  for (var i = 0; i < images.length; i++) {
    fixImageSize(images[i]);
  }

  var svgs = document.getElementsByTagName("svg");
  for (var i = svgs.length - 1; i > -1; i--) {
    var cl = svgs[i].className;
    if (cl.match(/ie-fallback=/)) {
      var src = parseFallback(cl);
      svgs[i].outerHTML = '<img src="' + src + '">';
    } else {
      svgs[i].outerHTML =
        '<div style="color: red;">There is an SVG image here but your browser can\'t display it. Please harass me to add a fallback image</div>';
    }
  }

  var videos = document.getElementsByTagName("video");
  for (var i = videos.length - 1; i > -1; i--) {
    var cl = videos[i].className;
    if (cl.match(/ie-fallback=/)) {
      var href = parseFallback(cl);
      videos[i].outerHTML = '<a href="' + href + '">There would be a video here but your browser can\'t display it. Click here to download it.</a>';
    } else {
      videos[i].outerHTML =
        '<div style="color: red;">There would be a video here but your browser can\'t display it. Please harass me to add a fallback download</div>';
    }
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
