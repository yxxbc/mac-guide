# 神奇的空格键：Quick Look 预览增强全家桶

在所有现代操作系统中，macOS 拥有体验最震撼的文件预览特性：**快速查看 (Quick Look)**。

在“访达 (Finder)”中选中任意文件，**轻敲一下空格键**，你就能瞬间查看内容；再按一下空格即可关闭。这比任何双击等待庞大应用冷启动（如 Office 或大型 IDE）都要快十倍以上。

然而，系统默认的 Quick Look 能力有限：它无法高亮代码语法、无法渲染 Markdown 排版、无法解剖压缩包，也不能展开 JSON。

通过安装一套轻量的开源插件，我们可以让空格键进化为**全能秒级查看中枢**。

---

## 1. 必装的 Quick Look 开源插件全家桶

| 插件名称 | 解决的核心痛点 | 适用文件类型 |
| :--- | :--- | :--- |
| **`syntax-highlight`** | 系统默认代码是一片惨白纯文本；该插件提供绚丽的**语法高亮、行号与代码主题** | `.js`, `.ts`, `.py`, `.rs`, `.go`, `.cpp`, `.sh`, `.yaml` 等数百种源码 |
| **`qlmarkdown`** | 默认看 Markdown 全是杂乱符号；该插件将其**渲染为排版优美的格式化网页视图** | `.md`, `.markdown` |
| **`quicklook-json`** | 默认长 JSON 挤成一团；该插件提供**彩色语法高亮与层级节点折叠** | `.json` |
| **`qlstephen`** | 查看没有文件扩展名的纯文本文件（系统默认会提示无法预览） | `Dockerfile`, `Makefile`, `LICENSE`, `.gitignore` |
| **`qlimagesize`** | 在预览图片时，直接在顶部标题栏醒目显示**分辨率宽高（如 3840×2160）与文件精确大小** | `.png`, `.jpg`, `.webp`, `.svg`, `.gif` |

---

## 2. 一键批量安装指令

使用 Homebrew 可以一行命令装配完毕：

```bash
brew install --cask syntax-highlight qlmarkdown quicklook-json qlstephen qlimagesize
```

---

## 3. 激活与缓存刷新机制

在较新的 macOS（Sonoma / Sequoia）中，系统为了安全加固，三方 Quick Look 插件安装后需要刷新系统生成器守护进程才能生效。

在终端中执行以下命令强制刷新：

```bash
# 刷新 Quick Look 生成器列表与磁盘缓存
qlmanage -r
qlmanage -r cache

# 重启 Finder 进程
killall Finder
```

> [!TIP]
> 如果首次按下空格预览代码时系统弹出“无法打开，因为无法验证开发者”，请进入 `系统设置` -> `隐私与安全性` -> 点击底部的 **「仍要打开」** 授予信任即可。

现在回到 Finder，选中任意一个 `.md`、`.json` 或源码文件，按下空格键，享受丝滑无比的代码高亮与富文本预览！
