# 免关 SIP 平铺利器：AeroSpace

从 Linux（尤其是 i3wm / Sway / Hyprland）转到 macOS 的用户，最大的心理落差莫过于窗口管理：
- macOS 原生的“调度中心（Mission Control）”切换桌面动画漫长拖沓；
- 窗口堆叠重叠、遮挡找寻极度浪费时间；
- 过去老牌的平铺工具 **Yabai** 如果不关闭 SIP（系统完整性保护），功能大幅受限且桌面切换闪烁。

**2024 年横空出世的 AeroSpace 彻底终结了这个困局：它是一款受 i3 启发的树形平铺窗口管理器，且 100% 不需要关闭 SIP！**

---

## 1. 为什么 AeroSpace 是现代 Mac 平铺唯一解？

1. **零安全妥协**：完全基于 macOS 官方的 Accessibility API 构建，**绝对无需关闭 SIP**；
2. **真正的树形平铺（Tree-based Layout）**：与 i3 一致的节点拆分逻辑，支持任意深度的水平分割（h-split）、垂直分割（v-split）和折叠手风琴模式（accordion）；
3. **彻底消灭桌面切换动画**：AeroSpace 使用了自己的虚拟工作区逻辑（Virtual Workspaces），从工作区 1 切到工作区 2 是**帧级毫秒瞬切**，没有任何 macOS 愚蠢的滑动延迟；
4. **纯粹简单的 TOML 配置**：配置极度直观，支持热重载。

---

## 2. 安装与权限授予

### 2.1 安装
通过官方 Homebrew Tap 安装：

```bash
brew install --cask nikitabobko/tap/aerospace
```

### 2.2 授权与前置设置
1. 打开 AeroSpace，系统会提示授予 **辅助功能 (Accessibility)** 权限；
2. **必须关闭系统设置中的“自动重新排列操作空间”**：
   - 打开 `系统设置` -> `桌面与程序坞`；
   - 找到 **基于最近使用情况自动重新排列操作空间**，**务必将其关闭**（否则 macOS 会自己打乱虚拟桌面顺序）。

---

## 3. 核心配置文件 (`~/.aerospace.toml`)

在主目录创建 `~/.aerospace.toml`，以下是融合了 Vim 键位与 i3 习惯的精选生产力配置：

```toml
# 开启启动时自动定位
start-at-login = true

# 布局留白与缝隙（Gaps）
[gaps]
inner.horizontal = 8
inner.vertical   = 8
outer.left       = 8
outer.bottom     = 8
outer.top        = 8
outer.right      = 8

# 主修饰键定义为 Alt (Option)
[mode.main.binding]

# --- 1. Vim 方向焦点移动 (Alt + H/J/K/L) ---
alt-h = 'focus left'
alt-j = 'focus down'
alt-k = 'focus up'
alt-l = 'focus right'

# --- 2. 移动窗口位置 (Alt + Shift + H/J/K/L) ---
alt-shift-h = 'move left'
alt-shift-j = 'move down'
alt-shift-k = 'move up'
alt-shift-l = 'move right'

# --- 3. 布局与分屏方向 ---
alt-slash = 'layout tiles horizontal vertical' # 水平/垂直快速翻转
alt-comma = 'layout accordion horizontal vertical' # 手风琴模式

# --- 4. 全屏与浮动切换 ---
alt-f = 'fullscreen'
alt-shift-space = 'layout floating tiling' # 在平铺与浮动间切换

# --- 5. 虚拟工作区切换 (Alt + 1..9) ---
alt-1 = 'workspace 1'
alt-2 = 'workspace 2'
alt-3 = 'workspace 3'
alt-4 = 'workspace 4'
alt-5 = 'workspace 5'

# --- 6. 将当前窗口移动到对应工作区 (Alt + Shift + 1..9) ---
alt-shift-1 = 'move-node-to-workspace 1'
alt-shift-2 = 'move-node-to-workspace 2'
alt-shift-3 = 'move-node-to-workspace 3'
alt-shift-4 = 'move-node-to-workspace 4'
alt-shift-5 = 'move-node-to-workspace 5'

# --- 7. 系统窗口自动规则（防止某些小弹窗被强行平铺） ---
[[on-window-detected]]
if.app-id = 'com.apple.systempreferences'
run = 'layout floating'

[[on-window-detected]]
if.app-id = 'com.apple.finder'
run = 'layout floating'
```

保存文件后，AeroSpace 会自动实时热重载配置。按 `Alt + H/J/K/L` 即可感受零延迟的键盘流窗口跳转。
