<div align="center">

  <img src="./assets/logo.svg" width="160" height="160" alt="mac-guide logo" />

  # macOS 现代全景配置指南
  ### Modern macOS Power-User & Everyday Guide

  <p><b>从小白日常避坑到硬核极客工作流，一份成体系、讲原理视界、现代化的 macOS 实战手册</b></p>

  <p>
    <a href="https://yxxbc.github.io/mac-guide/"><img src="https://img.shields.io/badge/Online%20Docs-VitePress-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Online Docs" /></a>
    <a href="https://github.com/yxxbc/mac-guide/issues"><img src="https://img.shields.io/badge/Feedback-Issues-blue?style=flat-square&logo=github&logoColor=white" alt="Feedback & Issues" /></a>
    <img src="https://img.shields.io/badge/macOS-14%2B%20%7C%20Apple%20Silicon-000000?style=flat-square&logo=apple&logoColor=white" alt="macOS 14+" />
    <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License" /></a>
    <img src="https://img.shields.io/badge/Docs-45%20Guides-7B2CBF?style=flat-square" alt="Guides" />
    <img src="https://img.shields.io/badge/Zero--SIP--Disable-100%25-success?style=flat-square" alt="Zero SIP Disable" />
  </p>

  <p>
    <a href="https://yxxbc.github.io/mac-guide/"><strong>🌐 在线阅读 (GitHub Pages)</strong></a> •
    <a href="#-全景文档导航"><strong>探索文档</strong></a> •
    <a href="#-选型与编撰准则"><strong>选型准则</strong></a> •
    <a href="#-快速上手路线推荐"><strong>上手路线</strong></a> •
    <a href="https://github.com/yxxbc/mac-guide/issues"><strong>💬 讨论与反馈</strong></a>
  </p>

</div>

---

## 🌟 为什么写这份指南？

长期以来，无论是在中文社区还是海外论坛，关于 macOS 的深度配置资料都面临着严重的**两极分化与碎片化**：

- **普通用户与新手到处踩坑**：充斥着铺天盖地的营销号推荐与收费高昂的流氓清理软件；而关于“外接显示器字体发虚”、“移动硬盘 NTFS 无法写入”、“解压 Windows 压缩包中文乱码”、“没有剪切键”等高频痛点，始终缺少一份保姆级闭环指南。
- **进阶开发者与极客缺乏系统参考**：很多从 Linux（特别是 Arch Linux / Hyprland / Niri / i3）转到 Mac 的用户，面对系统默认缓慢的窗口动画、生硬的外接鼠标滚轮、打架的快捷键和复杂的权限模型往往感到无所适从。
- **黑盒一键脚本的隐患**：网络上流传的大量一键装机脚本属于“黑盒执行”，用户不仅不知道改动了哪些系统键值，一旦发生配置冲突更无法排查，甚至破坏系统后续大版本平滑升级。
- **大量网文严重过时**：许多攻略停留在十年前的 Intel 架构时代（旧版 Yabai 关 SIP、Soundflower 虚拟声卡、各种第三方破解驱动），在现代 Apple Silicon 与最新 macOS（Sonoma / Sequoia）下早已失效甚至引发系统崩溃。

**这份指南的目标是打破一切割裂，坚持“授人以渔”**：无论你是刚入手第一台 MacBook 的大学生、日常办公文职、影视与摄影创作者，还是重度键盘流程序员，都能在此找到**讲清底层逻辑、兼具系统稳定性与极致生产力的现代最佳实践**。

---

## 💡 选型与编撰准则

```
    ┌─────────────────────────────────────────────────────────────────────────┐
    │                      mac-guide 选型与编撰准则                            │
    └──────┬────────────────────┬────────────────────┬────────────────────┬───┘
           │                    │                    │                    │
  ┌────────┴────────┐  ┌────────┴────────┐  ┌────────┴────────┐  ┌────────┴────────┐
  │ 🛡️ 原厂级安全   │  │ 💡 底层原理透视 │  │ ⚡ 轻量高能效   │  │ 🎯 体验优先原则 │
  │ 坚决不破坏 SIP  │  │ 拒绝盲盒脚本    │  │ 告别笨重与臃肿  │  │ 拒绝流氓与常驻  │
  │ 保障系统原汁原味│  │ 必须配反悔药    │  │ 榨干硬件潜能    │  │ 严格甄选好口碑  │
  └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘
```

1. **🛡️ 原厂级安全，零破坏性妥协**：全面拥抱现代 Apple Silicon 规范与 macOS 安全沙箱，**坚决不碰 SIP（系统完整性保护）**。拒绝通过越狱式魔改（如注入 Finder、打底层内核补丁）换取功能，确保系统随时能够平滑无缝升级大版本；
2. **💡 底层透视，透明且标配“反悔药”**：坚决拒绝“黑盒盲盒式一键脚本”。所有终端命令、`defaults` 调优和环境变量配置，均逐行拆解底层触发原理，并严格配套原厂默认恢复命令（反悔药），让你清楚明白系统改动的每一处细节；
3. **⚡ 轻量高能效，物尽其用**：摒弃笨重的 Electron 套壳工具与高能耗后台常驻，优先选用基于 GPU/Metal 硬件加速、原生 Swift/Rust 构建的高效工具，充分利用统一内存 (UMA) 与专用硬件引擎，实现 0 延迟、长续航与极致流畅；
4. **🎯 体验与尊重优先，拒绝流氓与臃肿**：不搞偏激的开源教条，以真正解决用户痛点为第一出发点。严厉抵制后台弹窗、流氓常驻与高昂订阅绑架的商业清理工具；无论是优质开源项目还是独立精品软件，唯有克制、干净、尊重用户的方案方可入选。

---

## 📖 全景文档导航

全部 44 篇深度实战文档均位于 [`docs/`](./docs/index.md) 目录，结构如下：

### 第一部分：新手起步、日常办公与多媒体

| 模块 | 核心文档 | 亮点与解决痛点 |
| :--- | :--- | :--- |
| **00. 新手入门** | [概念重塑与避坑指南](./docs/00-beginner-guide/windows-to-mac.md)<br>[系统初始化与安全边界](./docs/00-beginner-guide/initial-setup.md)<br>[神奇的空格键 Quick Look](./docs/00-beginner-guide/quick-look.md)<br>[日常轻量分屏 Rectangle](./docs/00-beginner-guide/window-snapping.md)<br>[解压乱码救星 Keka](./docs/00-beginner-guide/office-essentials.md)<br>[跨设备生态与 LocalSend](./docs/00-beginner-guide/continuity-and-handoff.md) | • 红黄绿真正生命周期模型<br>• 为什么没有剪切？`Cmd+Opt+V` 移动文件<br>• 触控板三指拖移黄金设置<br>• 任何来源与 Gatekeeper 绕过<br>• 空格预览增强（代码高亮/MD/JSON）<br>• 彻底终结 Windows 压缩包中文乱码<br>• 通用剪贴板、连续互通与跨端局域网传输 |
| **01. 硬件外设** | [外接显示器 HiDPI 避坑](./docs/01-hardware-and-display/external-displays.md)<br>[移动硬盘 NTFS 无法写入](./docs/01-hardware-and-display/ntfs-and-disks.md)<br>[键位与外接鼠标体验修复](./docs/01-hardware-and-display/input-and-mouse.md)<br>[MacBook 电池长寿秘诀](./docs/01-hardware-and-display/battery-aldente.md) | • BetterDisplay 强开 2K/4K 原生 HiDPI<br>• 原生键盘调节第三方显示器背光/音量<br>• 跨平台 exFAT 格式化最佳实践<br>• MOS 独立控制鼠标滚轮平滑与方向<br>• AlDente 80% 物理锁电与直通供电防鼓包 |
| **02. 影音创作** | [影音播放器天花板 IINA](./docs/02-media-and-creation/video-player-iina.md)<br>[音频内录与虚拟声卡 BlackHole](./docs/02-media-and-creation/audio-routing.md)<br>[截图长截图与贴图 Shottr](./docs/02-media-and-creation/screenshot-tools.md) | • mpv 内核全格式硬解与 Liquid Retina XDR 映射<br>• 多输出设备实现电脑内部声音无损内录<br>• 极速滚动长截图、离线毫秒级 OCR 与贴图置顶 |
| **03. 输入排版** | [输入法大升级与自动切换](./docs/03-input-and-fonts/input-methods.md)<br>[字体排版与终端渲染美化](./docs/03-input-and-fonts/typography-fonts.md) | • Input Source Pro 针对特定软件秒切中英文<br>• Rime 鼠须管雾凇拼音完全离线词库<br>• 更纱黑体解决中英文等宽表格撕裂错位 |
| **04. 兼容游戏** | [Apple Silicon 玩 Windows 游戏](./docs/04-windows-and-gaming/whisky-gaming.md)<br>[虚拟机方案 UTM vs Parallels](./docs/04-windows-and-gaming/virtual-machines.md) | • Whisky + Apple GPTK (D3DMetal) 翻译层<br>• 免装虚拟机畅玩 Windows Steam 3A 游戏<br>• 开源 UTM 免费一键部署 Windows 11 ARM |
| **05. 维护存储** | [彻底卸载应用 AppCleaner](./docs/05-system-maintenance/system-cleaner.md)<br>[深度拯救“系统数据”暴增](./docs/05-system-maintenance/storage-rescue.md)<br>[defaults 命令行深度优化](./docs/05-system-maintenance/defaults-tuning.md)<br>[时间机器与 NAS 备份指南](./docs/05-system-maintenance/time-machine-nas.md) | • 揭露流氓清理大师谎言，AppCleaner 纯净卸载<br>• 查找并清除 Time Machine 本地快照释放几十 GB<br>• defaults 命令原理剖析与按需脚本编写<br>• 搭建免插线 NAS 局域网静默无线备份 |

### 第二部分：极客开发、现代命令行与全键盘桌面

| 模块 | 核心文档 | 亮点与解决痛点 |
| :--- | :--- | :--- |
| **06. 包管理底座**| [Homebrew 现代化管理体系](./docs/06-package-management/homebrew.md)<br>[Xcode 命令行工具 (CLT) 极简安装](./docs/06-package-management/xcode-clt.md)<br>[Apple Silicon 双架构开发隔离](./docs/06-package-management/arm64-and-rosetta.md)<br>[现代运行时管理神器 mise](./docs/06-package-management/runtime-mise.md)<br>[轻量容器化方案 OrbStack](./docs/06-package-management/containers.md) | • 国内清华镜像源极速配置与 `Brewfile` 一键还原<br>• 拒绝 40GB 庞大 Xcode，CLT 极简安装与更新避坑<br>• Rosetta 2 与 arm64/x86 隔离，彻底解决 C/C++ 头文件路径缺失<br>• 一个二进制管理 Node/Py/Go/Rust，0ms 启动<br>• 淘汰臃肿 Docker Desktop，仅耗 100MB 内存 |
| **07. 现代终端** | [GPU 加速终端 Ghostty / Kitty](./docs/07-terminal-and-cli/terminal-emulators.md)<br>[Shell 与 Starship 极速提示符](./docs/07-terminal-and-cli/shell-and-prompt.md)<br>[现代 CLI 全家桶替代表](./docs/07-terminal-and-cli/modern-unix-tools.md)<br>[终端 Rice 与 fastfetch 看板](./docs/07-terminal-and-cli/fastfetch-rice.md) | • 120Hz 高刷 Metal 渲染与 Nerd Fonts 字体<br>• 弃用臃肿 Oh-My-Zsh，启动延迟压制在 30ms 内<br>• `eza` / `zoxide` / `bat` / `ripgrep` / `delta` 全面替换<br>• 自适应宽度防爆框终端看板 `myfastfetch` |
| **08. 平铺桌面** | [免关 SIP 平铺利器 AeroSpace](./docs/08-tiling-and-desktop/aerospace.md)<br>[窗口活动边框 JankyBorders](./docs/08-tiling-and-desktop/borders-and-bar.md)<br>[效率中枢 Raycast 深度配置](./docs/08-tiling-and-desktop/launcher-raycast.md)<br>[Karabiner 与 Hyper 超级键](./docs/08-tiling-and-desktop/karabiner-hyper.md)<br>[Lua 桌面自动化 Hammerspoon](./docs/08-tiling-and-desktop/hammerspoon-automation.md) | • **100% 免关 SIP** 的 i3 树形平铺，工作区毫秒瞬切<br>• 活动窗口彩色焦点高亮边框<br>• 替代 Spotlight，集成剪贴板/代码片段/Kill 进程<br>• Caps Lock 改造成 Hyper 键 (Cmd+Ctrl+Opt+Shift)<br>• 防社死拔耳机自动静音、Wi-Fi 感知自动化 |
| **09. 技巧维护** | [macOS 网络代理避坑指南](./docs/09-workflows-and-tricks/network-proxy.md)<br>[本地开发域名与 Hosts 管理](./docs/09-workflows-and-tricks/dns-and-hosts.md)<br>[声明式 Dotfiles 跨机同步](./docs/09-workflows-and-tricks/dotfiles-backup.md) | • 终端 `proxy/unproxy` 函数与 TUN 虚拟网卡排坑<br>• 避开 `.local` 多播 DNS 5秒超时大坑与 SwitchHosts<br>• Chezmoi 纳管全部配置，新机 5 分钟满血复活 |

### 第三部分：硬件全景、机型深度调优与技术演进

| 模块 | 核心文档 | 亮点与解决痛点 |
| :--- | :--- | :--- |
| **10. 硬件与演进** | [Mac 40年发展史与架构演变](./docs/10-history-and-hardware/mac-history-and-evolution.md)<br>[全系列机型解析与选购避坑](./docs/10-history-and-hardware/hardware-lineup-guide.md)<br>[特定机型专属深度调优](./docs/10-history-and-hardware/model-specific-tuning.md) | • 从 1984 Macintosh 到 Apple Silicon 三次大迁徙与 Unix 基因<br>• 统一内存玄机、外接双屏/MST雷区、SSD降速门与选购决策树<br>• Air 低电量模式控温、Pro 刘海隐藏/120Hz、Mac mini 无头假负载/防休眠 |

### 第四部分：UNIX 底层机制与硬件极限压榨

| 模块 | 核心文档 | 亮点与解决痛点 |
| :--- | :--- | :--- |
| **11. UNIX 底层** | [XNU 混合内核与 Darwin 架构揭秘](./docs/11-unix-and-system-internals/xnu-darwin-architecture.md)<br>[Apple Silicon 硬件极限压榨与异构加速](./docs/11-unix-and-system-internals/hardware-squeezing-and-silicon.md)<br>[launchd 调度、BSD 差异与 APFS 黑科技](./docs/11-unix-and-system-internals/bsd-tools-and-launchd.md) | • 揭秘 UNIX 03 官方认证标准、Mach 微内核、BSD 子系统与 GCD 线程优先级<br>• 统一内存架构 (UMA) 零拷贝、专用 Media Engine 视频硬解与内存压缩机制<br>• 玩转 launchd 守护进程与定时任务、避开 BSD 工具链大坑、APFS 零秒克隆与写入时复制 |

---

## 🚀 快速上手路线推荐

- **我是 Mac 新手 / 刚从 Windows 换过来**：
  建议按照 `00. 新手入门` ➡️ `01. 硬件外设` ➡️ `02. 影音创作` 顺序阅读，半小时内把常用阻碍（发虚、乱码、滚轮、剪切）彻底扫清。
- **我想买 Mac / 纠结配置选型 / 想挖掘机型潜力**：
  先读 [全系列机型解析与选购避坑](./docs/10-history-and-hardware/hardware-lineup-guide.md) 防踩内存与多屏坑，再读 [特定机型专属深度调优](./docs/10-history-and-hardware/model-specific-tuning.md) 压榨硬件潜能。
- **我想深入理解 Mac 硬件架构与 UNIX 底层机理**：
  直达 [第四部分：UNIX 底层机制与硬件极限压榨](./docs/11-unix-and-system-internals/xnu-darwin-architecture.md)，透视 XNU 内核、内存零拷贝、Media Engine 与 APFS 文件系统。
- **我是办公人群 / 创作者**：
  重点阅读 [Shottr 截图标注](./docs/02-media-and-creation/screenshot-tools.md)、[BlackHole 音频内录](./docs/02-media-and-creation/audio-routing.md)、[Keka 办公解压](./docs/00-beginner-guide/office-essentials.md) 与 [跨设备互联](./docs/00-beginner-guide/continuity-and-handoff.md)。
- **我是程序员 / Linux 极客**：
  直接跳至 `06. 包管理` ➡️ `07. 现代终端` ➡️ `08. 平铺桌面` ➡️ `11. UNIX 底层`，享受 AeroSpace + Ghostty + mise 带来的原生平铺、全键盘飞速与纯正 Unix 体验。

---

## 🤝 参与讨论与共建

如果你在使用过程中发现任何问题、发现了最新 macOS 版本的系统变更，或者有更好的配置思路和冷门神器补充，欢迎通过以下方式参与：

- 💬 **[GitHub Issues](https://github.com/yxxbc/mac-guide/issues)**：提交反馈、报错排坑或提出新需求；
- 💡 **[Pull Requests](https://github.com/yxxbc/mac-guide/pulls)**：直接贡献你的最佳实践与排版优化；
- 🌐 **[在线文档](https://yxxbc.github.io/mac-guide/)**：享受基于 VitePress 的极致搜索与阅读体验。

## 📄 开源许可证

本项目遵循 [MIT 许可证](./LICENSE) 开源。

<div align="center">
  <sub>Made with ❤️ for macOS power users and newcomers alike.</sub>
</div>
