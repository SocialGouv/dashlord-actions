const jsdom = require("jsdom");
const { fuzzy } = require("fast-fuzzy");

const { JSDOM } = jsdom;

const mandatoryAccessibilityRate = [
  {
    needle: "Accessibilité : non conforme",
  },
  {
    needle: "Accessibilité : partiellement conforme",
  },
  {
    needle: "Accessibilité : totalement conforme",
  },
];

const DATE_PATTERNS = [
  // European formats: 15/04/2023, 15-04-2023, 15.04.2023
  /\b(\d{2}[\/\-\.]\d{2}[\/\-\.]\d{4})\b/g,
  // Month-year european formats: 04/2023, 04-2023, 04.2023
  /\b(\d{2}[\/\-\.]\d{4})\b/g,
  // Literal French format: 15 avril 2023, 15 avr. 2023
  /\b(\d{1,2}\s+(?:janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre|janv?\.?|févr?\.?|avr?\.?|juil?\.?|sept?\.?|oct?\.?|nov?\.?|déc?\.?)\s+\d{4})\b/gi,
]

const FR_MONTHS = {
  janvier: 0, janv: 0,
  février: 1, févr: 1,
  mars: 2,
  avril: 3, avr: 3,
  mai: 4,
  juin: 5,
  juillet: 6, juil: 6,
  août: 7, aout: 7,
  septembre: 8, sept: 8,
  octobre: 9, oct: 9,
  novembre: 10, nov: 10,
  décembre: 11, déc: 11
}

function frenchMonthMapper(monthString) {
  return FR_MONTHS[monthString.toLowerCase().replace('.', '')]
}

function parseDate(dateString) {
  dateString = dateString.trim()

  let splitDate = dateString.split(/[.\/-]/)
  if (splitDate.length === 3) {
    return new Date(splitDate[2], splitDate[1] - 1, splitDate[0]);
  } else if (splitDate.length === 2) {
    return new Date(splitDate[1], splitDate[0] - 1);
  }

  splitDate = dateString.split(" ")
  if (splitDate.length === 3) {
    return new Date(splitDate[2], frenchMonthMapper(splitDate[1]), splitDate[0]);
  } else if (splitDate.length === 2) {
    return new Date(splitDate[1], frenchMonthMapper(splitDate[0]));
  }
}

function findMostRecentDate(html) {
  console.log("###### INSIDE FIND MOST RECENT DATE")
  const candidates = new Set();
  for (const pattern of DATE_PATTERNS) {
    for (const match of html.matchAll(pattern)) {
      candidates.add(match[1] || match[0]);
    }
  }

  console.log("###### CANDIDATES : ", candidates)

  const validDates = [];
  for (const candidate of candidates) {
    const date = parseDate(candidate);
    if (date && date <+ new Date()) {
      validDates.push({ raw: candidate, date});
    }
  }

  if (validDates.length === 0) return ({ found: false });

  validDates.sort((a, b) => b.date - a.date);
  const mostRecent = validDates[0];
  const threeYearsAgo = new Date()
  threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
  const isLessThan3Years = mostRecent.date >= threeYearsAgo;

  // TODO: For test purposes, remove useless data
  return ({
    found: true,
    mostRecentDate: mostRecent.date,
    rawString: mostRecent.raw,
    isLessThan3Years,
    allDatesFound: validDates
  })
}

const analyseDom = async (dom, { url = "" } = {}) => {
  const text = dom.window.document.body.textContent;
  // fuzzy find the best match
  const status = mandatoryAccessibilityRate
    .map(({ needle }) => ({ needle, score: fuzzy(needle, text) }))
    .sort((a, b) => a.score - b.score)
    .reverse();
  // ensure were confident enough
  const result = { mention: null };
  const bestStatus = status[0];
  if (bestStatus.score > 0.9) {
    result.mention = bestStatus.needle;
    // try to find related href if any
    Array.from(dom.window.document.querySelectorAll("a")).filter((a) => {
      if (fuzzy(bestStatus.needle, a.text) > 0.9) {
        // make URL absolute when possible
        const link = a.getAttribute("href");
        if (link && link !== "#") {
          if (link.match(/^https?:\/\//)) {
            result.declarationUrl = link;
          } else if (link.charAt(0) === "/") {
            const host = url.replace(/(https?:\/\/[^/]+).*/, "$1");
            result.declarationUrl = `${host}${link}`;
          } else {
            result.declarationUrl = `${url}/${link}`;
          }
        } else {
          result.declarationUrl = null;
        }
      }
    });
    // loose href search
    if (!result.declarationUrl) {
      Array.from(dom.window.document.querySelectorAll("a")).filter((a) => {
        if (fuzzy("Accessibilité", a.text) > 0.9) {
          // make URL absolute when possible
          const link = a.getAttribute("href");
          if (link && link !== "#") {
            const declarationUrl =
              link.charAt(0) === "/" ? `${url || ""}${link}` : link;
            result.declarationUrl = declarationUrl;
          } else {
            // no href
            result.declarationUrl = null;
          }
        }
      });
    }

    if (result.declarationUrl) {
      console.log("##### DECLARATION URL INSIDE IF : ", result.declarationUrl);

      const resourceLoader = new jsdom.ResourceLoader({
        strictSSL: false,
        userAgent:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:133.0) Gecko/20100101 Firefox/133.0 - dashlord",
      });
      const declarationPageDom = await JSDOM.fromURL(result.declarationUrl, { resources: resourceLoader });
      const declarationPageText = declarationPageDom.window.document.body.textContent;

      const declarationDate = findMostRecentDate(declarationPageText);

      console.log("###### DECLARATION DATE FOUND : ", declarationDate)

      if (declarationDate.found) {
        result.declarationDateFound = true;
        result.declarationIsUpToDate = declarationDate.isLessThan3Years;
      } else {
        result.declarationDateFound = false;
      }
    }
  }
  return result;
};

const analyseFile = async (filePath, { url } = {}) => {
  const dom = await JSDOM.fromFile(filePath);
  return analyseDom(dom, { url });
};

// warn: this wont work for SPA applications
const analyseUrl = async (url) => {
  const resourceLoader = new jsdom.ResourceLoader({
    strictSSL: false,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:133.0) Gecko/20100101 Firefox/133.0 - dashlord",
  });
  const dom = await JSDOM.fromURL(url, { resources: resourceLoader });
  return analyseDom(dom, { url });
};

module.exports = { analyseFile, analyseUrl };

if (require.main === module) {
  const url = process.argv[process.argv.length - 2]; // url, to make absolute links
  const filePath = process.argv[process.argv.length - 1]; // file path to analyse
  analyseFile(filePath, { url })
    .then((result) => console.log(JSON.stringify(result)))
    .catch(() => console.log(JSON.stringify({ declaration: undefined })));
}
