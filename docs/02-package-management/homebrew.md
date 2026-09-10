# Homebrew 现代化管理体系

在 macOS 生态中，Homebrew 是绝对的软件事实标准。但如果只是单纯 `brew install xxx`，很快系统就会充斥各种孤儿依赖、旧版本缓存，换机时也无从还原。

本章讲解如何用现代工程思维使用 Homebrew，实现**国内镜像极速更新**与**声明式（Declarative）环境同步**。

---

## 1. 安装与环境变量标准规范

在 Apple Silicon (M 系列芯片) 下，Homebrew 默认安装路径变更为 `/opt/homebrew`（旧 Intel 架构为 `/usr/local`）。

### 1.1 自动化安装
打开终端运行官方安装命令（如网络受限可先配置代理）：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 1.2 环境变量注入（关键）
安装完成后，必须将 Homebrew 的二进制目录加入环境变量。编辑 `~/.zprofile` 或 `~/.zshrc`：

```bash
# 判断系统架构并自动加载 Homebrew 环境
if [[ -f "/opt/homebrew/bin/brew" ]]; then
  eval "$(/opt/homebrew/bin/brew shellenv)"
elif [[ -f "/usr/local/bin/brew" ]]; then
  eval "$(/usr/local/bin/brew shellenv)"
fi
```

### 1.3 国内镜像源加速（清华源最佳配置）
将以下镜像源环境变量追加到 `~/.zshrc`：

```bash
export HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git"
export HOMEBREW_PIP_INDEX_URL="https://pypi.tuna.tsinghua.edu.cn/simple"
```

---

## 2. Cask：全面接管图形界面 (GUI) 软件

拒绝每次重装都去各个官网手动下载 `.dmg` 或 `.pkg` 并拖入废纸篓。使用 `brew install --cask` 统一管理。

### 2.1 常用高阶安装参数
```bash
# 安装应用
brew install --cask raycast

# 自动剥离 quarantine 隔离属性（防止安装后弹出“已损坏”拦截）
brew install --cask --no-quarantine visual-studio-code

# 彻底卸载应用及其残留的 Application Support 与 Caches
brew uninstall --zap --cask google-chrome
```

---

## 3. 声明式环境备份：`Brewfile` (Homebrew Bundle)

像前端的 `package.json` 或 Rust 的 `Cargo.toml` 一样，**你的整台 Mac 所需的全部软件也可以被一份文件完整定义**。

### 3.1 导出当前系统的软件清单
```bash
# 导出当前系统的软件清单（带注释说明，覆盖旧文件）
brew bundle dump --describe --force --file=~/Brewfile
```

生成的 `Brewfile` 结构极其优雅清晰：

```ruby
# CLI 核心工具
brew "ripgrep"
brew "eza"
brew "bat"
brew "zoxide"
brew "mise"
brew "fastfetch"

# GUI 图形软件
cask "ghostty"
cask "raycast"
cask "orbstack"
cask "aerospace"
cask "mos"
```

### 3.2 换机一键装机满血复活
新拿到一台 Mac，装好 Homebrew 后，仅需一行命令：

```bash
# 自动读取当前目录的 Brewfile 并全自动并行下载安装
brew bundle --file=~/Brewfile
```
不再需要手动搜索和重复下载，冲一杯咖啡的时间，所有开发环境和软件全部自动就绪。

---

## 4. 系统清洁与日常维护指令

```bash
# 1. 更新软件索引并升级所有包
brew update && brew upgrade

# 2. 自动移除已经没有其他包依赖的“孤儿包”
brew autoremove

# 3. 彻底清除所有过期的下载缓存包和旧版本（释放大量 SSD 空间）
brew cleanup -s

# 4. 系统健康度诊断（检查权限、环境与潜在冲突）
brew doctor
```
