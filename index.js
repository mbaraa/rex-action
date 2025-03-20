"use strict";
const core = require("@actions/core");
const axios = require("axios");

/**
 * @param{string} serverURL
 * @param{string} repoName
 * @param{string} commitSha
 * @param{string} latestTag
 * @param{string} composeFileName
 * @param{string} rexToken
 * @param{() => void} resultFunc
 *
 */
function getBuildOutput(
  serverURL,
  repoName,
  commitSha,
  latestTag,
  composeFileName,
  rexToken,
  resultFunc,
) {
  axios
    .get(
      `${serverURL}/deploy/?name=${repoName}&commit_sha=${commitSha}&latest_tag=${latestTag}&compose_file_name=${composeFileName}`,
      {
        headers: {
          Authorization: rexToken,
        },
      },
    )
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
  const commitSha = core.getInput("commit-sha");
  const repoName = core.getInput("repo-name");
  const latestTag = core.getInput("latest-tag");
  const composeFileName = core.getInput("compose-file-name");
  console.log(`Deploying ${repoName} using Rex`);

  getBuildOutput(
    serverURL,
    repoName,
    commitSha,
    latestTag,
    composeFileName,
    token,
    (result) => {
      if (result && result !== "error") {
        core.setOutput("Build succeeded");
        console.log(`Deploying ${repoName} was successful`);
        console.log("Build logs:");
        console.log(result);
      } else {
        core.setFailed("Build failed!");
      }
    },
  );
} catch (err) {
  core.setFailed(err.message);
}
