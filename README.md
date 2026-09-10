# macOS 现代极客调教指南 (mac-guide)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![macOS 14+](https://img.shields.io/badge/macOS-14%2B%20%7C%20Apple%20Silicon-black?logo=apple)](https://apple.com)

> 借鉴 Arch Linux 社区的深度定制精神与现代工作流哲学，打造一套无废话、成体系、开箱即用的现代化 macOS 开发与极客折腾手册。

---

## 📖 文档导航

完整文档均位于 [`docs/`](./docs/index.md) 目录中，可直接在 GitHub 或本地 Markdown 阅读器中阅读：

### [01. 开箱净化与基础体验](./docs/01-getting-started/initial-setup.md)
* [系统初始化与安全边界](./docs/01-getting-started/initial-setup.md)：触控板手势、Gatekeeper 绕过、SIP 机制与权限避坑。
* [defaults 命令行深度调优](./docs/01-getting-started/defaults-tuning.md)：消灭无意义动画延迟、Finder 与 Dock 核心增强实战脚本。
* [键位与鼠标体验修复](./docs/01-getting-started/input-and-mouse.md)：破除按键长按变音标、MOS / Mac Mouse Fix 解决非 Apple 鼠标滚轮卡顿。

### [02. 现代包管理与开发底座](./docs/02-package-management/homebrew.md)
* [Homebrew 最佳实践](./docs/02-package-management/homebrew.md)：国内镜像加速、Cask 软件生命周期管理、Brewfile 声明式备份。
* [运行时管理器 mise](./docs/02-package-management/runtime-mise.md)：一个二进制取代 nvm/pyenv/rustup/gvm，跨目录自动环境隔离。
* [轻量容器化：告别 Docker Desktop](./docs/02-package-management/containers.md)：深度评测 OrbStack 与 Colima，极速启动与极致省电。

### [03. 现代终端与 CLI 生产力](./docs/03-terminal-and-cli/terminal-emulators.md)
* [现代 GPU 加速终端选型](./docs/03-terminal-and-cli/terminal-emulators.md)：Ghostty vs Kitty vs WezTerm，字体与极速渲染。
* [Shell 与 Starship 极速提示符](./docs/03-terminal-and-cli/shell-and-prompt.md)：Zsh + Starship，打造跨终端响应无延迟的 Prompt。
* [现代 CLI 全家桶替代表](./docs/03-terminal-and-cli/modern-unix-tools.md)：现代命令行必备清单与 Shell 联动 Alias。
* [终端 Rice 与 fastfetch 适配](./docs/03-terminal-and-cli/fastfetch-rice.md)：动态协议探测、在线/本地图库轮播与防爆框自适应方案。

### [04. 键盘流与平铺桌面](./docs/04-tiling-and-desktop/aerospace.md)
* [免关 SIP 平铺利器 AeroSpace](./docs/04-tiling-and-desktop/aerospace.md)：仿 i3 树形平铺、工作区自动绑定、双屏工作流。
* [窗口活动边框 JankyBorders](./docs/04-tiling-and-desktop/borders-and-bar.md)：高亮聚焦焦点、桌面美化与极客氛围拉满。
* [效率中枢 Raycast](./docs/04-tiling-and-desktop/launcher-raycast.md)：全面替代 Spotlight 与 Alfred，快捷键网格与生产力插件。
* [Karabiner-Elements 与 Hyper 键](./docs/04-tiling-and-desktop/karabiner-hyper.md)：把 Caps Lock 变成超级修饰键，彻底解决快捷键冲突。

### [05. 实用技巧与日常维护](./docs/05-workflows-and-tricks/network-proxy.md)
* [macOS 网络代理终极避坑](./docs/05-workflows-and-tricks/network-proxy.md)：终端环境变量、TUN 虚拟网卡模式、Git 与 Homebrew 代理配置。
* [声明式 Dotfiles 同步方案](./docs/05-workflows-and-tricks/dotfiles-backup.md)：基于 Chezmoi / Git 的跨机配置管理。

---

## 🛠️ 项目结构

```text
mac-guide/
├── README.md
├── docs/
│   ├── index.md
│   ├── 01-getting-started/
│   ├── 02-package-management/
│   ├── 03-terminal-and-cli/
│   ├── 04-tiling-and-desktop/
│   └── 05-workflows-and-tricks/
```

## 📄 License
MIT
