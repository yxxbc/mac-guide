# Shell 与 Starship 极速提示符

在 macOS 上，系统默认的 Shell 从 Catalina 开始就已经是 Zsh。然而，许多开发者上手就照搬臃肿的 `Oh-My-Zsh` 默认大礼包，导致每次打开终端窗口都要忍受 300ms~1s 的卡顿白屏。

本章的目标是构建一个**启动耗时 < 30ms、外观极简优雅、拥有强大历史补全与语法高亮**的现代化 Shell 环境。

---

## 1. 为什么弃用臃肿的 Oh-My-Zsh 默认全家桶？

Oh-My-Zsh 确实方便，但它存在明显缺陷：
1. **启动加载过慢**：默认串行加载数十个无用函数与老旧脚本；
2. **主题普遍性能堪忧**：在大型 Git 仓库（如 monorepo）中，每次敲回车都会触发巨量同步 Git 状态扫描，导致回车严重卡顿。

**极客方案：Zsh + Homebrew 原生插件 + Rust 驱动的 Starship 异步提示符。**

---

## 2. 现代极速提示符：Starship

Starship 是用 Rust 编写的跨 Shell 提示符，拥有极低的渲染延迟和出色的模块化设计。

### 2.1 安装
```bash
brew install starship
```

### 2.2 Shell 注入
在你的 `~/.zshrc` 中添加：

```zsh
# 激活 Starship 提示符
eval "$(starship init zsh)"
```

### 2.3 极简风格配置文件 (`~/.config/starship.toml`)
创建目录与配置文件：

```bash
mkdir -p ~/.config
cat << 'CONFIG' > ~/.config/starship.toml
# 设置单行显示，减少垂直屏幕空间占用
add_newline = false

# 自定义组件展示顺序
format = """
$directory\
$git_branch\
$git_status\
$nodejs\
$rust\
$golang\
$python\
$cmd_duration\
$line_break\
$character"""

[directory]
style = "bold cyan"
truncation_length = 4
truncate_to_repo = true

[git_branch]
symbol = " "
style = "bold purple"

[git_status]
style = "bold red"

[character]
success_symbol = "[❯](bold green)"
error_symbol = "[❯](bold red)"

[cmd_duration]
min_time = 2_000
style = "yellow"
format = "took [$duration]($style) "
CONFIG
```

---

## 3. 必不可少的两大核心生产力插件

完全不需要安装复杂的插件管理器，直接通过 Homebrew 安装最核心的两个插件，既纯净又秒速：

```bash
# 安装语法高亮与历史自动补全插件
brew install zsh-autosuggestions zsh-syntax-highlighting
```

在 `~/.zshrc` 中按如下顺序加载（**注意：语法高亮必须放在最后一行**）：

```zsh
# 引入 Homebrew 安装的插件
source "$(brew --prefix)/share/zsh-autosuggestions/zsh-autosuggestions.zsh"
source "$(brew --prefix)/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh"

# 配置历史建议颜色为沉稳的灰色
export ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=244'
```

---

## 4. 极致精简且极速的 `~/.zshrc` 完整样板

一个标准的现代极客 `.zshrc` 结构应该清晰分明：

```zsh
# --- 1. 历史记录优化 ---
HISTFILE="$HOME/.zsh_history"
HISTSIZE=50000
SAVEHIST=50000
setopt HIST_IGNORE_DUPS          # 忽略连续重复记录
setopt HIST_EXPIRE_DUPS_FIRST    # 达到上限先淘汰旧重复
setopt SHARE_HISTORY             # 多终端共享历史

# --- 2. Homebrew 环境加载 ---
if [[ -f "/opt/homebrew/bin/brew" ]]; then
  eval "$(/opt/homebrew/bin/brew shellenv)"
fi

# --- 3. 运行时 mise 加载 ---
if command -v mise >/dev/null 2>&1; then
  eval "$(mise activate zsh)"
fi

# --- 4. Starship 提示符 ---
if command -v starship >/dev/null 2>&1; then
  eval "$(starship init zsh)"
fi

# --- 5. 插件加载 (必须最后) ---
if [[ -f "$(brew --prefix 2>/dev/null)/share/zsh-autosuggestions/zsh-autosuggestions.zsh" ]]; then
  source "$(brew --prefix)/share/zsh-autosuggestions/zsh-autosuggestions.zsh"
fi
if [[ -f "$(brew --prefix 2>/dev/null)/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" ]]; then
  source "$(brew --prefix)/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh"
fi
```
测试加载速度：在终端中运行 `time zsh -i -c exit`，耗时通常仅在 `0.02s ~ 0.04s` 之间，随开随走，毫无延迟。
