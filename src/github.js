// @ts-nocheck
const axios = require("axios");

class GitHub {
  constructor(token) {
    this.token = token;
    this.headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    };
  }

  async profile() {
    try {
      const url = "https://api.github.com/user";
      const response = await axios.get(url, { headers: this.headers });
      return response.data;
    } catch (error) {
      console.error(`Error fetching profile: ${error.message}`);
      return {};
    }
  }

  async followedUsers(currentPage = 1) {
    try {
      const url = `https://api.github.com/user/following?page=${currentPage}`;
      const response = await axios.get(url, { headers: this.headers });

      return response.data;
    } catch (error) {
      console.error(`Error fetching followed users: ${error.message}`);
      return [];
    }
  }

  async unfollowUser(target) {
    try {
      const url = `https://api.github.com/user/following/${target}`;
      await axios.delete(url, { headers: this.headers });
      console.log(`Unfollowed ${target}`);
    } catch (error) {
      console.error(`Error unfollowing ${target}: ${error.message}`);
    }
  }

  async checkFollowBack(target) {
    try {
      const source = await this.profile();

      const url = `https://api.github.com/users/${target}/following/${source.login}`;
      await axios.get(url, { headers: this.headers });
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = GitHub;
