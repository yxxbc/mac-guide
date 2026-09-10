# 外接显示器避坑：HiDPI 发虚与 BetterDisplay

当你满心欢喜地给 MacBook 外接上一台标准的 27 寸 4K 甚至 2K 显示器时，经常会迎头撞上两大噩梦：
1. **文字发虚、毛刺严重**：字体没有 MacBook 内置屏幕那样锐利饱满，看久了眼睛发酸；
2. **键盘按键无法调亮度和音量**：按下键盘上的 `F1/F2`（亮度）或音量键，屏幕中央弹出带🚫禁用符号的图标，必须伸手去摸显示器背面生硬的 OSD 实体按键。

本章讲解 macOS 独特的视网膜缩放原理，并给出终极救星方案。

---

## 1. 为什么外接显示器在 Mac 上会发虚？

苹果所有的硬件（MacBook Retina 屏、Studio Display）其像素密度都在 **218 PPI 左右**。macOS 采用的是严格的 **200% 整倍数像素超采样（@2x HiDPI）** 渲染：
- 先以 2 倍逻辑分辨率在显存中绘制超清图像；
- 然后降采样映射到屏幕物理像素上。

而在市面常见的 PC 显示器中：
- **27 寸 2K 显示器 (2560×1440)**：PPI 仅有 108。macOS 默认**不会开启 HiDPI**，而是直接按 1:1 粗暴输出，由于 macOS 早已彻底移除了次像素抗锯齿（Subpixel Antialiasing），导致非 Retina 屏幕上的文字边缘像狗啃一样模糊；
- **27 寸 4K 显示器 (3840×2160)**：PPI 约为 163。如果缩放到“看起来像 2K (2560×1440)”，macOS 内部会先渲染成 5K (5120×2880) 再缩放，如果显卡握手协议异常，HiDPI 选项就会莫名消失。

---

## 2. 救世主工具：BetterDisplay

由开发者 waydabber 开发的 **BetterDisplay** 是现代 macOS 社区公认的外接显示器神级神器（核心基础功能完全免费）。

### 2.1 安装
```bash
brew install --cask betterdisplay
```

### 2.2 杀手特性一：强制开启全分辨率 HiDPI
即使你使用的是便宜的 2K 显示器或便携屏，BetterDisplay 能通过创建虚拟屏幕或 EDID 深度覆写，**强行激活 macOS 的原生 HiDPI 渲染引擎**：
1. 打开 BetterDisplay，在菜单栏选中你的外接显示器；
2. 在 `Resolution`（分辨率）分栏中勾选 **Enable smooth scaling**（平滑缩放）；
3. 滑动缩放条，选中带 **HiDPI** 标识的目标分辨率。
瞬间，外接屏幕上的所有字体与图标变得如 MacBook 内置屏一般锐利细腻，彻底告别发虚！

### 2.3 杀手特性二：原生键盘控制外接屏幕亮度与音量 (DDC/CI)
通过显示器通用的 DDC/CI 协议，BetterDisplay 能直接通过 HDMI / Type-C 数据线调节显示器的硬件背光：
1. 在 BetterDisplay 设置中开启 `DDC Control`；
2. 勾选 **Use Apple keyboard keys to control display brightness/volume**。
现在，你可以像调节内置屏幕一样，直接敲击键盘上的 `F1`、`F2` 和静音键，无缝同步调节外接戴尔、LG、华硕等第三方显示器的硬件背光和内置音响！
