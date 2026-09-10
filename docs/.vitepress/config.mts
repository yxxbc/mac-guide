import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
  title: 'mac-guide',
  description: '一套成体系、全场景、现代化的 macOS 实践手册。从小白日常避坑到硬核极客工作流，涵盖外设/影音/游戏/系统维护/现代终端/平铺桌面 (AeroSpace)。',
  base: '/mac-guide/',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/mac-guide/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#6366f1' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh-CN' }],
    ['meta', { property: 'og:title', content: 'mac-guide - macOS 现代全景配置指南' }],
    ['meta', { property: 'og:description', content: '从小白日常避坑到硬核极客工作流，一份成体系、讲原理解释、现代化的 macOS 实战手册。' }]
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'mac-guide',

    nav: [
      { text: '首页', link: '/' },
      {
        text: '新手与日常',
        items: [
          { text: '00. 新手入门', link: '/00-beginner-guide/windows-to-mac' },
          { text: '01. 硬件外设与屏幕', link: '/01-hardware-and-display/built-in-display-color' },
          { text: '02. 影音创作', link: '/02-media-and-creation/video-player-iina' },
          { text: '03. 输入排版', link: '/03-input-and-fonts/input-methods' },
          { text: '04. 兼容游戏', link: '/04-windows-and-gaming/whisky-gaming' },
          { text: '05. 维护存储', link: '/05-system-maintenance/system-cleaner' }
        ]
      },
      {
        text: '极客与开发',
        items: [
          { text: '06. 包管理底座', link: '/06-package-management/homebrew' },
          { text: '07. 现代终端', link: '/07-terminal-and-cli/terminal-emulators' },
          { text: '08. 平铺桌面', link: '/08-tiling-and-desktop/aerospace' },
          { text: '09. 技巧维护', link: '/09-workflows-and-tricks/network-proxy' }
        ]
      },
      {
        text: '硬件与内核',
        items: [
          { text: '10. Mac 40年架构演变史', link: '/10-history-and-hardware/mac-history-and-evolution' },
          { text: '10. 全系列机型选购避坑', link: '/10-history-and-hardware/hardware-lineup-guide' },
          { text: '10. 特定机型专属深度调优', link: '/10-history-and-hardware/model-specific-tuning' },
          { text: '11. XNU 内核与 Darwin 架构', link: '/11-unix-and-system-internals/xnu-darwin-architecture' },
          { text: '11. Apple Silicon 硬件极限压榨', link: '/11-unix-and-system-internals/hardware-squeezing-and-silicon' },
          { text: '11. launchd 与 APFS 机制', link: '/11-unix-and-system-internals/bsd-tools-and-launchd' }
        ]
      },
      { text: '🐧 LinuxDo', link: 'https://linux.do' }
    ],

    sidebar: [
      {
        text: '第一部分：新手起步与日常生态',
        collapsed: false,
        items: [
          {
            text: '00. 新手入门与认知转型',
            collapsed: false,
            items: [
              { text: '从 Windows 到 Mac：概念重塑', link: '/00-beginner-guide/windows-to-mac' },
              { text: '系统初始化：三指拖移与安全边界', link: '/00-beginner-guide/initial-setup' },
              { text: '神奇的空格键：Quick Look 全家桶', link: '/00-beginner-guide/quick-look' },
              { text: '日常轻量分屏：Rectangle', link: '/00-beginner-guide/window-snapping' },
              { text: '解压乱码救星 Keka 与办公技巧', link: '/00-beginner-guide/office-essentials' },
              { text: '跨设备生态互联与 LocalSend', link: '/00-beginner-guide/continuity-and-handoff' }
            ]
          },
          {
            text: '01. 硬件外设与屏幕显示',
            collapsed: false,
            items: [
              { text: '内置屏幕色彩调优：预设与色彩管理', link: '/01-hardware-and-display/built-in-display-color' },
              { text: '外接显示器避坑：HiDPI 与 BetterDisplay', link: '/01-hardware-and-display/external-displays' },
              { text: '移动硬盘与 U 盘 NTFS 无法写入', link: '/01-hardware-and-display/ntfs-and-disks' },
              { text: '键位与外接鼠标：滚轮平滑 MOS', link: '/01-hardware-and-display/input-and-mouse' },
              { text: 'MacBook 电池长寿秘诀：AlDente 锁电', link: '/01-hardware-and-display/battery-aldente' }
            ]
          },
          {
            text: '02. 影音娱乐与多媒体创作',
            collapsed: false,
            items: [
              { text: '影音播放器天花板：IINA', link: '/02-media-and-creation/video-player-iina' },
              { text: '音频内录与虚拟声卡：BlackHole', link: '/02-media-and-creation/audio-routing' },
              { text: '截图、长截图、取色与贴图：Shottr', link: '/02-media-and-creation/screenshot-tools' }
            ]
          },
          {
            text: '03. 输入法与文字排版',
            collapsed: false,
            items: [
              { text: '输入法大升级：Input Source Pro 与 Rime', link: '/03-input-and-fonts/input-methods' },
              { text: '字体排版与终端渲染美化', link: '/03-input-and-fonts/typography-fonts' }
            ]
          },
          {
            text: '04. Windows 兼容层与 Mac 游戏',
            collapsed: false,
            items: [
              { text: 'Apple Silicon 玩 Windows 游戏：Whisky', link: '/04-windows-and-gaming/whisky-gaming' },
              { text: '虚拟机方案对比：UTM vs Parallels', link: '/04-windows-and-gaming/virtual-machines' }
            ]
          },
          {
            text: '05. 系统净化与存储维护',
            collapsed: false,
            items: [
              { text: '彻底卸载应用：AppCleaner 拒绝流氓软件', link: '/05-system-maintenance/system-cleaner' },
              { text: '深度拯救“系统数据”暴增与本地快照', link: '/05-system-maintenance/storage-rescue' },
              { text: 'defaults 命令行深度调优', link: '/05-system-maintenance/defaults-tuning' },
              { text: '时间机器全能备份：硬盘与 NAS 无线备份', link: '/05-system-maintenance/time-machine-nas' }
            ]
          }
        ]
      },
      {
        text: '第二部分：极客开发与全键盘桌面',
        collapsed: false,
        items: [
          {
            text: '06. 现代包管理与开发底座',
            collapsed: false,
            items: [
              { text: 'Homebrew 现代化管理体系与清华源', link: '/06-package-management/homebrew' },
              { text: 'Xcode 命令行工具 (CLT) 极简安装', link: '/06-package-management/xcode-clt' },
              { text: 'Apple Silicon 双架构开发隔离与路径', link: '/06-package-management/arm64-and-rosetta' },
              { text: '现代运行时管理神器：mise', link: '/06-package-management/runtime-mise' },
              { text: '轻量容器化方案：OrbStack', link: '/06-package-management/containers' }
            ]
          },
          {
            text: '07. 现代终端与 CLI 生产力',
            collapsed: false,
            items: [
              { text: 'GPU 加速终端：Ghostty / Kitty', link: '/07-terminal-and-cli/terminal-emulators' },
              { text: 'Shell 与 Starship 极速提示符', link: '/07-terminal-and-cli/shell-and-prompt' },
              { text: '现代 CLI 全家桶替代表 (eza/bat/rg/zoxide)', link: '/07-terminal-and-cli/modern-unix-tools' },
              { text: '终端 Rice 与 fastfetch 系统看板', link: '/07-terminal-and-cli/fastfetch-rice' }
            ]
          },
          {
            text: '08. 键盘流与平铺桌面',
            collapsed: false,
            items: [
              { text: '免关 SIP 平铺利器：AeroSpace', link: '/08-tiling-and-desktop/aerospace' },
              { text: '窗口活动边框 JankyBorders 与视觉增强', link: '/08-tiling-and-desktop/borders-and-bar' },
              { text: '效率中枢：Raycast 深度配置', link: '/08-tiling-and-desktop/launcher-raycast' },
              { text: 'Karabiner-Elements 与 Hyper 超级键', link: '/08-tiling-and-desktop/karabiner-hyper' },
              { text: 'Lua 脚本桌面自动化：Hammerspoon', link: '/08-tiling-and-desktop/hammerspoon-automation' }
            ]
          },
          {
            text: '09. 实用技巧与日常维护',
            collapsed: false,
            items: [
              { text: 'macOS 网络代理避坑与 TUN 模式', link: '/09-workflows-and-tricks/network-proxy' },
              { text: '本地开发域名与 Hosts 管理 (.local避坑)', link: '/09-workflows-and-tricks/dns-and-hosts' },
              { text: '声明式 Dotfiles 跨机同步：Chezmoi', link: '/09-workflows-and-tricks/dotfiles-backup' }
            ]
          }
        ]
      },
      {
        text: '第三部分：硬件全景与机型深度调优',
        collapsed: false,
        items: [
          {
            text: '10. 硬件全景、机型调优与技术演进',
            collapsed: false,
            items: [
              { text: 'Mac 40年架构演变：1984 到 M 芯片', link: '/10-history-and-hardware/mac-history-and-evolution' },
              { text: '全系列机型解析与选购避坑指南', link: '/10-history-and-hardware/hardware-lineup-guide' },
              { text: '特定机型专属深度调优：Air/Pro/mini', link: '/10-history-and-hardware/model-specific-tuning' }
            ]
          }
        ]
      },
      {
        text: '第四部分：UNIX 底层与系统内核',
        collapsed: false,
        items: [
          {
            text: '11. UNIX 底层与架构精要',
            collapsed: false,
            items: [
              { text: 'XNU 混合内核与 Darwin 架构揭秘', link: '/11-unix-and-system-internals/xnu-darwin-architecture' },
              { text: 'Apple Silicon 硬件极限压榨与异构加速', link: '/11-unix-and-system-internals/hardware-squeezing-and-silicon' },
              { text: 'UNIX 生产力深水区：launchd 与 APFS', link: '/11-unix-and-system-internals/bsd-tools-and-launchd' }
            ]
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yxxbc/mac-guide' }
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },

    editLink: {
      pattern: 'https://github.com/yxxbc/mac-guide/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      level: [2, 3],
      label: '本页大纲'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    footer: {
      message: '遵循 MIT 协议开源 | Powered by VitePress',
      copyright: 'Copyright © 2026 yxxbc & LinuxDo 社区'
    }
  }
})
)
