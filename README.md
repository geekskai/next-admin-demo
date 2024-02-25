# 2024年最新的从0～1搭建一个完整而健全的Next.ts项目的架构

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### feature

⚡ Next.js with App Router support

🔥 Type checking TypeScript

💎 Integrate with Tailwind CSS

✅ Strict Mode for TypeScript and React 18

📏 Linter with ESLint (default NextJS, NextJS Core Web Vitals, Tailwind CSS and Airbnb configuration)

💖 Code Formatter with Prettier

🦊 Husky for Git Hooks

🚫 Lint-staged for running linters on Git staged files

🚓 Lint git commit with Commitlint

📓 Write standard compliant commit messages with Commitizen

🎁 Automatic changelog generation with Semantic Release

🗂 VSCode configuration: Debug, Settings, Tasks and Extensions

🦺 Unit Testing with Jest and React Testing Library

🧪 Integration and E2E Testing with Playwright

🌐 Multi-language (i18n) with next-intl and Crowdin

☂️ Code coverage with Codecov

### 代码规范

#### 代码检查工具 ESLint

使用 create-next-app 创建的 Next.js 项目已经配置好了 ESLint，只需要按照项目需要修改对应配置即可。这里我们加上 prettier 的配置，让 ESLint 和 Prettier 能够更和谐的一起工作。参照[文档](https://prettier.io/docs/en/install#eslint-and-other-linters)

1. eslint-plugin-prettier: 这是一个 ESLint 插件，将 Prettier 作为 ESLint 规则运行。这意味着你可以使用 ESLint 运行 Prettier 的格式化功能。当代码不符合 Prettier 的格式化规则时，eslint-plugin-prettier 会报告格式化错误。这样做的好处是可以在一个命令中同时运行 ESLint 的代码质量检查和 Prettier 的代码格式化，简化了开发流程。
2. eslint-config-prettier: 这是一个 ESLint 配置，用于关闭所有不必要的或可能与 Prettier 冲突的 ESLint 规则。当同时使用 ESLint 和 Prettier 时，一些 ESLint 规则可能与 Prettier 的格式化规则冲突，导致不一致的代码风格。通过使用 eslint-config-prettier，可以确保 ESLint 的规则不会干扰 Prettier 的代码格式化，从而保持代码风格的一致性。

```bash
pnpm add --save-dev eslint-plugin-prettier eslint-config-prettier
```

`.eslintrc.json`

```json
{
  "extends": ["next/core-web-vitals", "plugin:prettier/recommended"],
  "plugins": [
    "prettier" // 确保"prettier"插件已被添加
  ],
  "rules": {
    // 可以在这里覆盖特定的规则设置
    "prettier/prettier": "error" // 或者使用"warn"，这样Prettier的错误将以警告的形式展示
  }
}
```

"extends": ["plugin:prettier/recommended"]做了三件事：

1. 启用 `eslint-plugin-prettier`：这实际上将 `Prettier` 作为 `ESLint` 规则运行。这意味着任何 `Prettier` 发现的格式问题都会作为 `ESLint` 问题报告出来。
2. 添加 `prettier` 到 `ESLint` 的配置中：这确保了 `Prettier` 的规则优先级最高，有助于解决其他 `ESLint` 规则可能与 `Prettier` 冲突的问题。
3. 禁用与 `Prettier` 冲突的 `ESLint` 规则：通过内部使用 `eslint-config-prettier`，它自动关闭所有不必要的或可能与 `Prettier` 冲突的 `ESLint` 规则。

#### 代码风格工具 Prettier

```bash
pnpm add -D prettier prettier-plugin-organize-imports prettier-plugin-tailwindcss

```

我们使用了 `Tailwind CSS` 推荐额外安装 `prettier-plugin-tailwindcss`，可以帮忙自动排序 `className`。
并且我们额外安装可以帮助排序 `import` 的插件：`prettier-plugin-organize-imports`

接着在 `.prettierrc.json` 文件中配置如下：

```json
{
  "plugins": [
    "prettier-plugin-organize-imports",
    "prettier-plugin-tailwindcss"
  ],
  "tailwindFunctions": ["classNames"],
  "singleQuote": true,
  "trailingComma": "es5"
}
```

### 同步编辑器设置和扩展

在项目中加上 `.vscode` 文件夹，配置编辑器的扩展和自动校验和修复的设置，让其他同学接入项目也能快速上手和使用相同的配置、扩展。

`.vscode/extensions.json`

```json
{
  "recommendations": [
    // Linting / Formatting
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss"
  ]
}
```

`.vscode/settings.json`

```json
{
  // 默认情况下，对所有语言使用 Prettier 进行格式化
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  // 使用 Prettier 格式化 JavaScript，覆盖 VSCode 默认设置。
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // 使用 ESLint 进行代码校验。
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],

  // 启用文件嵌套。
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.patterns": {
    "*.ts": "$(capture).test.ts, $(capture).test.tsx",
    "*.tsx": "$(capture).test.ts, $(capture).test.tsx"
  }
}
```

### git规范

Git 有很多的 `hooks`, 让我们在不同的阶段,对代码进行不同的操作,控制提交到仓库的代码的规范性,和准确性, 以下只是几个常用的钩子

#### 提交的代码规范 Husky

安装husky

```bash
pnpm add --save-dev husky
```

初始化 `Husky`，通过`git`钩子函数`pre-commit`判断提交的代码是否符合规范

```bash
pnpm exec husky init
```

#### 提交的信息规范 commitlint

通过钩子函数`commit-msg`,判断 `commit` 信息是否符合规范

```bash
pnpm add -D @commitlint/config-conventional @commitlint/cli
```

可以在 `package.json` 内创建一个脚本：

```bash
npm pkg set scripts.commitlint="commitlint --edit"
echo "npm run commitlint \${1}" > .husky/commit-msg
```

或者使用下面这个方式也行：

```bash
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

在根目录下新建`commitlint.config.js`文件，写入如下代码：

```js
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [0],
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新功能 feature
        "fix", // 修复 bug
        "docs", // 更新文档注释
        "style", // 美观化代码，修改代码格式(非CSS样式修改,不影响代码运行的变动)
        "refactor", // 重构代码(既不增加新功能，也不是修复bug)
        "perf", // 修改提高性能的代码
        "test", // 增加测试用例
        "chore", // 构建过程或辅助工具的变动,修改构建流程,依赖管理
        "revert", // 回退代码
        "release", // 发布新版本
        "build", // 打包代码
      ],
    ],
  },
};
```

特别注意提交信息的格式，不符合规范的提交信息将无法提交, 每种提交类型(`chore: `)的冒号之后必须要有空格，例如：

```bash
git commit -m "chore: Update build process"
```

### lint-staged

使用 `husky` 和 `lin-staged` 可以在 `Git` 提交代码时对提交的部分进行 `ESLint` 的代码校验和 `prettier` 的格式化，避免有些新同事编辑器中没有装对应插件和开启自动修复。安装配置也十分简单。

```bash
pnpm add --save-dev lint-staged
```

config

```json
 "lint-staged": {
    "**/*.{js,jsx,ts,tsx,html,css,json}": ["pnpm prettier --write"]
  }

```

修改`.husky/pre-commit` 文件中的内容为：

```bash
npx lint-staged
```

`.lintstagedrc.js`的配置如下

```js
const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((file) => path.relative(process.cwd(), file))
    .join(" --file ")}`;

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand], // 这些格式的文件在提交时交给 ESLint 校验
  "**/*.{js,jsx,tsx,ts,less,md,json}": ["prettier --write"], // 这些格式的文件在提交时让 prettier 格式化
};
```

❌ 特别注意提交信息的格式，不符合规范的提交信息将无法提交, 每种提交类型的冒号之后必须要有英文的空格(`fix: `)，例如一个合格的提交：

✅ `git commit -m "chore: Update build process"`

### Release It! 🚀

```bash
pnpm install -D release-it @release-it/conventional-changelog

```

安装完成之后，将 `release` 的配置添加到 `package.json`的`scripts`中:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "release": "release-it"
  }
}
```

使用`@release-it/conventional-changelog`可根据提交信息获取建议的 bump,此外，它还可以生成常规的变更日志，并可以选择在此过程中更新 `CHANGELOG.md` 文件。

添加`.release-it.json`配置：

```json
{
  "hooks": {
    "after:bump": "echo 更新版本成功! 🚀"
  },
  "github": {
    "release": false,
    "releaseName": "Release ${version}",
    "releaseNotes": null,
    "autoGenerate": false,
    "preRelease": false,
    "draft": false,
    "tokenRef": "GITLAB_TOKEN",
    "assets": null,
    "host": null,
    "timeout": 0,
    "proxy": null,
    "skipChecks": false,
    "web": false,
    "comments": {
      "submit": false,
      "issue": ":rocket: _This issue has been resolved in v${version}. See [${releaseName}](${releaseUrl}) for release notes._",
      "pr": ":rocket: _This pull request is included in v${version}. See [${releaseName}](${releaseUrl}) for release notes._"
    }
  },
  "gitlab": {
    "release": false,
    "releaseName": "Release ${version}",
    "releaseNotes": null,
    "milestones": [],
    "tokenRef": "GITLAB_TOKEN",
    "tokenHeader": "Private-Token",
    "certificateAuthorityFile": null,
    "assets": null,
    "origin": null,
    "skipChecks": false
  },
  "git": {
    "changelog": "git log --pretty=format:\"* %s (%h)\" ${from}...${to}",
    "requireCleanWorkingDir": true,
    "requireBranch": false,
    "requireUpstream": true,
    "requireCommits": false,
    "requireCommitsFail": true,
    "commitsPath": "",
    "addUntrackedFiles": false,
    "commit": true,
    "commitMessage": "release: Release ${version}",
    "commitArgs": [],
    "tag": true,
    "tagExclude": null,
    "tagName": null,
    "tagMatch": null,
    "getLatestTagFromAllRefs": false,
    "tagAnnotation": "Release ${version}",
    "tagArgs": [],
    "push": true,
    "pushArgs": ["--follow-tags"],
    "pushRepo": ""
  },
  "npm": {
    "publish": false,
    "publishPath": ".",
    "publishArgs": [],
    "tag": null,
    "otp": null,
    "ignoreVersion": false,
    "allowSameVersion": false,
    "versionArgs": [],
    "skipChecks": false,
    "timeout": 10
  },
  "plugins": {
    "@release-it/conventional-changelog": {
      "infile": "CHANGELOG.md",
      "ignoreRecommendedBump": true,
      "strictSemVer": true,
      "preset": {
        "name": "conventionalcommits",
        "types": [
          {
            "type": "feat",
            "section": "✨添加新功能"
          },
          {
            "type": "fix",
            "section": "🐛修复bug"
          },
          {
            "type": "docs",
            "section": "📚更新文档"
          },
          {
            "type": "chore",
            "section": "🔧修改配置文件"
          },
          {
            "type": "style",
            "hidden": "true",
            "section": "🎨修改样式"
          },
          {
            "type": "test",
            "section": "✅测试代码",
            "hidden": true
          },
          {
            "type": "refactor",
            "section": "🔨重构代码"
          },
          {
            "type": "perf",
            "section": "⚡优化性能",
            "hidden": true
          },
          {
            "type": "release",
            "section": "📌发布版本",
            "hidden": true
          }
        ]
      }
    }
  }
}
```

💥 先提交本地所有更改过的代码之后，执行：

```bash
pnpm run release
```

## 添加测试

```bash
pnpm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom ts-node @types/jest jest-fail-on-console
```

通过运行以下命令生成基本的 Jest 配置文件：

```bash
pnpm create jest@latest
```

在`jest.config.ts`中：

```js
import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load `next.config.js` and `.env` files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/public/(.*)$": "<rootDir>/public/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  clearMocks: true,
  collectCoverage: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "!./src/**/_*.{js,jsx,ts,tsx}",
    "!./src/**/*.stories.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);

```

在`jest.setup.ts`中：

```js
import "@testing-library/jest-dom";

import failOnConsole from "jest-fail-on-console";

failOnConsole();
```
