# 字体排版与终端渲染美化

macOS 拥有公认最好的原生字体排版引擎（CoreText）。系统自带的 **SF Pro**（西文）与 **苹方 (PingFang SC)**（中文）在视网膜屏幕上展现出顶级的印刷质感。

然而，在面对终端等宽对齐、代码连字（Ligatures）以及非 Retina 屏幕的文字渲染时，仍需进行针对性优化与适配。

---

## 1. 编程等宽字体神仙梯队

在代码编辑器与现代终端中，推荐安装以下几款开源等宽字体：

| 字体名称 | 核心特色 | 适用场景 | 安装命令 |
| :--- | :--- | :--- | :--- |
| **JetBrains Mono** | 大字怀设计、符号辨识度极高、连字优雅 | 现代终端、代码编写 | `brew install --cask font-jetbrains-mono-nerd-font` |
| **Fira Code** | 连字（Ligatures）先驱，箭头、不等于符号极美 | 泛编程开发 | `brew install --cask font-fira-code-nerd-font` |
| **更纱黑体 (Sarasa)** | **中英文完美 2:1 等宽**，彻底解决终端中文字符表格撕裂问题 | 终端重度中英文混合、CLI 表格 | `brew install --cask font-sarasa-gothic` |
| **Maple Mono** | 圆角质感、连字丰富、自带 Nerd Font 图标 | 追求个性视觉美感 | `brew install --cask font-maple-mono-nerd-font` |

---

## 2. 破除中英文等宽撕裂：为什么推荐更纱黑体？

在终端中使用 `ls`、`fastfetch` 或运行 CLI 数据库工具（如 MySQL CLI）打印表格时，如果行内夹杂中文，经常会出现“表格竖线错位、边框断裂”。

这是因为大多数英文字体的宽度与中文字体（如苹方）的宽度比例并不是严格的 $1:2$。
**更纱黑体 (Sarasa Gothic)** 由开源字体专家专门为终端设计，确保英文字宽正好是中文字宽的一半，在任何终端表格中都能实现严丝合缝的像素级对齐。

---

## 3. 非 Retina 屏幕字体抗锯齿补偿指令

如果你使用的是非 4K 的外接显示器（如 1080p 或部分 2K 屏），由于苹果在 macOS Mojave 之后取消了次像素抗锯齿，字体会显得过于单薄。

可以通过命令行适当加重字体粗细与渲染平滑度：

```bash
# 开启字体平滑（0 为关闭，1 为轻度，2 为中度，3 为重度）
defaults -currentHost write -globalDomain AppleFontSmoothing -int 2

# 重启或重新登录后生效
```
