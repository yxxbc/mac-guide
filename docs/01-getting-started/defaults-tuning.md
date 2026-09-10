# defaults 命令行深度调优

macOS 系统设置的图形界面（GUI）仅仅暴露了冰山一角。底层的大量子系统、动画曲线、Finder 行为和交互延迟都保存在 `~/Library/Preferences` 的 plist 文件中。

通过 `defaults` 命令，我们可以像在 Linux 中修改配置文件一样，把 macOS 调教成一台响应极速、毫无拖泥带水的开发机器。

---

## 核心调优清单解析

### 1. 消除一切无意义的交互与动画延迟

苹果默认的动画虽然赏心悦目，但在高强度工作流中会带来明显的“黏滞感”。

#### 1.1 键盘极速连发（极客核心参数）
系统设置里键盘的“按键重复速度”和“延迟到重复”滑动条最大值依然偏慢。直接用命令行破除上限：

```bash
# 延迟到重复（默认最低 15，极客推荐 10-12）
defaults write NSGlobalDomain InitialKeyRepeat -int 10

# 重复速率（默认最低 2，极客推荐 1）
defaults write NSGlobalDomain KeyRepeat -int 1
```
*注：该设置在重新登录或重启后全局生效，在 Vim/Neovim 中移动光标将丝滑如飞。*

#### 1.2 Dock 栏秒速弹出与无延迟
如果你习惯自动隐藏 Dock，苹果默认有大约 0.5 秒的悬停延迟，极其折磨：

```bash
# 消除鼠标移到屏幕边缘触发 Dock 弹出的延迟（默认 0.5 秒）
defaults write com.apple.dock autohide-delay -float 0

# 加速 Dock 弹出收回的动画时间（默认 0.7 秒，改成 0.15 秒）
defaults write com.apple.dock autohide-time-modifier -float 0.15

# （可选）关闭应用启动时 Dock 图标跳动动画
defaults write com.apple.dock launchanim -bool false
```

---

### 2. Finder 极客化深度净化

默认的 Finder 隐藏了大量对开发者极其关键的信息（扩展名、隐藏文件、路径）。

```bash
# 永远显示所有文件的扩展名（防被 .tar.gz 或隐藏伪装后缀欺骗）
defaults write NSGlobalDomain AppleShowAllExtensions -bool true

# 默认始终显示隐藏文件（无需每次按 Command + Shift + .）
defaults write com.apple.finder AppleShowAllFiles -bool true

# 始终显示底部路径栏（Pathbar）与状态栏（容量与项目数）
defaults write com.apple.finder ShowPathbar -bool true
defaults write com.apple.finder ShowStatusBar -bool true

# 搜索时默认限定为当前目录（而不是默认全盘搜索这台 Mac）
defaults write com.apple.finder FXDefaultSearchScope -string "SCcf"

# 彻底禁止在网络磁盘（Samba/NFS）上生成烦人的 .DS_Store
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool true

# 彻底禁止在 USB 移动存储设备上生成 .DS_Store（防止插到 Linux/Windows 被嘲讽）
defaults write com.apple.desktopservices DSDontWriteUSBStores -bool true
```

---

### 3. 系统截图与窗口调优

```bash
# 创建专门的截图目录（避免桌面被满屏截图搞乱）
mkdir -p "${HOME}/Pictures/Screenshots"
defaults write com.apple.screencapture location -string "${HOME}/Pictures/Screenshots"

# 去除单窗口截图周围巨大的透明毛玻璃黑阴影（方便直接贴到文档和 PR 里）
defaults write com.apple.screencapture disable-shadow -bool true

# 截图默认保持高质量 PNG
defaults write com.apple.screencapture type -string "png"
```

---

## 一键自动化调优脚本 (`defaults.sh`)

将上述最佳实践整理为一个完整的 Shell 脚本，新机或换机时一键运行即可：

```bash
#!/usr/bin/env bash
# macOS 极客最佳 defaults 调优脚本

set -euo pipefail

echo "==> 正在应用 macOS 极客 defaults 优化..."

# 关闭可能受影响的设置窗口，防止冲突
osascript -e 'tell application "System Settings" to quit' 2>/dev/null || true

# --- 1. 键盘与输入 ---
echo "--> 配置按键重复速率与取消音标长按..."
defaults write NSGlobalDomain InitialKeyRepeat -int 10
defaults write NSGlobalDomain KeyRepeat -int 1
defaults write NSGlobalDomain ApplePressAndHoldEnabled -bool false

# --- 2. Dock 调优 ---
echo "--> 优化 Dock 动画与触发延迟..."
defaults write com.apple.dock autohide -bool true
defaults write com.apple.dock autohide-delay -float 0
defaults write com.apple.dock autohide-time-modifier -float 0.15
defaults write com.apple.dock launchanim -bool false

# --- 3. Finder 调优 ---
echo "--> 净化 Finder 显示与行为..."
defaults write NSGlobalDomain AppleShowAllExtensions -bool true
defaults write com.apple.finder AppleShowAllFiles -bool true
defaults write com.apple.finder ShowPathbar -bool true
defaults write com.apple.finder ShowStatusBar -bool true
defaults write com.apple.finder FXDefaultSearchScope -string "SCcf"
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool true
defaults write com.apple.desktopservices DSDontWriteUSBStores -bool true

# --- 4. 截图调优 ---
echo "--> 优化截图保存路径与阴影..."
mkdir -p "${HOME}/Pictures/Screenshots"
defaults write com.apple.screencapture location -string "${HOME}/Pictures/Screenshots"
defaults write com.apple.screencapture disable-shadow -bool true
defaults write com.apple.screencapture type -string "png"

# --- 5. 重启生效受影响的服务 ---
echo "--> 正在重启相关系统进程以使配置生效..."
for app in "Dock" "Finder" "SystemUIServer"; do
  killall "${app}" >/dev/null 2>&1 || true
done

echo "==> 优化完成！部分按键重复参数在重新登录或重启系统后彻底生效。"
```
