# defaults 命令行深度配置与效率优化

macOS 系统设置的图形界面（GUI）仅仅暴露了冰山一角。底层的大量子系统、动画曲线、Finder 行为和交互延迟都保存在 `~/Library/Preferences` 的 `.plist`（属性列表）文件中。

网络上常常流传着各种“一键优化脚本”，但盲目运行黑盒脚本往往会导致意外的配置冲突，甚至在报错时无从排查。**本指南坚决不主张盲目的一键脚本，而是将每一条配置的原理、作用、参数含义以及“反悔还原”的方法完整呈现，教你真正理解并亲手配置出一台最契合个人习惯的极速 macOS。**

---

## 1. 什么是 `defaults` 命令？（底层原理解析）

在 macOS 中，每个应用和系统组件都有一个“域名（Domain）”，比如：
- `com.apple.dock`：负责底部 Dock 栏的程序；
- `com.apple.finder`：负责文件管理访达的程序；
- `NSGlobalDomain`：全局系统配置域（对所有应用生效）。

`defaults` 就是 macOS 自带的命令行管理工具，用于读写这些底层参数。它的核心语法极其简单直观：
```bash
# 读取某项配置的当前值
defaults read <域名> <键名>

# 写入（修改）某项配置
defaults write <域名> <键名> <数据类型> <新数值>

# 删除（恢复系统默认初始状态）
defaults delete <域名> <键名>
```

---

## 2. 核心优化项深度拆解（附带还原反悔药）

### 2.1 消除键盘打字与光标连发延迟
在系统设置中，即使把“按键重复速度”拉到最右侧，在代码编辑（如 Vim/IDE）中长按 `h/j/k/l` 移动光标依然会感觉有一丝黏滞。

#### 推荐配置
```bash
# 1. 延迟到重复（按下按键后，等待多久开始连续输入）：默认最低约 15，推荐设置为 10
defaults write NSGlobalDomain InitialKeyRepeat -int 10

# 2. 重复速率（连续输入时字符弹出的频率）：默认最低 2，推荐设置为 1（最高极速）
defaults write NSGlobalDomain KeyRepeat -int 1

# 3. 禁用字母长按弹出重音符号（许多初学者按住字母不连发，而是弹出 é/è 候选框，此命令彻底恢复连续打字）
defaults write NSGlobalDomain ApplePressAndHoldEnabled -bool false
```
- **反悔药（恢复原厂默认）**：
  ```bash
  defaults delete NSGlobalDomain InitialKeyRepeat
  defaults delete NSGlobalDomain KeyRepeat
  defaults delete NSGlobalDomain ApplePressAndHoldEnabled
  ```

---

### 2.2 彻底消灭 Dock 栏弹出等待与动画拖沓
如果你喜欢“自动隐藏和显示 Dock”，苹果默认设计了约 0.5 秒的悬停防误触延迟，这导致鼠标移到底部时必须傻等半秒 Dock 才会慢悠悠升起。

#### 推荐配置
```bash
# 1. 开启 Dock 自动隐藏
defaults write com.apple.dock autohide -bool true

# 2. 将鼠标悬停触发延迟从 0.5 秒直接改为 0 秒（瞬发弹出）
defaults write com.apple.dock autohide-delay -float 0

# 3. 将升起展开的动画耗时从 0.7 秒缩短至 0.15 秒（干脆利落）
defaults write com.apple.dock autohide-time-modifier -float 0.15

# 4. 立即重启 Dock 进程使配置生效
killall Dock
```
- **反悔药（恢复原厂默认）**：
  ```bash
  defaults delete com.apple.dock autohide-delay
  defaults delete com.apple.dock autohide-time-modifier
  killall Dock
  ```

---

### 2.3 访达 (Finder) 深度净化：信息全面呈现
默认状态下，访达隐藏了扩展名与隐藏文件，这对于日常开发和管理系统极其不便。

#### 推荐配置
```bash
# 1. 强制始终显示所有文件的真实扩展名（如 .tar.gz、.sh、.ts）
defaults write NSGlobalDomain AppleShowAllExtensions -bool true

# 2. 默认显示隐藏文件与隐藏文件夹（无需每次手动按 Cmd + Shift + .）
defaults write com.apple.finder AppleShowAllFiles -bool true

# 3. 始终显示窗口底部的层级路径栏（Pathbar）与磁盘容量状态栏
defaults write com.apple.finder ShowPathbar -bool true
defaults write com.apple.finder ShowStatusBar -bool true

# 4. 搜索文件时，默认仅在“当前目录”内搜索（而非默认全盘全局搜索）
defaults write com.apple.finder FXDefaultSearchScope -string "SCcf"

# 5. 彻底禁止在网络驱动器（NAS / SMB）上生成 .DS_Store 垃圾文件
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool true

# 6. 彻底禁止在 U 盘和移动硬盘上生成 .DS_Store
defaults write com.apple.desktopservices DSDontWriteUSBStores -bool true

# 7. 重启访达生效
killall Finder
```
- **反悔药（恢复原厂默认）**：
  ```bash
  defaults delete NSGlobalDomain AppleShowAllExtensions
  defaults delete com.apple.finder AppleShowAllFiles
  defaults delete com.apple.finder FXDefaultSearchScope
  killall Finder
  ```

---

### 2.4 原生截图体验升级：规范目录与去除黑阴影
默认用 `Cmd + Shift + 4` 截单个窗口时，图片周围会附带很大一圈半透明的黑色阴影，插入文档或发给他人时往往很占版面。并且截图默认直接堆在桌面上，久而久之桌面一片杂乱。

#### 推荐配置
```bash
# 1. 在用户图片目录下创建专门的 Screenshots 截图目录
mkdir -p "${HOME}/Pictures/Screenshots"

# 2. 让所有截图自动保存到新建的截图目录，保持桌面永远清爽
defaults write com.apple.screencapture location -string "${HOME}/Pictures/Screenshots"

# 3. 去除单窗口截图周围膨胀的黑色投影阴影，边缘干净干脆
defaults write com.apple.screencapture disable-shadow -bool true

# 4. 重启系统 UI 服务生效
killall SystemUIServer
```
- **反悔药（恢复原厂默认）**：
  ```bash
  defaults delete com.apple.screencapture location
  defaults delete com.apple.screencapture disable-shadow
  killall SystemUIServer
  ```

---

## 3. 编写自己的配置脚本（教你学会配置）

当你逐条测试了上面的命令，确认了哪些配置真正符合自己的工作流之后，你可以把心仪的命令组合成一个属于自己的管理脚本。

### 脚本结构拆解教学 (`my-macos-config.sh`)

```bash
#!/usr/bin/env bash
# ==============================================================================
# 脚本名称: my-macos-config.sh
# 作用说明: 个人定制的 macOS defaults 偏好配置脚本
# 编写原则: 每一行都有明确注释，随时可删改、可复原
# ==============================================================================

# 发生错误时立即停止执行，避免错误级联
set -euo pipefail

echo "==> 开始配置个人专属 macOS 选项..."

# 1. 关闭系统设置窗口，避免图形界面在修改配置时发生覆盖写入
osascript -e 'tell application "System Settings" to quit' 2>/dev/null || true

# 2. 应用你亲自挑选并认可的配置
echo "--> 优化按键重复速率..."
defaults write NSGlobalDomain InitialKeyRepeat -int 10
defaults write NSGlobalDomain KeyRepeat -int 1
defaults write NSGlobalDomain ApplePressAndHoldEnabled -bool false

echo "--> 优化 Dock 响应速度..."
defaults write com.apple.dock autohide -bool true
defaults write com.apple.dock autohide-delay -float 0
defaults write com.apple.dock autohide-time-modifier -float 0.15

echo "--> 优化 Finder 文件浏览与隐藏文件..."
defaults write NSGlobalDomain AppleShowAllExtensions -bool true
defaults write com.apple.finder AppleShowAllFiles -bool true
defaults write com.apple.finder ShowPathbar -bool true
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool true
defaults write com.apple.desktopservices DSDontWriteUSBStores -bool true

echo "--> 优化截图保存路径..."
mkdir -p "${HOME}/Pictures/Screenshots"
defaults write com.apple.screencapture location -string "${HOME}/Pictures/Screenshots"
defaults write com.apple.screencapture disable-shadow -bool true

# 3. 优雅重启相关界面进程
echo "--> 重启 Finder、Dock 与状态栏使配置生效..."
for app in "Dock" "Finder" "SystemUIServer"; do
  killall "${app}" >/dev/null 2>&1 || true
done

echo "==> 全部配置完成！按键重复相关参数注销重新登录后全局生效。"
```

### 如何保存与运行
1. 打开终端，使用文本编辑器保存上述脚本为 `my-macos-config.sh`；
2. 授予可执行权限：
   ```bash
   chmod +x my-macos-config.sh
   ```
3. 执行脚本：
   ```bash
   ./my-macos-config.sh
   ```

通过这种方式，你清楚地知道自己修改了系统的哪一颗螺丝钉，既获得了极致效率，又拥有完全的系统掌控感与安全性。
