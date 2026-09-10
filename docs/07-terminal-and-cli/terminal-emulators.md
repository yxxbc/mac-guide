# 现代 GPU 加速终端选型与配置

终端是开发者停留时间最长的界面。传统的 macOS Terminal.app 缺乏现代渲染支持；而大家熟悉的 iTerm2 虽然功能全面，但在高分辨率 Retina 屏幕与大量文本滚动时存在明显的 CPU 占用与帧率卡顿。

现代极客终端的核心标准是：**GPU 硬件加速（Metal/OpenGL）、原生高刷 120Hz、现代图像协议（Kitty Graphics Protocol）与轻量化资源占用**。

---

## 1. 终端性能梯队与选型对比

| 终端 | 渲染架构 | 内存开销 | 核心卖点 | 推荐指数 |
| :--- | :--- | :--- | :--- | :--- |
| **Ghostty** | Metal (Zig 原生) | 极低 (~40MB) | 原生 macOS 界面质感、开箱即用、性能天花板、完美支持 Kitty 图像协议 | ★★★★★ (最推荐) |
| **Kitty** | OpenGL (C + Python) | 低 (~60MB) | 极高扩展性、原生 Kitty 图像协议首发、强大的多窗与脚本控制 | ★★★★☆ |
| **WezTerm** | WebGPU (Rust) | 中 (~100MB) | Lua 语法深度定制、跨平台一致性强、内置多路复用 Multiplexer | ★★★★☆ |
| **iTerm2** | 传统 CPU / 金属模拟 | 较高 (200MB+) | 老牌成熟，但滚动大日志时高耗电、UI 略有年代感 | ★★★☆☆ |

---

## 2. 首选推荐：Ghostty 极速配置

由 Mitchell Hashimoto（HashiCorp 创始人）打造的 Ghostty，结合了 Zig 的极致底层性能与 macOS 原生 Metal 图形加速，兼具纯正的 macOS 视觉美学与最顶级的吞吐吞吐量。

### 2.1 安装
```bash
brew install --cask ghostty
```

### 2.2 核心配置文件模板
Ghostty 配置文件路径位于 `~/Library/Application Support/com.mitchellh.ghostty/config`：

```ini
# 字体与排版
font-family = "JetBrainsMono Nerd Font"
font-size = 14
font-thicken = true

# 主题与外观
theme = "catppuccin-mocha"
background-opacity = 0.92
background-blur-radius = 20

# 窗口与装饰
window-padding-x = 12
window-padding-y = 12
macos-titlebar-style = transparent
window-theme = dark

# 性能与滚动
scrollback-limit = 100000
cursor-style = block
cursor-style-blink = false

# 按键与修饰键处理（让 Option 键表现为真正的 Alt）
macos-option-as-alt = true
```

---

## 3. 极客首选备选：Kitty 进阶配置

如果你需要最彻底的终端图像渲染能力与高度自定义的快捷键，Kitty 是久经考验的神器。

### 3.1 安装
```bash
brew install --cask kitty
```

### 3.2 核心配置文件模板
配置文件路径位于 `~/.config/kitty/kitty.conf`：

```ini
# 字体设置
font_family      JetBrainsMono Nerd Font
bold_font        auto
italic_font      auto
font_size        14.0

# 窗口内边距与模糊
window_padding_width 12
background_opacity 0.90
background_blur 24

# 隐藏原生难看的标题栏
hide_window_decorations titlebar-only

# 禁用蜂鸣器报警
enable_audio_bell no

# 现代平滑滚动
wheel_scroll_multiplier 3.0

# 开启 Option 键作为 Alt 发送
macos_option_as_alt yes

# 默认配色方案（如 Tokyo Night 或 Catppuccin）
include current-theme.conf
```

---

## 4. 必备基础设施：Nerd Fonts 安装

为了在终端、Shell 提示符与 CLI 工具（如 `eza`、`fastfetch`、`starship`）中正常显示各种现代图标（Git 分支、语言图标、文件夹指示器），必须安装打了补丁的 Nerd Fonts：

```bash
# 推荐安装两款排版最舒适的开源等宽字体
brew install --cask font-jetbrains-mono-nerd-font
brew install --cask font-fira-code-nerd-font
```
在终端首选项中将字体名称指定为 `JetBrainsMono Nerd Font` 即可拥有完美的图标排版体验。
