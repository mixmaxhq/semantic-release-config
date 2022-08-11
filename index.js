module.exports = {
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: require('./config/conventionalcommits-release-rules.js'),
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
      },
    ],
    '@semantic-release/github',
    '@semantic-release/npm',
    '@semantic-release/changelog',
    '@semantic-release/git',
  ],
  verifyRelease: ['@mixmaxhq/semantic-commitlint'],
  branches: [
    '+([0-9])?(.{+([0-9]),x}).x',
    '(master|main)',
    {
      name: 'beta',
      prerelease: true,
    },
    {
      name: 'alpha',
      prerelease: true,
    },
  ],
};
