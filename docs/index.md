---
layout: home

hero:
  name: "mac-guide"
  text: "macOS 现代全景调教指南"
  tagline: "从小白日常避坑到硬核极客工作流，一份成体系、有主见、现代化的 macOS 实践手册。"
  image:
    src: /logo.svg
    alt: mac-guide
  actions:
    - theme: brand
      text: 🚀 开始阅读
      link: /00-beginner-guide/windows-to-mac
    - theme: alt
      text: 💻 硬件选购与调教
      link: /10-history-and-hardware/hardware-lineup-guide
    - theme: alt
      text: ⭐️ GitHub 仓库
      link: https://github.com/yxxbc/mac-guide

features:
  - icon: 🛡️
    title: 零安全妥协
    details: 坚决不关 SIP（系统完整性保护），100% 遵守原厂安全边界，保障硬件级安全与系统平滑升级。
  - icon: ⚡
    title: 极速与原生
    details: GPU 硬件加速终端、淘汰臃肿 Docker Desktop、极速按键连发、Metal 渲染与高刷流畅支持。
  - icon: 📜
    title: 声明式复现
    details: 基于 Brewfile 与 Chezmoi 实现一键环境恢复，新机开箱 5 分钟满血复活，告别手工重复配置。
  - icon: 🎯
    title: 全场景人群覆盖
    details: Windows 换机小白、日常轻度办公、音视频创作、游戏兼容到重度平铺键盘流程序员全面覆盖。
  - icon: 🖥️
    title: 硬件全景与调教
    details: 40年架构演变、统一内存与外接多屏避坑、MacBook Air 控温、Pro 刘海隐藏、mini 无头主机。
  - icon: 🐧
    title: LinuxDo 社区驱动
    details: 与 LinuxDo 社区共同维护，全面拥抱纯净开源神器，坚决唾弃商业流氓清理大师与弹窗广告。
---

<div align="center" style="margin-top: 2rem;">
  <p>
    <a href="https://linux.do"><img src="https://img.shields.io/badge/LinuxDo-社区-4FC08D?style=flat-square&logo=linux&logoColor=white" alt="LinuxDo" /></a>
    <img src="https://img.shields.io/badge/macOS-14%2B%20%7C%20Apple%20Silicon-000000?style=flat-square&logo=apple&logoColor=white" alt="macOS 14+" />
    <a href="https://github.com/yxxbc/mac-guide/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License" /></a>
    <img src="https://img.shields.io/badge/Docs-41%20Guides-7B2CBF?style=flat-square" alt="Guides" />
    <img src="https://img.shields.io/badge/Zero--SIP--Disable-100%25-success?style=flat-square" alt="Zero SIP Disable" />
  </p>
</div>

---

## 🌟 项目简介

长期以来，无论是在中文社区还是海外论坛，关于 macOS 的深度配置资料都面临着严重的**两极分化与碎片化**：
- **普通用户两眼一抹黑**：网上充斥着铺天盖地的营销号推荐、流氓清理软件甚至恶意推广，而关于“外接显示器字体模糊发虚”、“移动硬盘 NTFS 无法写入”、“解压 Windows 压缩包中文乱码”、“没有剪切键”等高频日常痛点，往往找不到系统、靠谱且免费的现代解法；
- **进阶极客无处着手**：很多从 Linux（特别是 Arch Linux / Hyprland / i3）转到 Mac 的开发者，被漫长的窗口动画、生硬的外接鼠标滚轮、打架的快捷键和复杂的权限模型劝退；
- **资料过时严重**：许多网络攻略停留在 Intel Mac 时代（推荐早已过时的 CleanMyMac、旧版 Yabai 关 SIP、Soundflower 虚拟声卡等），在现代 Apple Silicon (M 系列芯片) 和最新 macOS 版本下早已失效甚至引发崩溃。

**这份指南的目标是打破一切割裂**：
无论你是刚买第一台 MacBook 的大学生、日常轻度办公文职、摄影与影音创作者，还是重度键盘流的程序员与开源极客，都能在这里找到**符合现代 macOS 架构的最佳实践与开箱即用方案**。

---

## 📖 全景架构导航

```
mac-guide/
├── 00-beginner-guide/         # 新手入门与认知转型（小白到熟练工）
│   ├── windows-to-mac.md      # 从 Windows 到 Mac：概念重塑（键位/退出/Finder逻辑）
│   ├── initial-setup.md       # 系统初始化设置：触控板三指拖移、Gatekeeper 与 SIP
│   ├── quick-look.md          # 神奇的空格键：Quick Look 预览增强全家桶
│   ├── window-snapping.md     # 日常轻量分屏：Rectangle 与原生窗口吸附
│   ├── office-essentials.md   # 解压乱码救星 Keka 与原生办公高阶技巧
│   └── continuity-and-handoff.md # 跨设备生态互联：接力、隔空投送与 LocalSend
├── 01-hardware-and-display/   # 外接设备与硬件生态（痛点高发区）
│   ├── external-displays.md   # 外接显示器避坑：HiDPI发虚、DDC硬件调光与 BetterDisplay
│   ├── ntfs-and-disks.md      # 移动硬盘与 U 盘 NTFS 无法写入终极解法 (exFAT与工具)
│   ├── input-and-mouse.md     # 键位与外接鼠标：消除滚轮卡顿 (MOS) 与外接键盘映射
│   └── battery-aldente.md     # 电池健康长寿秘诀：AlDente 锁电 80% 与电源管理
├── 02-media-and-creation/     # 影音娱乐与多媒体创作
│   ├── video-player-iina.md   # 影音播放器天花板 IINA：HDR、手势与全格式播放
│   ├── audio-routing.md       # 音频内录与虚拟声卡：BlackHole 录制系统声音与网课
│   └── screenshot-tools.md    # 截图、长截图、取色与贴图：Shottr 生产力神器
├── 03-input-and-fonts/        # 输入法与文字排版
│   ├── input-methods.md       # 输入法大升级：原生调优、Input Source Pro 自动切换与 Rime
│   └── typography-fonts.md    # 字体排版与终端渲染美化：等宽字体与更纱黑体
├── 04-windows-and-gaming/     # Windows 兼容层与 Mac 游戏
│   ├── whisky-gaming.md       # Apple Silicon 玩 Windows 游戏：Whisky + Apple GPTK 实战
│   └── virtual-machines.md    # 虚拟机方案对比：免费开源 UTM vs 商业 Parallels
├── 05-system-maintenance/     # 系统净化与存储维护
│   ├── system-cleaner.md      # 彻底卸载应用：AppCleaner 拒绝流氓清理软件
│   ├── storage-rescue.md      # 深度拯救“系统数据”暴增：本地快照与大文件清理
│   ├── defaults-tuning.md     # defaults 命令行深度调优：消除动画与 Finder 净化
│   └── time-machine-nas.md    # 时间机器全能备份：移动硬盘与 NAS 无线静默备份
├── 06-package-management/     # 现代包管理与开发底座 (开发者篇)
│   ├── homebrew.md            # Homebrew 现代化管理：清华源加速与 Brewfile 备份
│   ├── xcode-clt.md           # 拒绝 40GB 庞大 Xcode：CLT 命令行工具极简安装与更新避坑
│   ├── arm64-and-rosetta.md   # Apple Silicon 双架构开发：arm64 与 x86_64 隔离与 C/C++ 路径
│   ├── runtime-mise.md        # 现代运行时管理神器 mise (统一 Node/Py/Go/Rust)
│   └── containers.md          # 轻量容器化方案：告别 Docker Desktop，拥抱 OrbStack
├── 07-terminal-and-cli/       # 现代终端与 CLI 生产力
│   ├── terminal-emulators.md  # 现代 GPU 加速终端选型与配置：Ghostty / Kitty
│   ├── shell-and-prompt.md    # Shell 与 Starship 极速提示符：抛弃臃肿 Oh-My-Zsh
│   ├── modern-unix-tools.md   # 现代 CLI 全家桶替代表 (eza/zoxide/bat/rg/delta)
│   └── fastfetch-rice.md      # 终端 Rice 与 fastfetch 系统看板 (自适应防爆框)
├── 08-tiling-and-desktop/     # 键盘流与平铺桌面
│   ├── aerospace.md           # 免关 SIP 平铺利器 AeroSpace：i3 树形平铺与瞬切
│   ├── borders-and-bar.md     # 窗口活动边框 JankyBorders 与视觉增强
│   ├── launcher-raycast.md    # 效率中枢 Raycast：深度配置与工作流
│   ├── karabiner-hyper.md     # Karabiner-Elements 与 Hyper 超级键 (Caps Lock 改造)
│   └── hammerspoon-automation.md # 用 Lua 脚本操纵一切：Hammerspoon 桌面自动化
├── 09-workflows-and-tricks/   # 实用技巧与日常维护
│   ├── network-proxy.md       # macOS 网络代理避坑：终端 proxy 函数与 TUN 模式
│   ├── dns-and-hosts.md       # 本地开发域名与 Hosts 管理：避开 .local 陷阱与 SwitchHosts
│   └── dotfiles-backup.md     # 声明式 Dotfiles 跨机同步：Chezmoi 换机一键还原
└── 10-history-and-hardware/   # 硬件全景、机型调教与技术演进
    ├── mac-history-and-evolution.md # Mac 发展史与架构演变：从 1984 到 Apple Silicon 革命
    ├── hardware-lineup-guide.md     # Mac 全系列机型解析与选购避坑指南 (内存/外接屏/SSD)
    └── model-specific-tuning.md     # 特定机型专属调教：Air控温/Pro刘海/mini无头服务器
```

---

## 核心设计原则

1. **全人群场景覆盖**：从纯小白日常使用痛点（看视频、外接屏幕、鼠标、解压缩、电池保养）到高阶极客工作流无缝衔接；
2. **严守安全与原厂标准**：全面基于 Apple Silicon 硬件与现代 macOS 体系，**坚决不破环 SIP（系统完整性保护）**，保障硬件级安全与系统稳定性；
3. **优先纯净、开源与免费**：坚决唾弃充斥流氓弹窗与高昂订阅费的商业清理工具，全面选用社区经过时间检验的高口碑工具；
4. **声明式与可复现**：配置有迹可循、环境一键恢复，拒绝“重装一次系统配置两整天”。
