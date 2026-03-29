import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'AI 知识整理',
  description: '面向 AI 工具、工作流、策略与架构的个人知识库',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'AI工具集合', link: '/AI工具集合/' },
      { text: 'AI方法与策略', link: '/AI方法与策略/' },
      { text: 'OpenClaw技能', link: '/OpenClaw技能/' }
    ],

    sidebar: [
      {
        text: 'AI工具集合',
        items: [
          { text: '总览', link: '/AI工具集合/' },
          { text: 'MCP', link: '/AI工具集合/MCP/' },
          { text: 'Skills', link: '/AI工具集合/Skills/' },
          { text: 'Rules', link: '/AI工具集合/Rules/' },
          { text: '工作流与实践', link: '/AI工具集合/工作流与实践/' }
        ]
      },
      {
        text: 'AI方法与策略',
        items: [
          { text: '总览', link: '/AI方法与策略/' },
          { text: 'RAG', link: '/AI方法与策略/RAG/' },
          { text: 'Agent', link: '/AI方法与策略/Agent/' },
          { text: '提示词工程', link: '/AI方法与策略/提示词工程/' },
          { text: '评测与优化', link: '/AI方法与策略/评测与优化/' }
        ]
      },
      {
        text: 'OpenClaw技能',
        items: [
          { text: '总览', link: '/OpenClaw技能/' },
          { text: '前端开发常用技能', link: '/OpenClaw技能/前端开发常用技能/' },
          { text: '通用常用技能', link: '/OpenClaw技能/通用常用技能/' },
          { text: '进阶与谨慎使用', link: '/OpenClaw技能/进阶与谨慎使用/' },
          { text: '安装配置类', link: '/OpenClaw技能/安装配置类/' },
          { text: '安全类', link: '/OpenClaw技能/安全类/' },
          { text: '运维类', link: '/OpenClaw技能/运维类/' }
        ]
      },
    ]
  }
})
