"use strict";
const core = require("@actions/core");
const axios = require("axios");

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
