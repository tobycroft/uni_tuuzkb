<template>
  <view class="container">
    <!-- 顶部连接状态 -->
    <view :class="connectionClass" class="connection-status">
      {{ connectionMessage }}
    </view>

    <!-- 表单区域 -->
    <form class="form">
      <button @click="reconnect" class="submit-button">连接</button>
      <!-- Progress 类型 -->
      <view class="form-group">
        <view>进度条:</view>
        <!--        <view>Endpoint_BeforeDelay:{{ Endpoint_BeforeDelay }}</view>-->
        <!--        <view>Endpoint_delay:{{ Endpoint_delay }}</view>-->
        <!--        <view>Endpoint_dynamic_mode:{{ Endpoint_dynamic_mode }}</view>-->
        <view>LCD1:{{ LCD1 }}</view>
        <view>LCD2:{{ LCD2 }}</view>
      </view>
      <!-- 滑块显示当前大小 -->
      <view class="slider-label">前置时间: {{ Endpoint_BeforeDelay }}</view>
      <slider
          :value="Endpoint_BeforeDelay"
          min="0"
          max="200"
          step="1"
          show-value
          activeColor="#3cc51f"
          backgroundColor="#e5e5e5"
          block-color="#3cc51f"
          block-size="28"
          @change="onSliderChange('Endpoint_BeforeDelay',$event)"
      />
      <view class="slider-label">间隔时间: {{ Endpoint_delay }}</view>
      <slider
          :value="Endpoint_delay"
          min="0"
          max="200"
          step="1"
          show-value
          activeColor="#3cc51f"
          backgroundColor="#e5e5e5"
          block-color="#3cc51f"
          block-size="28"
          @change="onSliderChange('Endpoint_delay',$event)"
      />
      <!-- Radio 类型的选择器 -->
      <view class="form-group">
        <text>选项选择:</text>
        <view class="radio-group">
          <button @click="modeOption(0)" :class="getModeClass(0)">关闭</button>
          <button @click="modeOption(1)" :class="getModeClass(1)">On-Q</button>
          <button @click="modeOption(2)" :class="getModeClass(2)">On-Whel</button>
        </view>
      </view>
      <view class="form-group">
        <text>选项选择:</text>
        <view class="radio-group">
          <button @click="endPointOption(0)" :class="getEndpointClass(0)">Ste</button>
          <button @click="endPointOption(1)" :class="getEndpointClass(1)">Dym</button>
          <button @click="endPointOption(2)" :class="getEndpointClass(2)">Wde</button>
          <button @click="endPointOption(3)" :class="getEndpointClass(3)">Ato</button>
          <button @click="endPointOption(4)" :class="getEndpointClass(4)">Atw</button>
          <button @click="endPointOption(5)" :class="getEndpointClass(5)">Man</button>
        </view>
      </view>

      <view class="radio-group">
        <button @click="CmdReset">重启</button>
      </view>
    </form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      size: 22,
      connectionMessage: '未连接',
      Endpoint_BeforeDelay: 0,
      Endpoint_delay: 0,
      Endpoint_dynamic_mode: 0,
      LCD1: '',
      LCD2: '',
      connectionClass: 'status-failed', // 红色，连接失败时
      Mode: 0, // 默认选择的选项
      socket: null // WebSocket 对象
    };
  },
  mounted() {
    // 从 storage 中获取 IP 和端口号
    this.reconnect();
  },
  methods: {
    reconnect() {
      // 从 storage 中获取 IP 和端口号
      const ip = uni.getStorageSync('config_ip');
      const port = uni.getStorageSync('config_port');

      // 如果 IP 和端口号存在，连接 WebSocket
      if (ip && port) {
        this.connectWebSocket(`ws://${ip}:${port}`);
      }
    },
    CmdReset() {
      const data = {
        route: "kbd",
        type: "reset",
      };
      this.socket.send({
        data: JSON.stringify(data)
      });
    },
    onSliderChange(field, event) {
      // 滑动结束时触发该事件，event.detail.value 为当前的值
      if (this[field] !== event.detail.value) {
        this[field] = event.detail.value;
        console.log(`${field} value:`, event.detail.value);
        this.socket.send({
          data: JSON.stringify({
            route: "semi-config",
            type: field,
            'data': this.$data
          })
        })
      }
    },
    connectWebSocket(url) {
      // 创建 WebSocket 连接
      this.socket = uni.connectSocket({
        url: url,
        success: () => {
          this.connectionMessage = '连接成功✔';
          this.connectionClass = 'status-success'; // 绿色，连接成功
        },
        fail: () => {
          this.connectionMessage = '连接失败×';
          this.connectionClass = 'status-failed'; // 红色，连接失败
        }
      });

      // 监听 WebSocket 打开事件
      this.socket.onOpen(() => {
        this.connectionMessage = '连接建立';
        this.connectionClass = 'status-success';
        this.updateData();
      });

      // 监听 WebSocket 错误事件
      this.socket.onError(() => {
        this.connectionMessage = '连接错误';
        this.connectionClass = 'status-failed';
      });

      // 监听 WebSocket 接收到的消息
      this.socket.onMessage((res) => {
        switch (res.data) {
          case 'update':
            this.updateData();
            break;

          default:
            const data = JSON.parse(res.data);
            this.updateFormData(data); // 根据接收到的数据更新表单
            break;
        }
      });

      // 监听 WebSocket 关闭事件
      this.socket.onClose(() => {
        this.connectionMessage = '连接被关闭';
        this.connectionClass = 'status-failed'; // 红色，连接关闭
      });
    },
    updateData() {
      const data = {
        route: "info",
      };
      this.socket.send({
        data: JSON.stringify(data)
      });
    },
    // 更新表单数据
    updateFormData(data) {
      console.log(data);
      for (const i in data) {
        if (this[i] !== null) {
          this[i] = data[i];
        }
      }
    },

    // 选项切换
    modeOption(option) {
      this.Mode = option;
      this.socket.send({
        data: JSON.stringify({
          route: "semi-config",
          type: "Mode",
          'data': this.$data,
        })
      })
    },
    // 选项切换
    endPointOption(option) {
      this.Endpoint_dynamic_mode = option;
      this.socket.send({
        data: JSON.stringify({
          route: "semi-config",
          type: "Endpoint_dynamic_mode",
          'data': this.$data,
        })
      })
    },
    getEndpointClass(option) {
      return this.Endpoint_dynamic_mode === option ? 'option-selected' : 'option';
    },
    // 获取选项样式
    getModeClass(option) {
      return this.Mode === option ? 'option-selected' : 'option';
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

.slider-label {
  font-size: 18px;
  margin-bottom: 20px;
}

.slider {
  width: 100%;
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
  width: 100%;
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

.form {
  width: 100%;
}
</style>
