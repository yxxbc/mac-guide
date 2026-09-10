# macOS 现代极客调教指南 (macOS Power-User Guide)

> 借鉴 Arch Linux 社区的深度定制精神与现代工作流哲学，打造一套无废话、成体系、开箱即用的现代化 macOS 开发与极客折腾手册。

---

## 为什么写这份指南？

长期以来，无论是在国内还是海外社区，关于 macOS 的深度配置资料都有一个通病：**极度碎片化**。

- 官方文档停留在初学者开箱说明（教你用触控板和 Dock）或原生的 Swift/Cocoa 开发者 API，中间最庞大的“专业开发者、CLI 玩家、键盘流效率狂人”的系统定制知识处于真空地带。
- 社区流传的很多所谓“装机必备”往往是粗糙的商业软件堆砌（甚至夹带私货推荐清理大师），而真正的深度玩法（`defaults` 调优、免关 SIP 平铺窗口管理、现代 Rust CLI 工具链替换、多语言环境隔离）散落在 GitHub 的 Gist、个人 dotfiles、Reddit 以及少数极客的个人博客里。
- 很多从 Linux（特别是 Arch Linux / Hyprland / Niri / i3）转到 macOS 的开发者，初上手时都会产生强烈的割裂感与挫败感：窗口管理滞后、终端延迟高、键位逻辑分裂、包管理依赖污染。

这份指南的目标就是**打破这种零散状态**：
像社区里优秀的发行版向导（如 Arch Linux 社区的经典指南）一样，用**明确的主见（Opinionated）**、**高度结构化的脉络**与**直接可落地的脚本配置**，带你从一块纯净的 macOS 原厂砖头，一步步构筑出极速、优雅且可复现的现代极客工作站。

---

## 核心设计哲学

1. **坚持声明式与可复现（Reproducible）**：
   拒绝点鼠标“凭记忆配置”。系统软件通过 `Brewfile` 统一管理，运行时通过 `mise` 声明，终端与桌面配置文件全部代码化，换机或重装一条命令即可满血复活。
2. **拥抱现代 CLI 全家桶（Modern Rust Tools）**：
   全面淘汰上世纪遗留的古老 Unix 工具链。用 `eza` 取代 `ls`，用 `bat` 取代 `cat`，用 `zoxide` 取代 `cd`，用 `ripgrep` 取代 `grep`，用 `mise` 取代各语言老旧的 `*env`。
3. **极简、省电与原生性能优先**：
   抛弃笨重的跨平台 Electron 堆砌物与常驻高耗电服务；容器化全面抛弃臃肿的 Docker Desktop，采用原生轻量的 OrbStack；终端优先采用 GPU 硬件加速的 Ghostty / Kitty。
4. **尊重 macOS 特性，不盲目破坏安全边界**：
   在平铺窗口（Tiling WM）方案上，优先选用**无需关闭 SIP（系统完整性保护）**的现代树形窗口管理器 AeroSpace，兼顾极客键盘流的高效与 Apple Silicon 的硬件安全。

---

## 章节速览与路线图

| 章节 | 核心内容 | 重点工具 / 技术点 |
| :--- | :--- | :--- |
| **01. 开箱净化与基础体验** | 系统初始化、安全边界理解、命令行深度优化、外设体验修复 | `defaults write`、Gatekeeper、SIP、MOS / Mac Mouse Fix |
| **02. 现代包管理与开发底座** | 声明式软件生命周期管理、现代多语言环境、极速轻量容器 | Homebrew、`Brewfile`、`mise`、OrbStack / Colima |
| **03. 现代终端与 CLI 生产力** | GPU 加速极速终端、现代 Shell 提示符、现代工具链替换、终端看板美化 | Ghostty / Kitty、Starship、`zoxide`、`eza`、`bat`、`fastfetch` |
| **04. 键盘流与平铺桌面** | 把 macOS 变成真正的平铺桌面、全局快捷键网格、效率启动器 | AeroSpace、JankyBorders、Raycast、Karabiner Hyper 键 |
| **05. 实用技巧与日常维护** | 终端与系统代理避坑、环境备份与无缝迁移 | TUN 模式、Proxychains、Chezmoi / Git Dotfiles |

---

## 运行环境假设

- **硬件架构**：推荐 Apple Silicon (M1 / M2 / M3 / M4 芯片全系列)。
- **系统版本**：macOS 14 (Sonoma) 或 macOS 15 (Sequoia) 及以上。
- **目标受众**：程序员、开源极客、全键盘流工作者，以及希望榨干 Mac 生产力的折腾玩家。
