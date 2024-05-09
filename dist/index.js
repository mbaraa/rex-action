/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 116:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 611:
/***/ ((module) => {

module.exports = eval("require")("axios");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

const core = __nccwpck_require__(116);
const axios = __nccwpck_require__(611);

/**
 * @param{string} serverURL
 * @param{string} repoName
 * @param{string} rexToken
 * @param{() => void} resultFunc
 *
 */
function getBuildOutput(serverURL, repoName, rexToken, resultFunc) {
  axios
    .get(`${serverURL}/deploy/?name=${repoName}`, {
      headers: {
        Authorization: rexToken,
      },
    })
    .then((resp) => {
      resultFunc(resp.data);
    })
    .catch(() => {
      resultFunc("error");
    });
}

/**
 * @param{string} serverURL
 * @param{string} repoName
 * @param{string} rexToken
 * @param{() => void} resultFunc
 *
 */
function getBuildBadge(serverURL, repoName, rexToken, resultFunc) {}

try {
  const serverURL = core.getInput("server-url");
  const token = core.getInput("token");
  const repoName = core.getInput("repo-name");
  console.log(`Deploying ${repoName} using Rex`);

  getBuildOutput(serverURL, repoName, token, (result) => {
    if (result && result !== "error") {
      core.setOutput("Build succeeded");
      console.log(`Deploying ${repoName} was successful`);
      console.log("Build logs:");
      console.log(result);
    } else {
      core.setFailed("Build failed!");
    }
  });
} catch (err) {
  core.setFailed(err.message);
}

})();

module.exports = __webpack_exports__;
/******/ })()
;