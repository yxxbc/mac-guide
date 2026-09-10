# 窗口活动边框 JankyBorders 与视觉增强

在平铺窗口（Tiling WM）环境下，屏幕上通常同时并排铺满 2 到 4 个窗口（如左侧 Neovim、右侧终端、下方浏览器）。
此时 macOS 原生的一大软肋暴露无遗：**各个窗口的外观过于雷同，你很难一眼辨别当前键盘输入焦点究竟落在哪个窗口上**。

在 Linux Hyprland / i3 / Niri 社区中，解决这个问题的标准答案是**活动高亮边框**。在 macOS 上，我们使用 **JankyBorders**。

---

## 1. JankyBorders：极轻量活动焦点高亮

由 FelixKratz 开发的 **JankyBorders** 是一款极简、高性能的原生 Metal 边框渲染守护进程。

### 1.1 核心特性
- **0 安全要求**：完全不需要关闭 SIP；
- **极低开销**：常驻内存仅几 MB，CPU 占用几乎为 0；
- **智能圆角追踪**：完美贴合 macOS 窗口的微圆角；
- **焦点指示**：当前激活窗口包裹鲜艳彩色高亮边框，失焦窗口半透明或隐藏。

### 1.2 安装与启动
```bash
# 添加官方 tap 并安装
brew tap FelixKratz/formulae
brew install borders

# 作为系统服务常驻后台运行
brew services start borders
```

---

## 2. 边框美化调优参数

JankyBorders 支持直接通过配置文件或启动参数定义颜色与样式。配置文件位于 `~/.config/borders/bordersrc`：

```bash
mkdir -p ~/.config/borders
cat << 'EOF_BORDERS' > ~/.config/borders/bordersrc
#!/bin/bash

# JankyBorders 推荐配色（Tokyo Night 蓝紫色系）
options=(
  style=round
  width=4.0
  hidpi=on
  active_color=0xff7aa2f7      # 激活窗口：亮青蓝色
  inactive_color=0x33414868    # 非激活窗口：低调暗灰半透明
  background_color=0x00000000  # 背景透明
)

borders "${options[@]}"
EOF_BORDERS

# 赋予可执行权限
chmod +x ~/.config/borders/bordersrc

# 重启服务使配置生效
brew services restart borders
```

效果：一旦切换焦点，4px 的亮青色高亮框瞬间跟随光标跳跃，极客与打字沉浸感瞬间拉满。

---

## 3. 状态栏进阶思路：Sketchybar 的取舍

许多极客热衷于用 **Sketchybar** 完全替换 macOS 顶部的原生菜单栏，实现类似 Waybar / Polybar 的全定制状态展示（CPU 温度、工作区编号、Spotify 歌词等）。

### 务实的工程建议：
- **如果你热爱极致折腾**：Sketchybar 是目前 macOS 上最强大的自定义状态栏框架（支持 Shell 与 Lua 脚本驱动，同样无需关闭 SIP）；
- **如果你追求极简稳定与续航**：**建议直接保留 macOS 原生顶部菜单栏**。原生菜单栏在处理 Control Center、系统托盘图标（Wi-Fi、电池、蓝牙、第三方后台常驻）时拥有最完美的兼容性与零维护成本。

保持 **AeroSpace（平铺调度） + JankyBorders（焦点高亮） + 原生菜单栏**，是兼顾生产力、美学与系统稳定性的黄金平衡点。
