This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

###

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

🦺 Unit Testing with Jest and React Testing Library
🧪 Integration and E2E Testing with Playwright

🌐 Multi-language (i18n) with next-intl and Crowdin

☂️ Code coverage with Codecov
🎁 Automatic changelog generation with Semantic Release
🗂 VSCode configuration: Debug, Settings, Tasks and Extensions

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

1. 启用 eslint-plugin-prettier：这实际上将 Prettier 作为 ESLint 规则运行。这意味着任何 Prettier 发现的格式问题都会作为 ESLint 问题报告出来。
2. 添加 prettier 到 ESLint 的配置中：这确保了 Prettier 的规则优先级最高，有助于解决其他 ESLint 规则可能与 Prettier 冲突的问题。
3. 禁用与 Prettier 冲突的 ESLint 规则：通过内部使用 eslint-config-prettier，它自动关闭所有不必要的或可能与 Prettier 冲突的 ESLint 规则。

#### 代码风格工具 Prettier

```bash
pnpm add -D prettier prettier-plugin-organize-imports prettier-plugin-tailwindcss

```

我们使用了 Tailwind CSS 推荐额外安装 prettier-plugin-tailwindcss，可以帮忙自动排序 className。
并且我们额外安装可以帮助排序 import 的插件：prettier-plugin-organize-imports

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

在项目中加上 .vscode 文件夹，配置编辑器的扩展和自动校验和修复的设置，让其他同学接入项目也能快速上手和使用相同的配置、扩展。

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

Git 有很多的 hooks, 让我们在不同的阶段,对代码进行不同的操作,控制提交到仓库的代码的规范性,和准确性, 以下只是几个常用的钩子

#### 提交的代码规范 husky

安装husky

```bash
pnpm add --save-dev husky
```

初始化Husky，通过git钩子函数pre-commit判断提交的代码是否符合规范

```bash
pnpm exec husky init
```

#### 提交的信息规范 commitlint

通过钩子函数commit-msg,判断 commit 信息是否符合规范

```bash
pnpm add -D @commitlint/config-conventional @commitlint/cli
```

可以在 package.json 内创建一个脚本：

```bash
npm pkg set scripts.commitlint="commitlint --edit"
echo "npm run commitlint \${1}" > .husky/commit-msg
```

或者使用下面这个方式也行：

```bash
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

在项目root目录下配置 commitlint 使用常规配置:

新创建`commitlint.config.js`文件，写入如下代码：

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [0],
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能 feature
        'fix', // 修复 bug
        'docs', // 更新文档注释
        'style', // 美观化代码，修改代码格式(非CSS样式修改,不影响代码运行的变动)
        'refactor', // 重构代码(既不增加新功能，也不是修复bug)
        'perf', // 修改提高性能的代码
        'test', // 增加测试用例
        'chore', // 构建过程或辅助工具的变动,修改构建流程,依赖管理
        'revert', // 回退代码
        'release', // 发布新版本
        'build', // 打包代码
      ],
    ],
  },
};
```

特别注意提交信息的格式，不符合规范的提交信息将无法提交, 每种提交类型(chore: )的冒号之后必须要有空格，例如：

```bash
git commit -m "chore: Update build process"
```

### lint-staged

使用 husky 和 lin-staged 可以在 Git 提交代码时对提交的部分进行 ESLint 的代码校验和 prettier 的格式化，避免有些新同事编辑器中没有装对应插件和开启自动修复。安装配置也十分简单。

```bash
pnpm add --save-dev lint-staged
```

config

```json
 "lint-staged": {
    "**/*.{js,jsx,ts,tsx,html,css,json}": ["pnpm prettier --write"]
  }

```

修改.husky/pre-commit 文件中的内容为：

```bash
npx lint-staged
```

`.lintstagedrc.js`的配置如下

```js
const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand], // 这些格式的文件在提交时交给 ESLint 校验
  '**/*.{js,jsx,tsx,ts,less,md,json}': ['prettier --write'], // 这些格式的文件在提交时让 prettier 格式化
};
```

// 在项目文档中插入表情

❌ 特别注意提交信息的格式，不符合规范的提交信息将无法提交, 每种提交类型的冒号之后必须要有英文的空格(fix: )，例如一个合格的提交：

✅ `git commit -m "chore: Update build process"`
