# 终端 Rice 与 fastfetch 系统看板

对于追求美感与仪式感的极客而言，打开终端时展示系统硬件参数与定制化 Logo（俗称 Terminal Rice）是必不可少的环节。

随着老牌 Python 编写的 `neofetch` 正式退役，由 C 语言编写、拥有亚毫秒级执行速度的 **`fastfetch`** 已经成为跨平台标准。

---

## 1. 安装与硬件检测优势

在 Apple Silicon (M 系列芯片) 下，`fastfetch` 能极其精准地读取统一内存架构、GPU 核心数、电池健康度与充放电循环次数：

```bash
brew install fastfetch
```

直接运行 `fastfetch` 即可看到默认的极速输出。

---

## 2. 终端 Rice 常见痛点：图像爆框与协议割裂

在 macOS 终端中展示自定义图片时，开发者往往会遇到两大坑：

1. **图形协议混乱**：
   - Ghostty 与 Kitty 原生支持极速的 **Kitty Graphics Protocol**；
   - iTerm2 使用自家专有的 Inline Images Protocol；
   - 普通终端或轻量分屏只支持 ANSI / ASCII。
2. **窗口拉小导致横图排版“车祸”**：
   - 当在分屏或小窗口终端中打开时，宽幅大图会导致文字排版完全挤出屏幕、换行错位。

---

## 3. 优雅解法：终端宽度自适应脚本 (`myfastfetch`)

通过编写一个轻量启动脚本，获取终端当前的列宽（`tput cols`），动态决定渲染策略：

在 `~/.local/bin/myfastfetch` 创建脚本：

```bash
#!/usr/bin/env bash
# 自适应终端宽度的 fastfetch 智能包装器

cols=$(tput cols 2>/dev/null || echo 80)

# 判断当前终端环境支持的图像协议
image_type="auto"
if [[ -n "${GHOSTTY_RESOURCES_DIR:-}" ]] || [[ "${TERM:-}" == "xterm-ghostty" ]]; then
  image_type="kitty"
elif [[ "${TERM_PROGRAM:-}" == "ghostty" ]] || [[ "${TERM_PROGRAM:-}" == "kitty" ]]; then
  image_type="kitty"
elif [[ "${TERM_PROGRAM:-}" == "iTerm.app" ]]; then
  image_type="iterm"
fi

# 宽度自适应决策
if [ "$cols" -lt 85 ]; then
  # 窗口较窄时（如平铺双分屏），采用纯紧凑文本或小 ASCII 图标，防止爆框
  fastfetch --structure "Title:OS:Host:Kernel:Uptime:Shell:Display:CPU:GPU:Memory:Battery" \
            --logo-type small
else
  # 窗口宽裕时，渲染完整配置看板
  fastfetch --logo-type "$image_type"
fi
```

赋予执行权限并建立软链接别名：

```bash
chmod +x ~/.local/bin/myfastfetch
# 在 ~/.zshrc 中添加别名
alias ff="myfastfetch"
```

---

## 4. 现代风格配置文件 (`~/.config/fastfetch/config.jsonc`)

创建配置文件以获得最纯正的极客信息面板：

```bash
mkdir -p ~/.config/fastfetch
cat << 'EOF_CONFIG' > ~/.config/fastfetch/config.jsonc
{
  "$schema": "https://github.com/fastfetch-cli/fastfetch/raw/dev/doc/json_schema.json",
  "logo": {
    "padding": {
      "top": 1,
      "left": 2
    }
  },
  "display": {
    "separator": " 󰄾 "
  },
  "modules": [
    "title",
    "separator",
    { "type": "os", "key": "OS       " },
    { "type": "host", "key": "Host     " },
    { "type": "kernel", "key": "Kernel   " },
    { "type": "uptime", "key": "Uptime   " },
    { "type": "packages", "key": "Packages " },
    { "type": "shell", "key": "Shell    " },
    { "type": "terminal", "key": "Terminal " },
    { "type": "cpu", "key": "CPU      " },
    { "type": "gpu", "key": "GPU      " },
    { "type": "memory", "key": "Memory   " },
    { "type": "battery", "key": "Battery  " },
    "break",
    "colors"
  ]
}
EOF_CONFIG
```

这样，无论在全屏敲代码还是小窗分屏时，输入 `ff` 都能获得既美观又完全不跑偏的系统硬件看板。
