/*
 * Scrape that ish
 */

chrome.runtime.onMessage.addListener(
  async function(args, sender, sendResponse) {
    if (args.type == 'scrape') processScrape(args.scrape);
});
  
function processScrape(args) {
  const {showFollowers, showFollowings, delay} = args;
  const username = window.location.href.split('/')[3];

  let followers = [{ username: "", full_name: "" }];
  let followings = [{ username: "", full_name: "" }];
  
  followers = [];
  followings = [];
  
  (async () => {
    try {
      const userQueryRes = await fetch(
        `https://www.instagram.com/web/search/topsearch/?query=${username}`
      );
  
      const userQueryJson = await userQueryRes.json();
  
      const userId = userQueryJson.users.map(u => u.user)
                                        .filter(
                                          u => u.username === username
                                          )[0].pk;
  
      let after = null;
      let has_next = true;
  
      if (showFollowers) {
        while (has_next) {
          await new Promise(resolve => setTimeout(resolve, delay));
          await fetch(
            `https://www.instagram.com/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables=` +
              encodeURIComponent(
                JSON.stringify({
                  id: userId,
                  include_reel: true,
                  fetch_mutual: true,
                  first: 50,
                  after: after,
                })
              )
          )
            .then((res) => res.json())
            .then((res) => {
              has_next = res.data.user.edge_followed_by.page_info.has_next_page;
              after = res.data.user.edge_followed_by.page_info.end_cursor;
              followers = followers.concat(
                res.data.user.edge_followed_by.edges.map(({ node }) => {
                  return {
                    username: node.username,
                    full_name: node.full_name,
                  };
                })
              );
            });
        }
      }

      after = null;
      has_next = true;
  
      if (showFollowings) {
        while (has_next) {
          await new Promise(resolve => setTimeout(resolve, delay));
          await fetch(
            `https://www.instagram.com/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables=` +
              encodeURIComponent(
                JSON.stringify({
                  id: userId,
                  include_reel: true,
                  fetch_mutual: true,
                  first: 50,
                  after: after,
                })
              )
          )
            .then((res) => res.json())
            .then((res) => {
              has_next = res.data.user.edge_follow.page_info.has_next_page;
              after = res.data.user.edge_follow.page_info.end_cursor;
              followings = followings.concat(
                res.data.user.edge_follow.edges.map(({ node }) => {
                  return {
                    username: node.username,
                    full_name: node.full_name,
                  };
                })
              );
            });
        }
      }
  
      const finalOutput = {
        account: username,
        timestamp: Date.now(),
        followingCount: followings.length,
        followersCount: followers.length,
        followers: followers,
        following: followings,
      }
      const output = JSON.stringify(finalOutput, undefined, 2);
      chrome.runtime.sendMessage({type: 'output', output});
  
    } catch (err) {
      console.log({ err });
    }
  })();
}