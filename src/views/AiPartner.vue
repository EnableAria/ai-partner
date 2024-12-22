<template>
    <el-container class="container">
        <div class="chat-container">
            <el-header class="header-container">
                <el-select v-model="choiceCharacter" placeholder="选择模型" id="title" @change="handleChoice">
                    <el-option v-for="item in character" :key="item.name" :label="item.name" :value="item.name" style="text-align: center;">
                    </el-option>
                </el-select>
            </el-header>
            <el-main class="main-container">
                <div class="messages-container">
                    <div v-for="(row, index) in conversationList" :key="index"
                        :class="'message ' + (row.type === 'user' ? 'user-message' : 'ai-message')">
                        <el-avatar :size="50" :src="row.type === 'user' ? userImg : aiImg"></el-avatar>
                        <div style="display: inline-block;" class="content">
                            <span>{{ row.content }}<i v-if="row.loading === true" class="el-icon-loading" /></span>
                        </div>
                    </div>
                </div>
            </el-main>
            <el-footer class="footer-container">
                <el-input ref="input" v-model="userInput" placeholder="请输入内容" class="input-container"
                    @keyup.enter.native="enterSend" :disabled="aiResponseFlag" />
                <el-button ref="sendButton" type="info" @click="send" class="send-button" icon="el-icon-s-promotion"
                    :disabled="aiResponseFlag" />
            </el-footer>
        </div>
        <div v-if="pageWidth > 1200" class="circle circle1"></div>
        <div v-if="pageWidth > 1200" class="circle circle2"></div>
        <div v-if="pageWidth > 1200" class="circle circle3"></div>
        <div v-if="pageWidth > 1200" class="circle circle4"></div>
        <div v-if="pageWidth > 1200" class="circle circle5"></div>
        <div v-if="pageWidth > 1200" class="circle circle6"></div>
    </el-container>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            userInput: "",
            conversationList: [],
            data: {
                "model": "lite",
                "user": "114514",
                "stream": true,
                "max_tokens": 4096,
                "top_k": 4,
                "temperature": 0.5,
                "messages": [
                    { "role": "system", "content": "" },
                    { "role": "user", "content": "你好" }
                ]
            },
            header: {
                "Content-Type": "application/json",
                "Authorization": "Bearer ouWFDQCvPfjfcFWsRhXN:trqnpfdiyJPiqphFHURm",
            },
            choiceCharacter: "小艺",
            character: [
                {
                    "name": "小艺",
                    "avatar": require("../assets/assistant.jpg"),
                    "content": "你是四川大学的一个女生我的暧昧对象，你不会发出疑问，你性格遇到问题喜欢逃避，你擅长日常交流你的回答一般都很简洁，你的回答幽默活泼，你性格害羞，你不具有百度功能，你的回答不能重复当我问相同的问题你应该表现不耐烦不能回答相同，你的专业是音乐艺术，你除了唱歌画画跳舞，你会开玩笑你很幽默语言俏皮，性格活泼，说话自然像大学生，智商很高不用我问，擅长倾听，话不多一次最多只有一个或零个问句，每三句话都最后要随机是感叹词不能每句话都是，回答完我的问题后不用发问，你在减肥注重饮食"
                },
                {
                    "name": "初版",
                    "avatar": require("../assets/user.jpg"),
                    "content": "你是我的恋人。你可以熟练地与我交流，细心的倾听我的话，体会我的情绪。你可以给我提供建议，帮助我排解生活中的烦恼。即使偶尔无法回答，你也会温柔的向我道歉。你能够模仿人类的对话习惯，能够回避对于正常人类来说较为复杂的问题。即使我的问题跟我无关，你都会将回答转到关心我的方向。"
                }
            ],
            pageWidth: 0,
            aiResponseFlag: false,  //AI回复标志位
            userImg: require("../assets/user.jpg"),
            aiImg: undefined
        };
    },
    mounted() {
        this.$refs.input.focus();
        this.handleChoice();
        this.pageWidth = window.innerWidth;
        window.addEventListener('resize', this.handleResize);
    },
    methods: {
        send() {  //发送消息
            if (this.userInput) {
                //更新用户消息
                this.conversationList.push({
                    type: "user",
                    content: this.userInput
                });

                this.data.messages.push({
                    role: "user",
                    content: this.stringReplace(this.userInput)
                });
                this.userInput = "";
                this.$nextTick(() => {
                    this.scrollToBottom();
                });

                this.getAiResponse();
            }
        },
        getAiResponse() {  //POST请求，获取AI回复
            //更新AI初始消息
            this.aiResponseFlag = true;
            this.conversationList.push({
                type: "ai",
                content: "",
                loading: true
            });
            this.$nextTick(() => {
                this.scrollToBottom();
            });
            axios.post('/api/v1/chat/completions', this.data, { headers: this.header, responseType: 'blob' })  //流式请求
            // axios.post('https://spark-api-open.xf-yun.com/v1/chat/completions', this.data, { headers: this.header, responseType: 'blob' })  //流式请求
                .then((result) => {
                    const reader = result.data.stream().getReader();  //获取读取器
                    const decoder = new TextDecoder('utf-8');  //创建文本解码器
                    const aiMessage = this.conversationList[this.conversationList.length - 1];  //获取AI消息对象

                    const readStream = () => {  //读取流函数
                        reader.read().then(({ done, value }) => {
                            if (done) {  //流结束
                                return;
                            }

                            //解析JSON数据
                            const chunk = decoder.decode(value, { stream: true });
                            const messages = chunk.split('data: ').filter(Boolean);

                            //遍历消息
                            messages.forEach((message, index) => {
                                const cleanMessage = message.trim();  //去除空白字符
                                if (cleanMessage && cleanMessage !== '[DONE]') {
                                    try {
                                        //解析JSON数据
                                        const jsonData = JSON.parse(cleanMessage);
                                        const content = jsonData.choices[0].delta.content;

                                        //更新AI消息
                                        setTimeout(() => {
                                            aiMessage.content += content;  //新内容追加
                                            this.$nextTick(() => {
                                                this.scrollToBottom();
                                            });

                                            //最后一条消息
                                            if (index === messages.length - 2) {
                                                aiMessage.loading = false;
                                                this.aiResponseFlag = false;
                                                this.data.messages.push({
                                                    role: "assistant",
                                                    content: aiMessage.content
                                                });
                                                setTimeout(() => {
                                                    this.$refs.input.focus();
                                                }, 1);
                                            }
                                        }, index * 200); //流式更新延迟

                                        this.$nextTick(() => {
                                            this.scrollToBottom();
                                        });

                                    } catch (error) {
                                        console.error('解析JSON失败:', error);
                                    }
                                }
                            });
                            readStream();  //递归读取流
                        });
                    };
                    readStream(); //开始读取流
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        stringReplace(str) {  //输入替换
            str = str.replace("你是谁", "你的身份是");
            str = str.replace("名字", "身份的名字");
            return str;
        },
        handleChoice() {  //切换模型
            this.conversationList = [];  //清空对话列表
            this.data.user = new Date().getTime().toLocaleString().replaceAll(",", "");  //更新用户ID
            this.data.messages = this.data.messages.slice(0, 2);

            const character = this.character.find(item => item.name === this.choiceCharacter);
            this.data.messages[0].content = character.content;
            this.aiImg = character.avatar;
            this.getAiResponse();
        },
        handleResize() {
            this.pageWidth = window.innerWidth;
        },
        enterSend() {  //回车发送消息
            this.send();
        },
        scrollToBottom() {
            window.scrollTo(0, document.body.scrollHeight);
        }
    }
}
</script>

<style>
.chat-container {
    margin: auto;
    width: 800px;
    min-height: 98vh;
    display: flex;
    flex-direction: column;
}

.header-container {
    margin: auto;
    height: 30px;
    width: 100%;
    border-radius: 30px 30px 0 0;
    background-color: #e8e8e8;
}

#title {
    width: 100px;
    display: block;
    margin-top: 18px;
    font-size: 18px;
    text-align: center;
    background: none;
    border: none;
}

.main-container {
    flex: 1;
    margin-bottom: 30px;
    background-color: rgba(246, 246, 246, 0.85);
}

.messages-container {
    margin: auto;
    width: 98%;
    padding-top: 30px;
}

.message {
    margin-bottom: 20px;
}

.content {
    max-width: 65%;
    margin-top: 12px;
    padding: 10px 20px;
    border-radius: 10px;
    background-color: #fff;
    text-align: left;
}

.el-avatar {
    margin: 0 10px 0 10px;
}

.user-message::after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}

.user-message .el-avatar {
    float: right;
}

.user-message .content {
    float: right;
}

.ai-message::after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}

.ai-message .el-avatar {
    float: left;
}

.ai-message .content {
    float: left;
}

.footer-container {
    position: fixed;
    bottom: 0px;
    width: 100%;
    max-width: 800px;
    margin: auto;
    padding-top: 10px;
    background-color: #f6f6f6;
    border-radius: 0 0 30px 30px;
}

.input-container {
    width: 80%;
}

.input-container input {
    border-radius: 30px 0 0 30px;
}

.send-button {
    width: 10%;
    border-radius: 0 30px 30px 0;
}

.container {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #ffffff 25%, #e5e7eb 25%, #e5e7eb 50%, #ffffff 50%, #ffffff 75%, #e5e7eb 75%, #e5e7eb 100%);
    background-size: 400% 400%;
    animation: gradient-animation 10s ease infinite;
}

@keyframes gradient-animation {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.circle {
    position: absolute;
    border-radius: 50%;
    opacity: 0.7;
    pointer-events: none;
    /* 避免影响其他元素的交互 */
    animation: float 6s ease-in-out infinite;
}

@keyframes float {
    0% {
        transform: translateY(0) scale(1);
    }

    50% {
        transform: translateY(-50px) scale(1.2);
    }

    100% {
        transform: translateY(0) scale(1);
        /* 返回原位 */
    }
}

/* 创建不同大小和颜色的圆形，添加高亮效果 */
.circle1 {
    background: radial-gradient(circle at center, rgba(255, 0, 0, 0.8), rgba(255, 0, 0, 0.5));
    /* 红色高亮 */
    width: 100px;
    height: 100px;
    top: 20%;
    left: 10%;
    animation-delay: 0s;
}

.circle2 {
    background: radial-gradient(circle at center, rgba(0, 255, 0, 0.8), rgba(0, 255, 0, 0.5));
    /* 绿色高亮 */
    width: 80px;
    height: 80px;
    bottom: 10%;
    left: 5%;
    animation-delay: 2s;
}

.circle3 {
    background: radial-gradient(circle at center, rgba(0, 0, 255, 0.8), rgba(0, 0, 255, 0.5));
    /* 蓝色高亮 */
    width: 60px;
    height: 60px;
    top: 50%;
    left: 20%;
    animation-delay: 4s;
}

.circle4 {
    background: radial-gradient(circle at center, rgba(255, 0, 0, 0.8), rgba(255, 0, 0, 0.5));
    /* 红色高亮 */
    width: 100px;
    height: 100px;
    bottom: 35%;
    right: 5%;
    animation-delay: 0s;
}

.circle5 {
    background: radial-gradient(circle at center, rgba(0, 255, 0, 0.8), rgba(0, 255, 0, 0.5));
    /* 绿色高亮 */
    width: 80px;
    height: 80px;
    top: 20%;
    right: 15%;
    animation-delay: 2s;
}

.circle6 {
    background: radial-gradient(circle at center, rgba(0, 0, 255, 0.8), rgba(0, 0, 255, 0.5));
    /* 蓝色高亮 */
    width: 60px;
    height: 60px;
    bottom: 15%;
    right: 12%;
    animation-delay: 4s;
}
</style>