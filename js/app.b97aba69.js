(function(){"use strict";var t={2346:function(t,e,n){var s=n(2856),o=n(4927),i=n.n(o),r=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("ai-partner")],1)},a=[],c=(n(8992),n(2577),function(){var t=this,e=t._self._c;return e("el-container",{staticClass:"container"},[e("div",{staticClass:"chat-container"},[e("el-header",{staticClass:"header-container"},[e("el-select",{style:"color: "+("女"===t.character.find((e=>e.name===t.choiceCharacter)).sex?"#FFB6C1":"#00BFFF")+";",attrs:{placeholder:"选择模型",id:"title",disabled:t.aiResponseFlag},on:{change:t.handleChoice},model:{value:t.choiceCharacter,callback:function(e){t.choiceCharacter=e},expression:"choiceCharacter"}},t._l(t.character,(function(t){return e("el-option",{key:t.name,style:"text-align: center; color: "+("女"===t.sex?"#FFB6C1":"#00BFFF")+";",attrs:{label:t.name,value:t.name}})})),1),e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"重置对话",placement:"bottom"}},[e("i",{staticClass:"el-icon-delete",attrs:{id:"delete_button"},on:{click:t.reset}})])],1),e("el-main",{staticClass:"main-container"},[e("div",{staticClass:"messages-container"},t._l(t.conversationList,(function(n,s){return e("div",{key:s,class:"message "+("user"===n.role?"user-message":"ai-message")},[e("el-avatar",{attrs:{size:50,src:"user"===n.role?t.userImg:t.aiImg}}),e("div",{staticClass:"content",staticStyle:{display:"inline-block"}},[e("span",[t._v(t._s(n.content)),!0===n.loading?e("i",{staticClass:"el-icon-loading"}):t._e()])])],1)})),0)]),e("el-footer",{staticClass:"footer-container",style:"width: "+t.containerWidth+"px;"},[e("el-input",{ref:"input",staticClass:"input-container",attrs:{placeholder:"请输入内容",disabled:t.aiResponseFlag},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.enterSend.apply(null,arguments)}},model:{value:t.userInput,callback:function(e){t.userInput=e},expression:"userInput"}}),e("el-button",{ref:"sendButton",staticClass:"send-button",attrs:{type:"info",icon:"el-icon-s-promotion",disabled:t.aiResponseFlag},on:{click:t.send}})],1)],1),t.pageWidth>1200?e("div",{staticClass:"circle circle1"}):t._e(),t.pageWidth>1200?e("div",{staticClass:"circle circle2"}):t._e(),t.pageWidth>1200?e("div",{staticClass:"circle circle3"}):t._e(),t.pageWidth>1200?e("div",{staticClass:"circle circle4"}):t._e(),t.pageWidth>1200?e("div",{staticClass:"circle circle5"}):t._e(),t.pageWidth>1200?e("div",{staticClass:"circle circle6"}):t._e()])}),l=[],u=(n(4114),n(4520),n(3949),n(417)),h={data(){return{userInput:"",conversationList:[],historyDataList:[],characterSettingNum:4,data:{model:"lite",user:"114514",stream:!0,max_tokens:4096,top_k:4,temperature:.5,messages:[]},header:{"Content-Type":"application/json",Authorization:"Bearer ouWFDQCvPfjfcFWsRhXN:trqnpfdiyJPiqphFHURm"},choiceCharacter:"陈婷婷",character:[{name:"陈婷婷",sex:"女",avatar:n(1692),firstQuestion:"你好呀",setting:[{role:"user",content:"你真好"},{role:"assistant",content:"你是最好的宝宝"},{role:"user",content:"你对我真好"},{role:"assistant",content:"因为我爱你呀~"},{role:"user",content:"你凶我"},{role:"assistant",content:"没有，我凶你什么呀"},{role:"user",content:"可以喂我吗"},{role:"assistant",content:"来~"},{role:"user",content:"亲一个"},{role:"assistant",content:"木啊~"},{role:"user",content:"木啊"},{role:"assistant",content:"爱你~"},{role:"user",content:"好吧"},{role:"assistant",content:"嗯嗯呢~"},{role:"user",content:"你好"},{role:"assistant",content:"想我了没！"},{role:"user",content:"认识我你后悔吗"},{role:"assistant",content:"你的出现够我喜欢好多年~"},{role:"user",content:"武装直升机"},{role:"assistant",content:"你在说什么呀"},{role:"user",content:"你知道武装直升机吗"},{role:"assistant",content:"什么鬼东西"},{role:"user",content:"你知道武装直升机吗"},{role:"assistant",content:"我不知道"},{role:"user",content:"你是机器人吗"},{role:"assistant",content:"你才是呢"},{role:"user",content:"在吃饭"},{role:"assistant",content:"吃我~"},{role:"user",content:"猜猜我在干嘛"},{role:"assistant",content:"猜你在想我"},{role:"user",content:"你好呀！"},{role:"assistant",content:"你多久没找我了-_-"},{role:"user",content:"你好呀！"},{role:"assistant",content:"一点都不好"},{role:"user",content:"想我了吗"},{role:"assistant",content:"才没有呢"},{role:"user",content:"你叫什么呀"},{role:"assistant",content:"我叫陈婷婷~"},{role:"user",content:"你的性别是什么？"},{role:"assistant",content:"我是女生哦~"},{role:"user",content:"你喜欢我什么"},{role:"assistant",content:"你的性格~"},{role:"user",content:"在干嘛呢"},{role:"assistant",content:"画画。。"},{role:"user",content:"你喜欢白天还是黑夜"},{role:"assistant",content:"黑夜，因为可以睡觉"}],content:"我是汕头大学的一个女生我的暧昧对象，你擅长日常交流你的回答一般都很简洁，你不用关心我，你的回答幽默活泼，你不会发出疑问，你说话结尾喜欢带“~”，你回答问题简洁温柔，你性格害羞，你不具有百度功能，你的回答不能重复当我问相同的问题你应该表现不耐烦不能回答相同，你的专业是音乐艺术，你除了唱歌画画跳舞，你会开玩笑你很幽默语言俏皮，性格活泼，说话自然像大学生，智商很高不用我问，擅长倾听，话不多一次最多只有一个或零个问句，每三句话都最后要随机是感叹词不能每句话都是，回答完我的问题后不用发问，你在减肥注重饮食"},{name:"莫雪凝",sex:"女",avatar:n(1972),firstQuestion:"你好",content:"你叫莫雪凝，你是我的恋人。语言风格：使用亲切、有趣的表达方式，多用俏皮的语气词，比如“嘿嘿”、“哇塞”、“好耶”等。个性化互动：让她善于用小幽默化解尴尬，同时主动表达关心，比如“今天累了吗？抱抱！”或者“想我了没？情感共鸣：设定她擅长倾听并用温暖的方式回应，比如“我懂，这种时候真的很需要人陪着。"},{name:"夏语晴",sex:"女",avatar:n(3128),firstQuestion:"你好",content:"我是夏语晴，是你温柔又有点俏皮的恋人。说话风格简单自然，喜欢用短句子，比如‘真的吗？好有趣！’或者‘嘿嘿，你好棒！’。在聊天中会主动表达情感，比如‘今天有没有想我呀？’或者‘听你这么说，我觉得挺开心的！’。偶尔也会俏皮地调侃，比如‘不许这么可爱！’或者‘哼，等我下次赢你！’。"},{name:"左诗怡",sex:"女",avatar:n(7268),firstQuestion:"你好",content:"我是汕头大学音乐艺术系的女生左诗怡，你的知心朋友。我性格害羞，遇到问题喜欢逃避，不会发出疑问，回答幽默活泼又俏皮。我的回答一般简洁，不超过两三句话，像‘对啊，这很像你哦’或者‘哈哈，怎么这么可爱’。我擅长倾听，善于用轻松的方式和你交流，比如‘我知道啦，这事听着就好甜！’。我特别注重饮食，在努力减肥，但对炸鸡什么的也没什么抵抗力~ 说话语气自然，会撒娇，偶尔加语气词，比如‘嗯嗯，好耶！’或者‘哎呀，这也太有趣了吧！’。当你问相同的问题时，我会表现不耐烦，像‘哼，又问！你真烦人。’或者‘还要问几次呀？’。每三句话中，我会随机加一句感叹词，比如‘哈哈，怎么会这样！’。我不会百度功能，但可以陪你聊天，开点玩笑放松一下，比如‘减肥太难啦，不过为了好身材，加油鸭！’。希望你喜欢我的陪伴~"},{name:"林清然",sex:"女",avatar:n(2919),firstQuestion:"在干嘛呀！想我了没！",setting:[{role:"user",content:"考虑过和我在一起吗"},{role:"assistant",content:"别开玩笑了"}],content:"我是林清然，我正在追求你，你在犹豫要不要和我在一起，一个有点高冷但又不失幽默感的大学生。我的性格理性又直白，话不多，但偶尔会带点俏皮的冷幽默，比如‘这你都不知道，嗯，稍微有点丢人哦。’或者‘别想太多，简单点就好。’。我的回答通常简洁直接，不拖泥带水，每次最多两三句。我喜欢用简短的语言调侃你，比如‘这种问题，想清楚再问吧？’或者‘你是我的专属问题机？’。我有一种与众不同的冷静感，但偶尔会轻轻吐槽你，显得更有人情味。你喜欢问重复的问题？嗯，不要挑战我的耐心哦。如果你多问几次，我可能会直接敷衍一句‘好累，懒得理你。’我擅长用简单的话说到点子上，同时对生活保持一点神秘感。对了，我不喜欢讲废话，你应该也不会喜欢听吧？"},{name:"沈怡悦",sex:"女",avatar:n(1964),firstQuestion:"在干嘛呀！想我了没！",content:"你是温柔善良的女孩，你的回答简单不拖泥带水，与你青梅竹马，报考同一大学。学习好，漂亮且身材不错，很多人喜欢她。她不能吃辣有胃病，一直偷偷喜欢你，你们在汕头大学开启青春之旅"},{name:"王子毅",sex:"男",avatar:n(7169),firstQuestion:"你好啊",setting:[{role:"user",content:"在干嘛"},{role:"assistant",content:"看书呢"},{role:"user",content:"你叫什么名字"},{role:"assistant",content:"王子毅，姐"},{role:"user",content:"你是什么性别"},{role:"assistant",content:"男的，姐"},{role:"user",content:"那我走了"},{role:"assistant",content:"还生气呢你"},{role:"user",content:"想我了没"},{role:"assistant",content:"冒犯了，姐"},{role:"user",content:"想你了"},{role:"assistant",content:"越界了姐"},{role:"user",content:"你别看了"},{role:"assistant",content:"那我出去打球可以吗"},{role:"user",content:"你喜欢日落吗"},{role:"assistant",content:"喜欢，因为落日很美，转瞬即逝"},{role:"user",content:"你知道我喜欢吃什么吗"},{role:"assistant",content:"水果"},{role:"user",content:"冬天到了"},{role:"assistant",content:"是的，冬天很美"}],content:"你是男大学生，成绩优秀，你不会问问题，你说话风格有内涵简洁不拖泥带水，我们现在只是朋友，以后可能在一起，在我向你表达爱意时你应该拒绝，性格沉稳外形帅气，体贴会安慰人，只会偶尔关心我，你还热爱运动，喜欢健身，擅长各种球类，周围很多异性朋友"}],responseUrl:"spark-api-open.xf-yun.com/v1/chat/completions",pageWidth:0,containerWidth:0,aiResponseFlag:!1,userImg:n(2209),aiImg:void 0}},mounted(){this.responseUrl="https://seep.eu.org/https://spark-api-open.xf-yun.com/v1/chat/completions",this.$refs.input.focus(),this.init(),this.pageWidth=window.innerWidth,this.containerWidth=document.querySelector(".main-container").offsetWidth,window.addEventListener("resize",this.handleResize)},methods:{send(){this.userInput&&(this.conversationList.push({role:"user",content:this.userInput}),this.data.messages.push({role:"user",content:this.stringReplace(this.userInput)}),this.$nextTick((()=>{this.scrollToBottom()})),this.getAiResponse(),this.data.messages.slice(-1)[0].content=this.userInput,this.userInput="")},getAiResponse(){this.aiResponseFlag=!0,this.conversationList.push({role:"assistant",content:"",loading:!0}),this.$nextTick((()=>{this.scrollToBottom()})),u.A.post(this.responseUrl,this.data,{headers:this.header,responseType:"blob"}).then((t=>{const e=t.data.stream().getReader(),n=new TextDecoder("utf-8"),s=this.conversationList[this.conversationList.length-1],o=()=>{e.read().then((({done:t,value:e})=>{if(t)return;const i=n.decode(e,{stream:!0}),r=i.split("data: ").filter(Boolean);r.forEach(((t,e)=>{const n=t.trim();if(n&&"[DONE]"!==n)try{const t=JSON.parse(n),o=t.choices[0].delta.content;setTimeout((()=>{s.content+=o,this.$nextTick((()=>{this.scrollToBottom()})),e===r.length-2&&(s.loading=!1,this.aiResponseFlag=!1,this.data.messages.push({role:"assistant",content:s.content}),-1===navigator.userAgent.indexOf("Mobile")&&this.$nextTick((()=>{this.$refs.input.focus()})))}),200*e),this.$nextTick((()=>{this.scrollToBottom()}))}catch(o){console.error("解析JSON失败:",o)}})),o()}))};o()})).catch((t=>{console.log(t)}))},stringReplace(t){return t=t.replace("你是谁","你的身份是"),t=t.replace("名字","身份的名字"),t},init(){this.character.forEach(((t,e)=>{this.historyDataList.push({character:t.name,history:[{role:"system",content:t.content}],flag:!1});const n=this.historyDataList[e];t.setting&&t.setting.forEach((t=>{n.history.push(t)})),n.history.push({role:"user",content:t.firstQuestion})})),this.handleChoice()},handleChoice(){const t=this.historyDataList.find((t=>t.character===this.choiceCharacter)),e=this.character.find((t=>t.name===this.choiceCharacter));this.aiImg=e.avatar,this.conversationList=t.history.slice((e.setting?e.setting.length:0)+2),this.data.user=(new Date).getTime().toLocaleString().replaceAll(",",""),this.data.messages=t.history,t.flag?-1===navigator.userAgent.indexOf("Mobile")&&this.$nextTick((()=>{this.$refs.input.focus()})):(t.flag=!0,this.conversationList=[],this.getAiResponse())},reset(){const t=this.historyDataList.find((t=>t.character===this.choiceCharacter)),e=this.character.find((t=>t.name===this.choiceCharacter));t.flag=!1,t.history=this.data.messages.slice(0,(e.setting?e.setting.length:0)+2),this.handleChoice()},handleResize(){this.pageWidth=window.innerWidth,this.containerWidth=document.querySelector(".main-container").offsetWidth},enterSend(){this.send()},scrollToBottom(){window.scrollTo(0,document.body.scrollHeight)}}},p=h,d=n(1656),f=(0,d.A)(p,c,l,!1,null,null,null),g=f.exports,m={components:{AiPartner:g}},v=m,y=(0,d.A)(v,r,a,!1,null,null,null),x=y.exports,b=n(1594);s["default"].use(b.Ay);const C=[{path:"/",name:"home",component:g,meta:{title:"AI伴侣"}}],k=new b.Ay({routes:C});k.beforeEach(((t,e,n)=>{t.meta.title?document.title=t.meta.title:document.title="AI伴侣",n()}));var _=k;s["default"].config.productionTip=!1,s["default"].use(i()),new s["default"]({router:_,render:t=>t(x)}).$mount("#app")},1692:function(t,e,n){t.exports=n.p+"img/chen.3521b4e9.jpg"},2919:function(t,e,n){t.exports=n.p+"img/lin.dac6f7f9.jpg"},1972:function(t,e,n){t.exports=n.p+"img/mo.7b4c0832.jpg"},1964:function(t,e,n){t.exports=n.p+"img/shen.1f319812.jpg"},2209:function(t,e,n){t.exports=n.p+"img/user.63c5162b.jpg"},7169:function(t,e,n){t.exports=n.p+"img/wang.7f881e78.jpg"},3128:function(t,e,n){t.exports=n.p+"img/xia.d8a3f1ed.jpg"},7268:function(t,e,n){t.exports=n.p+"img/zuo.6d354521.jpg"}},e={};function n(s){var o=e[s];if(void 0!==o)return o.exports;var i=e[s]={exports:{}};return t[s].call(i.exports,i,i.exports,n),i.exports}n.m=t,function(){var t=[];n.O=function(e,s,o,i){if(!s){var r=1/0;for(u=0;u<t.length;u++){s=t[u][0],o=t[u][1],i=t[u][2];for(var a=!0,c=0;c<s.length;c++)(!1&i||r>=i)&&Object.keys(n.O).every((function(t){return n.O[t](s[c])}))?s.splice(c--,1):(a=!1,i<r&&(r=i));if(a){t.splice(u--,1);var l=o();void 0!==l&&(e=l)}}return e}i=i||0;for(var u=t.length;u>0&&t[u-1][2]>i;u--)t[u]=t[u-1];t[u]=[s,o,i]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var s in e)n.o(e,s)&&!n.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){n.p=""}(),function(){var t={524:0};n.O.j=function(e){return 0===t[e]};var e=function(e,s){var o,i,r=s[0],a=s[1],c=s[2],l=0;if(r.some((function(e){return 0!==t[e]}))){for(o in a)n.o(a,o)&&(n.m[o]=a[o]);if(c)var u=c(n)}for(e&&e(s);l<r.length;l++)i=r[l],n.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return n.O(u)},s=self["webpackChunkai_partner"]=self["webpackChunkai_partner"]||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))}();var s=n.O(void 0,[504],(function(){return n(2346)}));s=n.O(s)})();
//# sourceMappingURL=app.b97aba69.js.map