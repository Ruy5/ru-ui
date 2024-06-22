import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "RUI",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/source/start' }
    ],

    sidebar: [
      {
        text: '指南',
        items: [
          { text: '安装', link: '/source/install' },
          { text: '快速开始', link: '/source/start' },
        ]
      },
      {
        text: '组件',
        items: [
          { text: '分页 pagination', link: '/source/分页pagination' },
          { text: '富文本 richtest', link: '/source/富文本richtext' },
          
          { text: '轻量级标记语言 markdown', link: '/source/轻量级标记语言markdown' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
