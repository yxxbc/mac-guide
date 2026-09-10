# 现代 CLI 全家桶替代表

在 Unix 和 Linux 诞生数十年后的今天，大多数默认预装的 coreutils 工具（如 `ls`、`cat`、`find`、`grep`）仍然停留在单线程、无彩色、无 Git 感知、语法生涩的旧时代。

现代开源社区（尤其是 Rust 社区）将这些经典工具进行了彻底的现代化重构。

---

## 1. 经典工具 vs 现代神器对照表

| 原生工具 | 现代替代品 | 语言 | 核心进化点 |
| :--- | :--- | :--- | :--- |
| `ls` | **`eza`** | Rust | 图标渲染、原生 Git 修改状态标注、文件大小彩色分级、树状模式 |
| `cd` | **`zoxide`** | Rust | 基于使用频次权重（Frecency）的模糊跨目录秒跳 |
| `cat` | **`bat`** | Rust | 代码语法高亮、行号、Git 新增/删除修改标记、自动分页 |
| `grep` | **`ripgrep (rg)`** | Rust | 多线程极速递归搜索、原生遵循 `.gitignore`、正则极快 |
| `find` | **`fd`** | Rust | 直观语法（无需 `-name`）、自动忽略隐藏文件与 `.git` |
| `git diff` | **`delta`** | Rust | 语法高亮、语法级单行内改动对比、支持双列分屏展示 |
| `du` | **`dust`** | Rust | 树状可视化磁盘占用排查，秒级揪出体积毒瘤 |
| `top` | **`btop`** | C++ | 酷炫现代的 CPU / GPU / 内存 / 磁盘 / 网络实时监控仪表盘 |
| `man` | **`tldr`** | Rust | 剔除晦涩手册废话，仅展示命令最常用的 5 个黄金示例 |
| 交互筛选 | **`fzf`** | Go | 通用流式模糊搜索利器，赋能命令历史与文件检索 |

---

## 2. 一键安装现代全家桶

```bash
brew install eza zoxide bat ripgrep fd git-delta dust btop tldr fzf
```

---

## 3. Shell 别名与最佳集成配置

将以下别名与集成指令追加到你的 `~/.zshrc`：

```zsh
# --- 1. eza (现代 ls 替代) ---
if command -v eza >/dev/null 2>&1; then
  alias ls="eza --icons"
  alias l="eza -lh --icons --git"
  alias la="eza -lha --icons --git"
  alias lt="eza --tree --level=2 --icons"
fi

# --- 2. bat (现代 cat 替代) ---
if command -v bat >/dev/null 2>&1; then
  alias cat="bat --paging=never"
  export PAGER="bat"
  export BAT_THEME="TwoDark"
fi

# --- 3. zoxide (智能 cd 跳转) ---
if command -v zoxide >/dev/null 2>&1; then
  eval "$(zoxide init zsh)"
  alias cd="z"
fi

# --- 4. fzf 快捷键增强 (Ctrl+R 查历史，Ctrl+T 查文件) ---
if command -v fzf >/dev/null 2>&1; then
  source <(fzf --zsh)
fi
```

---

## 4. Git 深度升级：配置 Delta 语法级 Diff

传统的 `git diff` 只能显示大段黑白的红绿行增删。配置 `delta` 后，不仅有完整的代码高亮，还能精准标注出**行内究竟修改了哪几个单词**：

运行以下 Git 全局配置：

```bash
# 设置 delta 为 Git 默认的分页比较器
git config --global core.pager "delta"
git config --global interactive.diffFilter "delta --color-only"

# 配置 delta 视觉特性
git config --global delta.navigate true          # 支持使用 n/N 在不同差异之间跳转
git config --global delta.light false            # 深色终端主题
git config --global delta.side-by-side true      # 开启左右双列对比视图
git config --global delta.line-numbers true      # 显示行号
```

完成上述配置后，无论是在日常开发、代码审查还是终端排错中，你都将拥有一套反应极其灵敏、视觉信息密度极高的现代化工作站环境。
