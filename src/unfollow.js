// @ts-nocheck
const GitHub = require("./github");

const gitHub = new GitHub(process.argv[2]);
const whiteList = process.argv.slice(3);

async function unfollow() {
  let currentPage = 1;
  let followed;

  do {
    followed = await gitHub.followedUsers(currentPage);
    currentPage++;

    for (const user of followed) {
      const targetUser = user.login;
      if (!whiteList.includes(targetUser)) {
        const followsBack = await gitHub.checkFollowBack(targetUser);
        if (!followsBack) {
          await gitHub.unfollowUser(targetUser);
        }
      }
    }
  } while (followed.length > 0);
}

unfollow().then(() => console.log("Unfollow script completed."));
