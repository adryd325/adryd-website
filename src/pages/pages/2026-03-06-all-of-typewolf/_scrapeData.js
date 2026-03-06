import { parse as parseHtml } from "node-html-parser";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { Stream } from "stream";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROOT = "https://www.typewolf.com";
const ALL_FONTS_PAGE = "https://www.typewolf.com/all-fonts";
const SPECIMENS_ROOT = "https://www.typewolf.com/assets/img/specimens/";

const SPECIMENS_DOWNLOAD_PATH = path.resolve(
  __dirname,
  "../../../../public/pages/2026-03-06-all-of-typewolf/specimens",
);

const PAGE_DOWNLOAD_PATH = path.resolve(__dirname, "htmlcache");

async function getFontList() {
  console.log("Fetching: ", ALL_FONTS_PAGE);
  const response = await fetch(ALL_FONTS_PAGE);
  const text = await response.text();
  const document = parseHtml(text);

  const headings = document.getElementsByTagName("h2");
  const allFontsSection = headings.find(
    (el) => el.innerText === "All Fonts Ordered Alphabetically",
  ).parentNode;

  const allLinks = allFontsSection?.getElementsByTagName("a");
  return allLinks.map((a) => {
    let id = a.getAttribute("href")?.slice(1);
    return {
      id,
      name: a.innerText.match(/^.+(?=&nbsp;\(\d+\)$)/m)[0],
      exampleCount: parseInt(a.innerText.match(/(?<=\()\d+(?=\)$)/m)[0]),
    };
  });
}

async function downloadSpecimen(font) {
  let filePath = path.join(SPECIMENS_DOWNLOAD_PATH, font.fileName);
  if (!fs.existsSync(filePath)) {
    console.log("Fetching: ", SPECIMENS_ROOT + font.fileName);
    const specimenResponse = await fetch(SPECIMENS_ROOT + font.fileName);
    Stream.Readable.fromWeb(specimenResponse.body).pipe(
      fs.createWriteStream(filePath),
    );
  }
}

async function getLinkType(descriptionSection) {
  const links = descriptionSection.getElementsByTagName("a");
  const getButton = links.find((el) => el.getAttribute("class") === "button");

  if (!getButton) return "no-link";
  const href = getButton.getAttribute("href");

  if (!href) return "no-link";
  if (href.startsWith("/assets")) {
    // console.log(href);
    return "local-dl";
  }
  if (href.startsWith("/go")) {
    return "referral";
    try {
      console.log("Fetching: ", ROOT + href);
      const redirReq = await fetch(ROOT + href);
      let url = redirReq.url;
      if (url.startsWith("https://www.myfonts.com/")) return "myfonts";
      if (url.startsWith("https://fonts.adobe.com/")) return "adobe";
      if (url.startsWith("https://www.typography.com/"))
        return "typography.com";
      if (url.startsWith("https://creativemarket.com/"))
        return "creativemarket";
      if (url.startsWith("https://www.fontspring.com/")) return "fontspring";
    } catch (e) {
      return "no-link";
    }
  }
  return "bespoke-foundary";
}

async function getFontPageHtml(font) {
  let text;
  const filePath = path.join(PAGE_DOWNLOAD_PATH, font.id);
  if (fs.existsSync(filePath)) {
    text = fs.readFileSync(filePath, "utf-8");
  } else {
    console.log("Fetching: ", ROOT + "/" + font.id);
    const response = await fetch(ROOT + "/" + font.id);
    if (response.status === 404) {
      console.log(font.id, 404);
      return;
    }
    text = await response.text();
    fs.writeFileSync(filePath, text);
  }
  return parseHtml(text);
}

async function getExtraData(font) {
  const document = await getFontPageHtml(font);

  const headings = document.getElementsByTagName("h1");
  const descriptionSection = headings.find(
    (el) => el.getAttribute("class") === "section-title-fonts",
  ).parentNode;

  return {
    ...font,
    fileName: font.id + "-specimen.png",
    linkType: await getLinkType(descriptionSection),
  };
}

function sleep() {
  return new Promise((resolve) => setTimeout(() => resolve(), 250));
}

async function run() {
  const allFonts = await getFontList();
  let allFontsWithExtra = [];

  for (let font of allFonts) {
    let extra = await getExtraData(font);
    downloadSpecimen(extra);
    allFontsWithExtra.push(extra);
    
    // Let's not kill his website
    await sleep();
  }

  fs.writeFileSync(
    path.join(__dirname, "_data.json"),
    JSON.stringify(allFontsWithExtra, null, 2),
  );
}

run();
