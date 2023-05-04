"use strict";
const core = require("@actions/core");

/**
 * @param{string} serverURL
 * @param{string} repoName
 * @param{string} rexToken
 * @param{() => void} resultFunc
 *
 */
function getBuildOutput(serverURL, repoName, rexToken, resultFunc) {
  fetch(`${serverURL}/deploy/?name=${repoName}`, {
    method: "GET",
    headers: {
      Authorization: rexToken,
    },
  })
    .then((resp) => resp.text())
    .then((text) => {
      resultFunc(text);
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
      core.setOutput("status", result);
    } else {
      core.setFailed("Build faild!");
    }
  });
} catch (err) {
  core.setFailed(err.message);
}
