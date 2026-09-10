# Apple Silicon 玩 Windows 游戏：Whisky 实战

很多人认为“Mac 只能办公，不能打游戏”。但在 Apple Silicon (M 系列芯片) 普及后，这个刻板印象正在被彻底改写：
苹果官方在 WWDC 推出了 **Game Porting Toolkit (GPTK)**，内置了强大的 **D3DMetal** 指令转换层，能将 Windows 专属的 **DirectX 11 与 DirectX 12** 图形调用，在毫无虚拟机损耗的前提下，**实时直译为 macOS 原生 Metal 图形指令**！

本章介绍如何使用纯开源图形化神器 **Whisky**，免装双系统、免装庞大虚拟机，直接在 Mac 上畅玩 Windows 游戏。

---

## 1. 为什么不用传统虚拟机打游戏？

- **虚拟机性能腰斩**：传统虚拟机（如 Parallels）需要虚拟整套 CPU 寄存器与虚拟显卡，还要分掉一半内存，运行 3A 游戏极其卡顿，且对 DirectX 12 支持极其脆弱；
- **Whisky 兼容层原理（Wine + GPTK）**：Whisky 不运行 Windows 操作系统，它只是一个“翻译官”。游戏以为自己在跑在 Windows 上，但所有渲染指令被以接近原生的性能直接交由 Apple GPU 核心执行！

---

## 2. 安装与环境部署

### 2.1 安装
通过 Homebrew 安装：

```bash
brew install --cask whisky
```

### 2.2 自动下载 Apple GPTK 与 Rosetta
首次打开 Whisky 时，软件会自动提示下载 Wine 运行库与苹果官方的 Game Porting Toolkit 组件，一路点击确认完成初始化。

---

## 3. 实战：创建容器与安装 Windows Steam

在 Whisky 中，环境被封装为独立的“容器 (Bottle)”：

1. **新建容器**：
   - 点击左下角 `Create Bottle`（新建容器）；
   - 容器名称输入 `Gaming`，Windows 版本选择 `Windows 10 / 11`；
2. **下载并安装 Windows Steam**：
   - 到 Steam 官网下载 Windows 版的 `SteamSetup.exe`；
   - 在 Whisky 界面中点击 **Run...（运行）**，选中下载的 `SteamSetup.exe`；
   - 像在 Windows 上一样一路点击“下一步”安装完成；
3. **开启性能监控 (MetalHUD) 与图形加速**：
   - 选中该容器，点击右侧的 **Bottle Configuration（容器配置）**；
   - 打开 **DXVK**（Vulkan 翻译层）；
   - 打开 **MetalHUD** 开关（开启后游戏右上角会显示实时的帧率 FPS、GPU 功耗与 Metal 渲染耗时）。

---

## 4. 畅玩 Windows 游戏库

现在直接在 Whisky 列表中双击打开 Steam，登录你的账号，即可正常下载并游玩支持的游戏（如《艾尔登法环》、《赛博朋克2077》、《空洞骑士》、《幻兽帕鲁》等）。

> [!NOTE]
> 目前受限于架构翻译，含有内核级反作弊系统（Kernel Anti-Cheat，如《英雄联盟》Vanguard、《瓦罗兰特》、《绝地求生》BattlEye）的 Windows 竞技网游暂时无法在 Wine/Whisky 中运行；单机大作与非内核反作弊联机游戏表现极佳。
