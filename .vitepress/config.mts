import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'AI 知识整理',
  description: '面向 AI 工具、工作流、策略与架构的个人知识库',
  ignoreDeadLinks: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'AI工具集合', link: '/AI工具集合/' },
      { text: 'AI方法与策略', link: '/AI方法与策略/' },
      { text: 'OpenClaw技能', link: '/OpenClaw技能/' },
      { text: 'AI前沿动态', link: '/AI前沿动态/' }
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
          {
            text: 'Agent',
            link: '/AI方法与策略/Agent/',
            collapsed: false,
            items: [
              {
                text: '面试题总览',
                link: '/AI方法与策略/Agent/面试题总览/',
                collapsed: true,
                items: [
                  { text: '高频题清单', link: '/AI方法与策略/Agent/面试题总览/高频题清单' },
                  { text: '系统设计题', link: '/AI方法与策略/Agent/面试题总览/系统设计题' }
                ]
              },
              {
                text: '常见架构',
                link: '/AI方法与策略/Agent/常见架构/',
                collapsed: true,
                items: [
                  { text: 'ReAct', link: '/AI方法与策略/Agent/常见架构/ReAct' },
                  { text: 'Reflection', link: '/AI方法与策略/Agent/常见架构/Reflection' },
                  { text: 'Router', link: '/AI方法与策略/Agent/常见架构/Router' },
                  { text: 'Plan-and-Execute', link: '/AI方法与策略/Agent/常见架构/Plan-and-Execute' },
                  { text: 'Self-Ask', link: '/AI方法与策略/Agent/常见架构/Self-Ask' },
                  { text: '多Agent与Supervisor', link: '/AI方法与策略/Agent/常见架构/多Agent与Supervisor' },
                  { text: '单Agent与Tool Calling', link: '/AI方法与策略/Agent/常见架构/单Agent与Tool Calling' },
                  { text: 'Prompt与推理策略', link: '/AI方法与策略/Agent/常见架构/Prompt与推理策略' }
                ]
              },
              {
                text: 'Python与LangChain1.0',
                link: '/AI方法与策略/Agent/Python与LangChain1.0/',
                collapsed: true,
                items: [
                  { text: '关键工程点', link: '/AI方法与策略/Agent/Python与LangChain1.0/关键工程点' },
                  { text: '常见坑', link: '/AI方法与策略/Agent/Python与LangChain1.0/常见坑' },
                  { text: '最小工程骨架', link: '/AI方法与策略/Agent/Python与LangChain1.0/最小工程骨架' },
                  { text: '核心实现模板', link: '/AI方法与策略/Agent/Python与LangChain1.0/核心实现模板' }
                ]
              }
            ]
          },
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
      {
        text: 'AI前沿动态',
        items: [
          { text: '总览', link: '/AI前沿动态/' },
          { text: '前沿模型', link: '/AI前沿动态/前沿模型/' },
          { text: '开源生态', link: '/AI前沿动态/开源生态/' },
          { text: 'AI应用与Agent', link: '/AI前沿动态/AI应用与Agent/' },
          { text: '技术突破', link: '/AI前沿动态/技术突破/' },
          { text: '行业动态', link: '/AI前沿动态/行业动态/' },
          { text: '政策与安全', link: '/AI前沿动态/政策与安全/' }
        ]
      }
    ]
  }
})
