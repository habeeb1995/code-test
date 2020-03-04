/* eslint no-use-before-define: 0 */

const githubRepoHandler = require('../controller/Repos');
const Helper = require('../helpers/Helper');

const sampleResponseFromGithub = {
  total_count: 301165,
  incomplete_results: false,
  items: [
    {
      id: 211666,
      node_id: 'MDEwOlJlcG9zaXRvcnkyMTE2NjY=',
      name: 'node-v0.x-archive',
      full_name: 'nodejs/node-v0.x-archive',
      private: false,
      owner: [Object],
      html_url: 'https://github.com/nodejs/node-v0.x-archive',
      description: 'Moved to https://github.com/nodejs/node',
      fork: false,
      url: 'https://api.github.com/repos/nodejs/node-v0.x-archive',
      forks_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/forks',
      keys_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/keys{/key_id}',
      collaborators_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/collaborators{/collaborator}',
      teams_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/teams',
      hooks_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/hooks',
      issue_events_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/issues/events{/number}',
      events_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/events',
      assignees_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/assignees{/user}',
      branches_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/branches{/branch}',
      tags_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/tags',
      blobs_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/git/blobs{/sha}',
      git_tags_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/git/tags{/sha}',
      git_refs_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/git/refs{/sha}',
      trees_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/git/trees{/sha}',
      statuses_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/statuses/{sha}',
      languages_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/languages',
      stargazers_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/stargazers',
      contributors_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/contributors',
      subscribers_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/subscribers',
      subscription_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/subscription',
      commits_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/commits{/sha}',
      git_commits_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/git/commits{/sha}',
      comments_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/comments{/number}',
      issue_comment_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/issues/comments{/number}',
      contents_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/contents/{+path}',
      compare_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/compare/{base}...{head}',
      merges_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/merges',
      archive_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/{archive_format}{/ref}',
      downloads_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/downloads',
      issues_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/issues{/number}',
      pulls_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/pulls{/number}',
      milestones_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/milestones{/number}',
      notifications_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/notifications{?since,all,participating}',
      labels_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/labels{/name}',
      releases_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/releases{/id}',
      deployments_url: 'https://api.github.com/repos/nodejs/node-v0.x-archive/deployments',
      created_at: '2009-05-27T16:29:46Z',
      updated_at: '2020-03-04T01:24:54Z',
      pushed_at: '2018-04-04T08:28:02Z',
      git_url: 'git://github.com/nodejs/node-v0.x-archive.git',
      ssh_url: 'git@github.com:nodejs/node-v0.x-archive.git',
      clone_url: 'https://github.com/nodejs/node-v0.x-archive.git',
      svn_url: 'https://github.com/nodejs/node-v0.x-archive',
      homepage: '',
      size: 144238,
      stargazers_count: 35256,
      watchers_count: 35256,
      language: null,
      has_issues: true,
      has_projects: true,
      has_downloads: false,
      has_wiki: true,
      has_pages: false,
      forks_count: 7714,
      mirror_url: null,
      archived: true,
      disabled: false,
      open_issues_count: 571,
      license: null,
      forks: 7714,
      open_issues: 571,
      watchers: 35256,
      default_branch: 'moved',
      score: 1
    }
  ]
};

describe('Fetch Github', () => {
  it('Should return list of repos', async () => {
    jest.spyOn(githubRepoHandler, 'getRepos').mockImplementation(
      async (req) => {
        const activePage = req.query.page ? req.query.page : 1;
        const res = { data: { ...sampleResponseFromGithub } };
        // Helper class to count for pagination
        const pageList = Helper.getPageList(100, activePage, 10);
        return { data: res.data, page_list: pageList, active_page: activePage };
      }
    );
    const successResponse = await githubRepoHandler.getRepos({ query: {} });
    expect(successResponse).toMatchObject({
      data: sampleResponseFromGithub,
      page_list: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        0,
        99,
        100
      ],
      active_page: 1
    });
  });
});
