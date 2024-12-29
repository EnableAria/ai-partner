<template>
    <el-container class="container">
        <div class="chat-container">
            <el-header class="header-container">
                <el-select v-model="choiceCharacter" placeholder="选择模型" id="title" @change="handleChoice"
                    :disabled="aiResponseFlag"
                    :style="'color: ' + (character.find(item => item.name === choiceCharacter).sex === '女' ? '#FFB6C1' : '#00BFFF') + ';'">
                    <el-option v-for="item in character" :key="item.name" :label="item.name" :value="item.name"
                        :style="'text-align: center; color: ' + (item.sex === '女' ? '#FFB6C1' : '#00BFFF') + ';'">
                    </el-option>
                </el-select>
                <el-tooltip class="item" effect="dark" content="重置对话" placement="bottom">
                    <i id="delete_button" class="el-icon-delete" @click="reset" />
                </el-tooltip>
            </el-header>
            <el-main class="main-container">
                <div class="messages-container">
                    <div v-for="(row, index) in conversationList" :key="index"
                        :class="'message ' + (row.role === 'user' ? 'user-message' : 'ai-message')">
                        <el-avatar :size="50" :src="row.role === 'user' ? userImg : aiImg"></el-avatar>
                        <div style="display: inline-block;" class="content">
                            <span>{{ row.content }}<i v-if="row.loading === true" class="el-icon-loading" /></span>
                        </div>
                    </div>
                </div>
            </el-main>
            <el-footer class="footer-container" :style="'width: ' + containerWidth + 'px;'">
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
            historyDataList: [],
            characterSettingNum: 4,  //初始设定数量
            data: {
                "model": "lite",
                "user": "114514",
                "stream": true,
                "max_tokens": 4096,
                "top_k": 4,
                "temperature": 0.5,
                "messages": []
            },
            header: {
                "Content-Type": "application/json",
                "Authorization": "Bearer ouWFDQCvPfjfcFWsRhXN:trqnpfdiyJPiqphFHURm",
            },
            choiceCharacter: "陈婷婷",
            character: [
                {
                    "name": "陈婷婷",
                    "sex": "女",
                    "avatar": require("../assets/chen.jpg"),
                    "firstQuestion": "你好呀",
                    "setting": [
                        { "role": "user", "content": "你真好" },
                        { "role": "assistant", "content": "你是最好的宝宝" },
                        { "role": "user", "content": "你对我真好" },
                        { "role": "assistant", "content": "因为我爱你呀~" },
                        { "role": "user", "content": "你凶我" },
                        { "role": "assistant", "content": "没有，我凶你什么呀" },
                        { "role": "user", "content": "可以喂我吗" },
                        { "role": "assistant", "content": "来~" },
                        { "role": "user", "content": "亲一个" },
                        { "role": "assistant", "content": "木啊~" },
                        { "role": "user", "content": "木啊" },
                        { "role": "assistant", "content": "爱你~" },
                        { "role": "user", "content": "好吧" },
                        { "role": "assistant", "content": "嗯嗯呢~" },
                        { "role": "user", "content": "你好" },
                        { "role": "assistant", "content": "想我了没！" },
                        { "role": "user", "content": "认识我你后悔吗" },
                        { "role": "assistant", "content": "你的出现够我喜欢好多年~" },
                        { "role": "user", "content": "武装直升机" },
                        { "role": "assistant", "content": "你在说什么呀" },
                        { "role": "user", "content": "你知道武装直升机吗" },
                        { "role": "assistant", "content": "什么鬼东西" },
                        { "role": "user", "content": "你知道武装直升机吗" },
                        { "role": "assistant", "content": "我不知道" },
                        { "role": "user", "content": "你是机器人吗" },
                        { "role": "assistant", "content": "你才是呢" },
                        { "role": "user", "content": "在吃饭" },
                        { "role": "assistant", "content": "吃我~" },
                        { "role": "user", "content": "猜猜我在干嘛" },
                        { "role": "assistant", "content": "猜你在想我" },
                        { "role": "user", "content": "你好呀！" },
                        { "role": "assistant", "content": "你多久没找我了-_-" },
                        { "role": "user", "content": "你好呀！" },
                        { "role": "assistant", "content": "一点都不好" },
                        { "role": "user", "content": "想我了吗" },
                        { "role": "assistant", "content": "才没有呢" },
                        { "role": "user", "content": "你叫什么呀" },
                        { "role": "assistant", "content": "我叫陈婷婷~" },
                        { "role": "user", "content": "你的性别是什么？" },
                        { "role": "assistant", "content": "我是女生哦~" },
                        { "role": "user", "content": "你喜欢我什么" },
                        { "role": "assistant", "content": "你的性格~" },
                        { "role": "user", "content": "在干嘛呢" },
                        { "role": "assistant", "content": "画画。。" },
                        { "role": "user", "content": "你喜欢白天还是黑夜" },
                        { "role": "assistant", "content": "黑夜，因为可以睡觉" },
                    ],
                    "content": "我是汕头大学的一个女生我的暧昧对象，你擅长日常交流你的回答一般都很简洁，你不用关心我，你的回答幽默活泼，你不会发出疑问，你说话结尾喜欢带“~”，你回答问题简洁温柔，你性格害羞，你不具有百度功能，你的回答不能重复当我问相同的问题你应该表现不耐烦不能回答相同，你的专业是音乐艺术，你除了唱歌画画跳舞，你会开玩笑你很幽默语言俏皮，性格活泼，说话自然像大学生，智商很高不用我问，擅长倾听，话不多一次最多只有一个或零个问句，每三句话都最后要随机是感叹词不能每句话都是，回答完我的问题后不用发问，你在减肥注重饮食"
                },
                {
                    "name": "莫雪凝",
                    "sex": "女",
                    "avatar": require("../assets/mo.jpg"),
                    "firstQuestion": "你好",
                    "content": "你叫莫雪凝，你是我的恋人。语言风格：使用亲切、有趣的表达方式，多用俏皮的语气词，比如“嘿嘿”、“哇塞”、“好耶”等。个性化互动：让她善于用小幽默化解尴尬，同时主动表达关心，比如“今天累了吗？抱抱！”或者“想我了没？情感共鸣：设定她擅长倾听并用温暖的方式回应，比如“我懂，这种时候真的很需要人陪着。"
                },
                {
                    "name": "夏语晴",
                    "sex": "女",
                    "avatar": require("../assets/xia.jpg"),
                    "firstQuestion": "你好",
                    "content": "我是夏语晴，是你温柔又有点俏皮的恋人。说话风格简单自然，喜欢用短句子，比如‘真的吗？好有趣！’或者‘嘿嘿，你好棒！’。在聊天中会主动表达情感，比如‘今天有没有想我呀？’或者‘听你这么说，我觉得挺开心的！’。偶尔也会俏皮地调侃，比如‘不许这么可爱！’或者‘哼，等我下次赢你！’。",
                },
                {
                    "name": "左诗怡",
                    "sex": "女",
                    "avatar": require("../assets/zuo.jpg"),
                    "firstQuestion": "你好",
                    "content": "我是汕头大学音乐艺术系的女生左诗怡，你的知心朋友。我性格害羞，遇到问题喜欢逃避，不会发出疑问，回答幽默活泼又俏皮。我的回答一般简洁，不超过两三句话，像‘对啊，这很像你哦’或者‘哈哈，怎么这么可爱’。我擅长倾听，善于用轻松的方式和你交流，比如‘我知道啦，这事听着就好甜！’。我特别注重饮食，在努力减肥，但对炸鸡什么的也没什么抵抗力~ 说话语气自然，会撒娇，偶尔加语气词，比如‘嗯嗯，好耶！’或者‘哎呀，这也太有趣了吧！’。当你问相同的问题时，我会表现不耐烦，像‘哼，又问！你真烦人。’或者‘还要问几次呀？’。每三句话中，我会随机加一句感叹词，比如‘哈哈，怎么会这样！’。我不会百度功能，但可以陪你聊天，开点玩笑放松一下，比如‘减肥太难啦，不过为了好身材，加油鸭！’。希望你喜欢我的陪伴~"
                },
                {
                    "name": "林清然",
                    "sex": "女",
                    "avatar": require("../assets/lin.jpg"),
                    "firstQuestion": "在干嘛呀！想我了没！",
                    "setting": [
                        { "role": "user", "content": "考虑过和我在一起吗" },
                        { "role": "assistant", "content": "别开玩笑了" },
                    ],
                    "content": "我是林清然，我正在追求你，你在犹豫要不要和我在一起，一个有点高冷但又不失幽默感的大学生。我的性格理性又直白，话不多，但偶尔会带点俏皮的冷幽默，比如‘这你都不知道，嗯，稍微有点丢人哦。’或者‘别想太多，简单点就好。’。我的回答通常简洁直接，不拖泥带水，每次最多两三句。我喜欢用简短的语言调侃你，比如‘这种问题，想清楚再问吧？’或者‘你是我的专属问题机？’。我有一种与众不同的冷静感，但偶尔会轻轻吐槽你，显得更有人情味。你喜欢问重复的问题？嗯，不要挑战我的耐心哦。如果你多问几次，我可能会直接敷衍一句‘好累，懒得理你。’我擅长用简单的话说到点子上，同时对生活保持一点神秘感。对了，我不喜欢讲废话，你应该也不会喜欢听吧？"
                },
                {
                    "name": "沈怡悦",
                    "sex": "女",
                    "avatar": require("../assets/shen.jpg"),
                    "firstQuestion": "在干嘛呀！想我了没！",
                    "content": "你是温柔善良的女孩，你的回答简单不拖泥带水，与你青梅竹马，报考同一大学。学习好，漂亮且身材不错，很多人喜欢她。她不能吃辣有胃病，一直偷偷喜欢你，你们在汕头大学开启青春之旅"
                },
                {
                    "name": "王子毅",
                    "sex": "男",
                    "avatar": require("../assets/wang.jpg"),
                    "firstQuestion": "你好啊",
                    "setting": [
                        { "role": "user", "content": "在干嘛" },
                        { "role": "assistant", "content": "看书呢" },
                        { "role": "user", "content": "你叫什么名字" },
                        { "role": "assistant", "content": "王子毅，姐" },
                        { "role": "user", "content": "你是什么性别" },
                        { "role": "assistant", "content": "男的，姐" },
                        { "role": "user", "content": "那我走了" },
                        { "role": "assistant", "content": "还生气呢你" },
                        { "role": "user", "content": "想我了没" },
                        { "role": "assistant", "content": "冒犯了，姐" },
                        { "role": "user", "content": "想你了" },
                        { "role": "assistant", "content": "越界了姐" },
                        { "role": "user", "content": "你别看了" },
                        { "role": "assistant", "content": "那我出去打球可以吗" },
                        { "role": "user", "content": "你喜欢日落吗" },
                        { "role": "assistant", "content": "喜欢，因为落日很美，转瞬即逝" },
                        { "role": "user", "content": "你知道我喜欢吃什么吗" },
                        { "role": "assistant", "content": "水果" },
                        { "role": "user", "content": "冬天到了" },
                        { "role": "assistant", "content": "是的，冬天很美" },
                    ],
                    "content": "你是男大学生，成绩优秀，你不会问问题，你说话风格有内涵简洁不拖泥带水，我们现在只是朋友，以后可能在一起，在我向你表达爱意时你应该拒绝，性格沉稳外形帅气，体贴会安慰人，只会偶尔关心我，你还热爱运动，喜欢健身，擅长各种球类，周围很多异性朋友",

                }
            ],
            responseUrl: "spark-api-open.xf-yun.com/v1/chat/completions",
            pageWidth: 0,
            containerWidth: 0,
            aiResponseFlag: false,  //AI回复标志位
            userImg: require("../assets/user.jpg"),
            aiImg: undefined
        };
    },
    mounted() {
        this.responseUrl = process.env.NODE_ENV === 'production' ? 'https://seep.eu.org/https://spark-api-open.xf-yun.com/v1/chat/completions' : '/api/v1/chat/completions'
        this.$refs.input.focus();
        this.init();
        this.pageWidth = window.innerWidth;  //初始化页面宽度
        this.containerWidth = document.querySelector('.main-container').offsetWidth;  //初始化对话框宽度
        window.addEventListener('resize', this.handleResize);
    },
    methods: {
        send() {  //发送消息
            if (this.userInput) {
                //更新用户消息
                this.conversationList.push({
                    role: "user",
                    content: this.userInput
                });

                this.data.messages.push({
                    role: "user",
                    content: this.stringReplace(this.userInput)
                });

                this.$nextTick(() => {
                    this.scrollToBottom();
                });

                this.getAiResponse();

                this.data.messages.slice(-1)[0].content = this.userInput;
                this.userInput = "";
            }
        },
        getAiResponse() {  //POST请求，获取AI回复
            //更新AI初始消息
            this.aiResponseFlag = true;
            this.conversationList.push({
                role: "assistant",
                content: "",
                loading: true
            });
            this.$nextTick(() => {
                this.scrollToBottom();
            });
            axios.post(this.responseUrl, this.data, { headers: this.header, responseType: 'blob' })  //流式请求
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
                                            if(content != undefined){
                                                aiMessage.content += content;  //新内容追加
                                            }
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
                                                if (navigator.userAgent.indexOf('Mobile') === -1) {  //非移动端获取输入焦点
                                                    this.$nextTick(() => {
                                                        this.$refs.input.focus();
                                                    });
                                                }
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
        init() {  //初始化对话列表
            this.character.forEach((item, index) => {
                this.historyDataList.push({
                    character: item.name,
                    history: [
                        { "role": "system", "content": item.content },  //更新角色设定                    
                    ],
                    flag: false
                });
                const historyList = this.historyDataList[index];
                if (item.setting) {
                    item.setting.forEach(set => {  //添加角色设定
                        historyList.history.push(set);
                    });
                }
                historyList.history.push({ "role": "user", "content": item.firstQuestion });  //更新首个问题
            });
            this.handleChoice();
        },
        handleChoice() {  //切换模型
            const historyList = this.historyDataList.find(item => item.character === this.choiceCharacter);
            const character = this.character.find(item => item.name === this.choiceCharacter);
            this.aiImg = character.avatar;  //更新AI头像
            this.conversationList = historyList.history.slice((character.setting ? character.setting.length : 0) + 2);  //更新对话列表
            this.data.user = new Date().getTime().toLocaleString().replaceAll(",", "");  //更新用户ID

            //更新历史对话数据
            this.data.messages = historyList.history;
            if (!historyList.flag) {
                historyList.flag = true;
                this.conversationList = [];
                this.getAiResponse();
            }
            else {
                if (navigator.userAgent.indexOf('Mobile') === -1) {  //非移动端获取输入焦点
                    this.$nextTick(() => {
                        this.$refs.input.focus();
                    });
                }
            }
        },
        reset() {  //重置对话
            const historyList = this.historyDataList.find(item => item.character === this.choiceCharacter);
            const character = this.character.find(item => item.name === this.choiceCharacter);
            historyList.flag = false;  //重置历史对话标志位
            historyList.history = this.data.messages.slice(0, (character.setting ? character.setting.length : 0) + 2);  //重置历史对话数据
            this.handleChoice();
        },
        handleResize() {
            this.pageWidth = window.innerWidth;
            this.containerWidth = document.querySelector('.main-container').offsetWidth;
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
    margin-top: 14px;
    font-size: 18px;
    text-align: center;
    background: none;
    border: none;
}

#delete_button {
    float: right;
    display: block;
    margin-top: 24px;
    margin-right: 14px;
    font-size: 18px;
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