# 时间机器全能备份：移动硬盘与 NAS 无线静默备份

在数据安全领域有一句名言：“没有备份的数据不属于你”。
macOS 内置的 **时间机器 (Time Machine)** 是个人计算历史上最强大、使用门槛最低的增量快照备份系统：
- 每小时自动对修改的文件进行增量快照；
- 随时按日期时间轴“穿梭时空”精准找回某天下午 3 点被误删的一份 PPT；
- 换新电脑时，通过时间机器能以像素级精度无损还原所有软件、配置与文件。

本章讲解如何设置物理移动硬盘备份，以及搭建**免插线的 NAS 局域网无线静默备份**。

---

## 1. 黄金排除项：拒绝垃圾文件撑爆备份盘

很多初学者备份一天，几百 GB 的磁盘就被吃光了。必须在时间机器中排除无意义的临时大文件：

打开 `系统设置` -> `通用` -> `时间机器` -> 点击右下角 **「选项...」**，在排除列表中加入：
- `~/Downloads`（下载目录）
- `~/Library/Caches`（用户运行缓存）
- 开发者排除：`~/.local/share/mise`、各大项目构建产物目录；
- 虚拟机镜像：`~/Library/Containers/com.utmapp.UTM`（虚拟机单文件动辄几十 GB，频繁快照会吃光空间）。

*也可以直接在终端中使用命令行排除：*
```bash
# 声明某个目录永久排除在时间机器备份之外
sudo tmutil addexclusion -p ~/Downloads
```

---

## 2. 移动硬盘备份的最佳格式化规范

如果是专门用来做时间机器的外接移动固态硬盘或机械硬盘：
1. 打开“磁盘工具”，抹掉磁盘；
2. 格式务必选择 **APFS（区分大小写，加密）**；
3. 设置一个牢记的备份密码（防止移动硬盘丢失导致个人私隐泄露）；
4. 插入 Mac，系统会自动弹出“是否将此磁盘用作时间机器备份？”，点击确认即可。

---

## 3. 进阶玩法：局域网 NAS 无线静默备份（回家自动备份）

每次备份都要拿出一根线插在 MacBook 上极其繁琐。如果你家里有 NAS（如群晖 Synology、威联通、TrueNAS 或搭载 Samba 的 Linux/树莓派）：

### 3.1 NAS Samba 核心协议配置
确保你的 Linux / Samba 配置文件包含了苹果的 `vfs_fruit` 模块支持：

```ini
[TimeMachine]
  path = /data/timemachine
  valid users = tmuser
  read only = no
  vfs objects = catia fruit streams_xattr
  fruit:time machine = yes
  fruit:time machine max size = 500G  # 限制最大占用容量，防止吃满整块 NAS
```

### 3.2 在 Mac 上挂载并设为备份盘
1. 在“访达”中按 **`Command + K`**；
2. 输入 `smb://nas.local/TimeMachine` 并使用对应账号密码连接；
3. 打开 `系统设置` -> `通用` -> `时间机器`；
4. 点击 **「添加备份磁盘」**，此时列表中会自动发现刚才挂载的 NAS 共享盘，选中并启用加密。

**效果**：每天只要你的 MacBook 连上家里的 Wi-Fi，时间机器就会在后台悄无声息地进行无感加密增量备份。外出工作不带线，回家电量充足即自动安全归档。

---

## 4. 命令行极客掌控：`tmutil` 常用指令

```bash
# 查看当前备份状态与进度百分比
tmutil status

# 立即在后台触发一次低优先级静默备份
tmutil startbackup --auto

# 中途紧急停止当前备份
tmutil stopbackup

# 列出目前所有的备份历史时间戳
tmutil listbackups
```
