# 现代运行时管理神器：mise

在过去，很多开发者的 `~/.zshrc` 往往是这样的“灾难现场”：
- 装了 `nvm`（每次打开终端卡顿 300ms 读取脚本）；
- 装了 `pyenv`（臃肿的 shims 重定向）；
- 装了 `rbenv`、`gvm`、`rustup`，各自有一套完全不同的语法和缓存路径。

**2026 年的现代 macOS 开发标准是：全面拥抱 `mise` (原名 rtx)。**

---

## 1. 为什么坚决弃用各类 `*env`？

1. **极致性能**：`mise` 使用 Rust 编写，其激活钩子耗时在亚毫秒级（< 1ms），彻底消灭每次新开终端时的卡顿等待；
2. **多语言大一统**：用一套统一的语法同时管理 Node.js、Python、Go、Java、Rust、Deno、Bun、Terraform 等百余种语言与工具链；
3. **完美向下兼容**：自动识别项目原有的 `.nvmrc`、`.node-version`、`.python-version`、`.tool-versions`；
4. **内置环境变量与任务流**：直接替代 `direnv`，进入目录自动注入环境变量。

---

## 2. 安装与 Shell 极速激活

### 2.1 安装
```bash
brew install mise
```

### 2.2 Shell 注入
将激活语句写入你的 `~/.zshrc`（建议放在文件末尾）：

```bash
# 极速激活 mise 环境
eval "$(mise activate zsh)"
```

执行 `source ~/.zshrc` 即可无感生效。

---

## 3. 日常核心操作指引

### 3.1 全局默认环境安装
安装你日常开发最常用的全局基准版本：

```bash
# 安装并设为全局默认版本
mise use --global node@lts
mise use --global python@3.12
mise use --global go@latest

# 查看当前已激活的所有语言及版本
mise ls
```

### 3.2 项目级多版本无缝隔离
进入任意项目目录，为当前项目指定特定的版本：

```bash
cd ~/Projects/my-legacy-app

# 声明当前项目使用 Node 18
mise use node@18

# 此时目录下会自动生成一个轻量级的 mise.toml
cat mise.toml
# [tools]
# node = "18"
```
当你退出该目录时，系统自动切回全局 Node LTS；一旦 `cd` 进来，终端瞬间秒切至 Node 18，无需执行任何命令。

### 3.3 替代 direnv：项目级环境变量管理
在项目的 `mise.toml` 中，你可以直接声明该项目专属的环境变量：

```toml
[tools]
node = "22"
python = "3.12"

[env]
NODE_ENV = "development"
API_ENDPOINT = "http://127.0.0.1:8080"
```
只要你的终端位于该项目内，上述环境变量就会自动注入，离开目录自动清除，再也不用手动 `export`。

---

## 4. 常见问题与排查

- **Q: Python 安装提示缺少编译依赖？**
  - 在 macOS 上编译 Python 源码时，通常需要系统头文件。推荐预先通过 Homebrew 安装基础依赖库：
    ```bash
    brew install openssl readline sqlite3 xz zlib tcl-tk
    ```
- **Q: VS Code / 终端找不到 mise 安装的二进制？**
  - 如果 GUI 应用无法识别环境变量，在终端执行 `which mise` 确认路径；mise 默认会在 `~/.local/share/mise/shims` 下生成干净的链接，确保 `~/.local/share/mise/shims` 在你的 PATH 路径中。
