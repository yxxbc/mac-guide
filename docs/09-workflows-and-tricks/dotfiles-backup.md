# 声明式 Dotfiles 跨机同步：Chezmoi

打造了一套近乎完美的极客 macOS 环境后，最令人焦虑的事情只有一件：
**如果换了一台新电脑，或者系统重装，难道还要花两三天时间把这些配置重新手工敲一遍吗？**

传统的“软链接大法（GNU Stow）”在跨机器、跨用户名或管理敏感信息时极易破碎。现代终极解法是：**Chezmoi**。

---

## 1. 为什么选择 Chezmoi？

1. **绝对安全**：配置保存在独立的 Git 仓库中，只有当你明确运行 `apply` 时才会同步到用户主目录，杜绝手滑软链接把原始配置删掉；
2. **模板引擎（Go Template）**：同一套配置，自动根据当前电脑的主机名、屏幕分辨率或用户名生成不同配置；
3. **极简体验**：一条命令全自动在新机器上拉取、合并并应用配置。

---

## 2. 极速起步实战

### 2.1 安装
```bash
brew install chezmoi
```

### 2.2 本地初始化与纳入版本控制
```bash
# 初始化本地跟踪仓库
chezmoi init

# 纳管你的核心配置文件
chezmoi add ~/.zshrc
chezmoi add ~/.config/starship.toml
chezmoi add ~/.aerospace.toml
chezmoi add ~/.config/borders/bordersrc
chezmoi add ~/Brewfile

# 进入 Chezmoi 管理的本地 Git 仓库
chezmoi cd
```

此时你处于 `~/.local/share/chezmoi` 目录下，这就是一个纯粹的 Git 仓库。
关联到你的 GitHub 私有仓库并推送：

```bash
git remote add origin git@github.com:yourusername/dotfiles.git
git branch -M main
git add .
git commit -m "feat: initial modern mac dotfiles"
git push -u origin main
```

---

## 3. 日常维护工作流

当你需要修改配置时，推荐遵循 Chezmoi 工作流：

```bash
# 1. 优雅编辑被托管的文件（会自动调用你的 $EDITOR）
chezmoi edit ~/.zshrc

# 2. 查看当前修改与实际文件之间的 diff 差异
chezmoi diff

# 3. 将修改应用到系统主目录
chezmoi apply

# 4. 提交并同步到远端 GitHub
chezmoi cd
git commit -am "update: tune zsh aliases"
git push
```

---

## 4. 新机 5 分钟满血复活仪式

拿到一台全新的 Mac，你只需要完成以下两步：

```bash
# 第一步：安装 Homebrew 并拉取恢复所有 Dotfiles 配置
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install chezmoi
chezmoi init --apply https://github.com/yourusername/dotfiles.git

# 第二步：一键并行拉取并安装所有 CLI 与 GUI 软件
brew bundle --file=~/Brewfile
```

泡一杯咖啡，5 分钟后，这台新 Mac 的终端、快捷键、平铺窗口、字体、工具链便已与你的主力机分毫不差，真正达成**声明式、完全可复现的极客终极形态**。
