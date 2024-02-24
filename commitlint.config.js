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

/**
 * 特别注意提交信息的格式，不符合规范的提交信息将无法提交, 每种提交类型的冒号之后必须要有英文的空格(fix: )，例如：
 * git commit -m "chore: Update build process"
 */
