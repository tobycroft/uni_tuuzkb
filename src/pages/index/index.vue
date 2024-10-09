<template>
  <view class="container">
    <!-- 顶部连接状态 -->
    <view :class="connectionClass" class="connection-status">
      {{ connectionMessage }}
    </view>

    <!-- 表单区域 -->
    <form @submit.prevent="submitData">
      <!-- Progress 类型 -->
      <view class="form-group">
        <text>进度条:</text>
        <progress :value="progressValue" max="500" class="progress-bar"></progress>
        <progress :value="smallProgressValue" max="100" class="progress-bar-small"></progress>
      </view>

      <!-- Radio 类型的选择器 -->
      <view class="form-group">
        <text>选项选择:</text>
        <view class="radio-group">
          <button @click="selectOption('close')" :class="getOptionClass('close')">关闭</button>
          <button @click="selectOption('A')" :class="getOptionClass('A')">A 选项</button>
          <button @click="selectOption('B')" :class="getOptionClass('B')">B 选项</button>
        </view>
      </view>

      <!-- 提交按钮 -->
      <button type="submit" class="submit-button">提交</button>
    </form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      connectionMessage: '未连接',
      connectionClass: 'status-failed', // 红色，连接失败时
      progressValue: 10, // 大进度条
      smallProgressValue: 0, // 小进度条
      selectedOption: 'close', // 默认选择的选项
      socket: null // WebSocket 对象
    };
  },
  mounted() {
    // 从 storage 中获取 IP 和端口号
    const ip = uni.getStorageSync('config_ip');
    const port = uni.getStorageSync('config_port');

    // 如果 IP 和端口号存在，连接 WebSocket
    if (ip && port) {
      this.connectWebSocket(`ws://${ip}:${port}`);
    }
  },
  methods: {
    connectWebSocket(url) {
      // 创建 WebSocket 连接
      this.socket = uni.connectSocket({
        url: url,
        success: () => {
          this.connectionMessage = '连接成功';
          this.connectionClass = 'status-success'; // 绿色，连接成功
        },
        fail: () => {
          this.connectionMessage = '连接失败';
          this.connectionClass = 'status-failed'; // 红色，连接失败
        }
      });

      // 监听 WebSocket 打开事件
      this.socket.onOpen(() => {
        this.connectionMessage = '连接成功';
        this.connectionClass = 'status-success';
      });

      // 监听 WebSocket 错误事件
      this.socket.onError(() => {
        this.connectionMessage = '连接失败';
        this.connectionClass = 'status-failed';
      });

      // 监听 WebSocket 接收到的消息
      this.socket.onMessage((res) => {
        const data = JSON.parse(res.data);
        this.updateFormData(data); // 根据接收到的数据更新表单
      });

      // 监听 WebSocket 关闭事件
      this.socket.onClose(() => {
        this.connectionMessage = '连接关闭';
        this.connectionClass = 'status-failed'; // 红色，连接关闭
      });
    },

    // 更新表单数据
    updateFormData(data) {
      this.progressValue = data.progress || 0;
      this.smallProgressValue = data.smallProgress || 0;
      this.selectedOption = data.selectedOption || 'close';
    },

    // 提交表单
    submitData() {
      const dataToSend = {
        progress: this.progressValue,
        smallProgress: this.smallProgressValue,
        selectedOption: this.selectedOption
      };

      // 通过 WebSocket 发送数据
      if (this.socket) {
        this.socket.send({
          data: JSON.stringify(dataToSend)
        });
      }
    },

    // 选项切换
    selectOption(option) {
      this.selectedOption = option;
    },

    // 获取选项样式
    getOptionClass(option) {
      return this.selectedOption === option ? 'option-selected' : 'option';
    }
  }
};
</script>

<style>
/* 容器样式 */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  height: 100vh;
}

/* 连接状态 */
.connection-status {
  width: 100%;
  text-align: center;
  padding: 10px;
  color: #fff;
}
.status-success {
  background-color: green;
}
.status-failed {
  background-color: red;
}

/* 表单样式 */
.form-group {
  margin-bottom: 20px;
}
.progress-bar {
  width: 100%;
  height: 25px;
}
.progress-bar-small {
  width: 100%;
  height: 10px;
}

/* 按钮样式 */
.radio-group {
  display: flex;
  justify-content: space-around;
}
button {
  flex: 1;
  margin: 5px;
  padding: 10px;
  background-color: #ddd;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  text-align: center;
}
.option-selected {
  background-color: #3cc51f;
  color: #fff;
}
.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #3cc51f;
  color: white;
  font-size: 18px;
  border-radius: 5px;
  border: none;
}
</style>
