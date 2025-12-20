// oneko.js: https://github.com/adryd325/oneko.js (webring variant)

var nekoEl = document.createElement("div");

function neko() {
  var header = document.getElementById("header")

  var scroll = window.scrollY;
  var headerPos = header.getBoundingClientRect()
  var nekoPosX = headerPos.right + 18;
  var nekoPosY = headerPos.bottom - 28 + scroll;

  var mousePosX = 0;
  var mousePosY = 0;

  var sleeping = true;
  var idleAnimation = "sleeping";
  var idleAnimationFrame = 0;
  var justAwake = false;

  // please use data-neko="true" on your A elements that link to another site with oneko-webring.js instead of this
  var nekoSites = [
    "localhost",
  ];

  try {
    var searchParams = location.search
      .replace("?", "")
      .split("&")
      .map(function (keyvaluepair) { return keyvaluepair.split("=") });
    // This is so much repeated code, I don't like it
    tmp = searchParams.find(function (a) { return a[0] == "catx" });
    if (tmp && tmp[1]) nekoPosX = parseInt(tmp[1]);
    tmp = searchParams.find(function (a) { return a[0] == "caty" });
    if (tmp && tmp[1]) nekoPosY = parseInt(tmp[1]);
    tmp = searchParams.find(function (a) { return a[0] == "catdx" });
    if (tmp && tmp[1]) mousePosX = parseInt(tmp[1]);
    tmp = searchParams.find(function (a) { return a[0] == "catdy" });
    if (tmp && tmp[1]) mousePosY = parseInt(tmp[1]);
    if (tmp && tmp[1]) sleeping = false;
  } catch (e) {
    console.error("oneko.js: failed to parse query params.");
    console.error(e);
  }

  function onClick(event) {
    var target;
    if (event.target.tagName === "A" && event.target.getAttribute("href")) {
      target = event.target;
    } else if (
      event.target.tagName == "IMG" &&
      event.target.parentElement.tagName === "A" &&
      event.target.parentElement.getAttribute("href")
    ) {
      target = event.target.parentElement;
    } else {
      return;
    }
    var newLocation;
    try {
      newLocation = new URL(target.href);
    } catch (e) {
      return;
    }
    if (
      (nekoSites.includes(newLocation.host) && newLocation.pathname == "/") ||
      target.dataset.neko
    ) {
      newLocation.searchParams.append("catx", Math.floor(nekoPosX));
      newLocation.searchParams.append("caty", Math.floor(nekoPosY - scroll));
      newLocation.searchParams.append("catdx", Math.floor(mousePosX));
      newLocation.searchParams.append("catdy", Math.floor(mousePosY));
      event.preventDefault();
      window.location.href = newLocation.toString();
    }
  }
  document.addEventListener("click", onClick);

  function onScroll(event) {
    scroll = window.scrollY;
  }
  document.addEventListener("scroll", onScroll);

  function onResize() {
    if (sleeping) {
      headerPos = header.getBoundingClientRect()
      nekoPosX = headerPos.right + 18;
      nekoPosY = headerPos.bottom - 28 + scroll;
      nekoEl.style.left = nekoPosX - 16 + "px";
      nekoEl.style.top = nekoPosY - 16 + "px";
    }
  }
  window.addEventListener("resize", onResize);
  setTimeout(function () { onResize() }, 500)

  var resizeObserver = new ResizeObserver(function (entries) {
    onResize()
  });

  resizeObserver.observe(header);

  var frameCount = 0;
  var idvarime = 0;

  var nekoSpeed = 10;
  var spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    scratchWallN: [
      [0, 0],
      [0, -1],
    ],
    scratchWallS: [
      [-7, -1],
      [-6, -2],
    ],
    scratchWallE: [
      [-2, -2],
      [-2, -3],
    ],
    scratchWallW: [
      [-4, 0],
      [-4, -1],
    ],
    tired: [[-3, -2]],
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    N: [
      [-1, -2],
      [-1, -3],
    ],
    NE: [
      [0, -2],
      [0, -3],
    ],
    E: [
      [-3, 0],
      [-3, -1],
    ],
    SE: [
      [-5, -1],
      [-5, -2],
    ],
    S: [
      [-6, -3],
      [-7, -2],
    ],
    SW: [
      [-5, -3],
      [-6, -1],
    ],
    W: [
      [-4, -2],
      [-4, -3],
    ],
    NW: [
      [-1, 0],
      [-1, -1],
    ]
  }

  function init() {
    nekoEl.id = "oneko";
    nekoEl.ariaHidden = true;
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "absolute";
    nekoEl.style.backgroundImage = "url('/static/neko/neko.gif')";
    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = nekoPosX - 16 + "px";
    nekoEl.style.top = nekoPosY - 16 + "px";
    nekoEl.style.zIndex = Number.MAX_VALUE;
    if (sleeping) {
      nekoEl.style.cursor = "pointer";
    } else {
      nekoEl.style.pointerEvents = "none";
      nekoEl.style.position = "fixed";
    }
    nekoEl.onclick = function () {
      sleeping = false;
      justAwake = true;
      idleAnimation = null;
      idvarime = 999;
      nekoPosY -= scroll
      nekoEl.style.left = nekoPosX - 16 + "px";
      nekoEl.style.top = nekoPosY - 16 + "px";
      nekoEl.style.pointerEvents = "none";
      nekoEl.style.cursor = "pointer";
      nekoEl.style.position = "fixed";
      resizeObserver.disconnect();
    }
    document.body.appendChild(nekoEl);

    document.addEventListener("mousemove", function (event) {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    });

    window.requestAnimationFrame(onAnimatonFrame);
  }

  var lastFrameTimestamp;

  function onAnimatonFrame(timestamp) {
    if (!lastFrameTimestamp) {
      lastFrameTimestamp = timestamp;
    }
    if (timestamp - lastFrameTimestamp > 100) {
      lastFrameTimestamp = timestamp;
      frame();
    }

    window.requestAnimationFrame(onAnimatonFrame);
  }

  function setSprite(name, frame) {
    var sprite = spriteSets[name][frame % spriteSets[name].length];
    nekoEl.style.backgroundPosition = (sprite[0] * 32 + "px ") + (sprite[1] * 32) + "px";
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;

  }

  function idle() {
    idvarime += 1;

    // every ~ 20 seconds
    if (
      idvarime > 10 &&
      Math.floor(Math.random() * 200) == 0 &&
      idleAnimation == null
    ) {
      var avalibleIdleAnimations = ["sleeping", "scratchSelf"];
      if (nekoPosX < 32) {
        avalibleIdleAnimations.push("scratchWallW");
      }
      if (nekoPosY < 32) {
        avalibleIdleAnimations.push("scratchWallN");
      }
      if (nekoPosX > window.innerWidth - 32) {
        avalibleIdleAnimations.push("scratchWallE");
      }
      if (nekoPosY > window.innerHeight - 32) {
        avalibleIdleAnimations.push("scratchWallS");
      }
      idleAnimation =
        avalibleIdleAnimations[
        Math.floor(Math.random() * avalibleIdleAnimations.length)
        ];
    }

    switch (idleAnimation) {
      case "sleeping":
        if (idleAnimationFrame < 8 && !sleeping) {
          setSprite("tired", 0);
          break;
        }
        setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
        if (idleAnimationFrame > 192 && !sleeping) {
          resetIdleAnimation();
        }
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        setSprite(idleAnimation, idleAnimationFrame);
        if (idleAnimationFrame > 9) {
          resetIdleAnimation();
        }
        break;
      default:
        setSprite("idle", 0);
        return;
    }
    idleAnimationFrame += 1;
  }

  function frame() {
    frameCount += 1;
    var diffX = nekoPosX - mousePosX;
    var diffY = nekoPosY - mousePosY;
    var distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));

    if (!justAwake && (distance < nekoSpeed || distance < 48 || sleeping)) {
      idle();
      return;
    }

    idleAnimation = null;
    idleAnimationFrame = 0;

    if (idvarime > 1) {
      setSprite("alert", 0);
      // count down after being alerted before moving
      idvarime = Math.min(idvarime, 7);
      idvarime -= 1;
      return;
    }

    justAwake = false;

    var direction;
    direction = diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";
    setSprite(direction, frameCount);

    nekoPosX -= (diffX / distance) * nekoSpeed;
    nekoPosY -= (diffY / distance) * nekoSpeed;

    nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
    nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

    nekoEl.style.left = nekoPosX - 16 + "px";
    nekoEl.style.top = nekoPosY - 16 + "px";
  }

  init();
};

try {
  neko()
} catch (e) {
  try {
    document.body.removeChild(nekoEl);
  } catch (e) {

  }
  var script = document.createElement("script");
  script.src = "/static/neko/neko-compat.js";
  document.body.appendChild(script)
}