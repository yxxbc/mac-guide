# macOS 现代全景调教指南 (mac-guide)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![macOS 14+](https://img.shields.io/badge/macOS-14%2B%20%7C%20Apple%20Silicon-black?logo=apple)](https://apple.com)

> 涵盖普通日常、办公协同、影音创作、游戏兼容到硬核极客终端的全景 macOS 实践手册。

---

## 📖 全景文档导航

所有章节 Markdown 文档均位于 [`docs/`](./docs/index.md) 目录中，可直接点击阅读：

### [00. 新手入门与认知转型](./docs/00-beginner-guide/windows-to-mac.md)
* [从 Windows 到 macOS：概念重塑与避坑指南](./docs/00-beginner-guide/windows-to-mac.md)：红黄绿按钮含义、为什么没有剪切、修饰键 Command 心智模型。
* [系统初始化与安全边界](./docs/00-beginner-guide/initial-setup.md)：触控板三指拖移、Gatekeeper 任何来源、SIP 原理与权限排坑。
* [神奇的空格键：Quick Look 预览增强全家桶](./docs/00-beginner-guide/quick-look.md)：代码高亮、Markdown 渲染、JSON 树形折叠、图片尺寸。
* [日常轻量分屏：Rectangle 与原生窗口吸附](./docs/00-beginner-guide/window-snapping.md)：拖拽贴边分屏、1/2 与 1/3 屏幕快捷键、Sequoia 吸附对比。
* [解压乱码救星 Keka 与办公必备技巧](./docs/00-beginner-guide/office-essentials.md)：彻底解决 Windows 压缩包文件名乱码、排除 `__MACOSX`、PDF 原生手写签名与合并。

### [01. 外接设备与硬件生态](./docs/01-hardware-and-display/external-displays.md)
* [外接显示器避坑：HiDPI 发虚与 BetterDisplay](./docs/01-hardware-and-display/external-displays.md)：视网膜缩放原理、强开 2K/4K HiDPI、原生键盘调外接屏幕亮度/音量。
* [移动硬盘与 U 盘 NTFS 无法写入终极解法](./docs/01-hardware-and-display/ntfs-and-disks.md)：跨平台 exFAT 格式化最佳实践、NTFS 只读原因与挂载方案。
* [键位与外接鼠标体验修复](./docs/01-hardware-and-display/input-and-mouse.md)：MOS 平滑滚动与方向独立、禁用长按音标、Win 机械键盘修饰键互换。
* [MacBook 电池长寿秘诀：AlDente 锁电 80%](./docs/01-hardware-and-display/battery-aldente.md)：阻止 100% 满电高压鼓包、直通供电 (Power Bypass) 原理与配置。

### [02. 影音娱乐与多媒体创作](./docs/02-media-and-creation/video-player-iina.md)
* [macOS 影音播放器天花板：IINA](./docs/02-media-and-creation/video-player-iina.md)：基于 mpv 引擎、全格式硬解、Liquid Retina XDR HDR 映射、触控板手势。
* [音频内录与虚拟声卡：BlackHole 解决系统声音录制](./docs/02-media-and-creation/audio-routing.md)：音频 MIDI 设置创建多输出设备、网课/会议/视频无损内录。
* [截图、长截图、取色与贴图：Shottr](./docs/02-media-and-creation/screenshot-tools.md)：极速轻量截长图、离线毫秒级 OCR 识字、像素测量与屏幕贴图置顶。

### [03. 输入法与文字排版](./docs/03-input-and-fonts/input-methods.md)
* [输入法体验大升级：原生调优与自动切换](./docs/03-input-and-fonts/input-methods.md)：Input Source Pro 针对应用自动切中英文、光标提示、Rime 鼠须管雾凇拼音。
* [字体排版与终端渲染美化](./docs/03-input-and-fonts/typography-fonts.md)：更纱黑体解决中英文等宽表格撕裂、JetBrains Mono、平滑抗锯齿微调。

### [04. Windows 兼容层与 Mac 游戏](./docs/04-windows-and-gaming/whisky-gaming.md)
* [Apple Silicon 玩 Windows 游戏：Whisky 实战](./docs/04-windows-and-gaming/whisky-gaming.md)：Wine + 苹果 GPTK (D3DMetal) 翻译层、免虚拟机运行 Windows Steam 与 3A 游戏。
* [虚拟机方案对比：开源 UTM vs 商业 Parallels](./docs/04-windows-and-gaming/virtual-machines.md)：免费开源 UTM 一键部署 Windows 11 ARM、网银盾与工业软件兼容。

### [05. 系统净化与存储维护](./docs/05-system-maintenance/system-cleaner.md)
* [彻底卸载应用：AppCleaner 拒绝流氓清理软件](./docs/05-system-maintenance/system-cleaner.md)：揭穿商业清理软件谎言、彻底清除 `~/Library` 残留、`brew --zap` 深度卸载。
* [深度拯救“系统数据”暴增：本地快照与大文件清理](./docs/05-system-maintenance/storage-rescue.md)：删除 Time Machine 本地快照释放几十 GB、清理 Xcode 缓存、`dust` 空间可视化。
* [defaults 命令行深度调优](./docs/05-system-maintenance/defaults-tuning.md)：消灭 Dock 动画延迟、Finder 始终显示扩展名与隐藏文件、完整 `defaults.sh` 脚本。

### [06. 现代包管理与开发底座](./docs/06-package-management/homebrew.md)
* [Homebrew 现代化管理体系](./docs/06-package-management/homebrew.md)：清华镜像源加速、Cask 接管 GUI、`Brewfile` 声明式一键换机还原。
* [现代运行时管理神器：mise](./docs/06-package-management/runtime-mise.md)：一个二进制统一 Node/Python/Go/Rust、0ms 终端延迟、替代 direnv。
* [轻量容器化方案：告别 Docker Desktop](./docs/06-package-management/containers.md)：深度拥抱 OrbStack (100MB 内存/Rosetta 2/域名直通) 与开源 Colima。

### [07. 现代终端与 CLI 生产力](./docs/07-terminal-and-cli/terminal-emulators.md)
* [现代 GPU 加速终端选型与配置](./docs/07-terminal-and-cli/terminal-emulators.md)：Ghostty / Kitty 现代 GPU 终端对比与完整配置文件模板、Nerd Fonts。
* [Shell 与 Starship 极速提示符](./docs/07-terminal-and-cli/shell-and-prompt.md)：抛弃臃肿 Oh-My-Zsh、Starship 极速异步提示符、Zsh 原生插件秒启。
* [现代 CLI 全家桶替代表](./docs/07-terminal-and-cli/modern-unix-tools.md)：`eza` / `zoxide` / `bat` / `ripgrep` / `fd` / `delta` 现代替换表与别名。
* [终端 Rice 与 fastfetch 系统看板](./docs/07-terminal-and-cli/fastfetch-rice.md)：跨终端 Kitty 图像协议适配、分屏窄窗防爆框自适应脚本 `myfastfetch`。

### [08. 键盘流与平铺桌面](./docs/08-tiling-and-desktop/aerospace.md)
* [免关 SIP 平铺利器：AeroSpace](./docs/08-tiling-and-desktop/aerospace.md)：**100% 免关 SIP** 的 i3 树形平铺、工作区毫秒瞬切、完整 TOML 生产力配置。
* [窗口活动边框 JankyBorders 与视觉增强](./docs/08-tiling-and-desktop/borders-and-bar.md)：JankyBorders 动态活动窗口高亮边框、原生菜单栏平衡取舍。
* [效率中枢：Raycast 深度配置与工作流](./docs/08-tiling-and-desktop/launcher-raycast.md)：替代 Spotlight/Alfred、剪贴板/Snippets/Kill Process 核心插件工作流。
* [Karabiner-Elements 与 Hyper 超级键](./docs/08-tiling-and-desktop/karabiner-hyper.md)：Caps Lock 改造成 Hyper 键 (Cmd+Ctrl+Opt+Shift) + Esc，全局零冲突快捷键。

### [09. 实用技巧与日常维护](./docs/09-workflows-and-tricks/network-proxy.md)
* [macOS 网络代理避坑与极客指南](./docs/09-workflows-and-tricks/network-proxy.md)：终端环境变量 `proxy/unproxy` 函数、TUN 模式避坑、Git/Homebrew 独立代理。
* [声明式 Dotfiles 跨机同步：Chezmoi](./docs/09-workflows-and-tricks/dotfiles-backup.md)：基于 Chezmoi 的跨机声明式同步、模板渲染、新机 5 分钟满血复活。

---

## 🛠️ 项目文件结构

```text
mac-guide/
├── README.md
├── docs/
│   ├── index.md
│   ├── 00-beginner-guide/
│   ├── 01-hardware-and-display/
│   ├── 02-media-and-creation/
│   ├── 03-input-and-fonts/
│   ├── 04-windows-and-gaming/
│   ├── 05-system-maintenance/
│   ├── 06-package-management/
│   ├── 07-terminal-and-cli/
│   ├── 08-tiling-and-desktop/
│   └── 09-workflows-and-tricks/
```

## 📄 License
MIT
