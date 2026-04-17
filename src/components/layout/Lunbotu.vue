<template>
    <div class="lunbotu-promo" @mouseenter="stopPlay" @mouseleave="starPlay">
        <!-- 左侧按钮-->
        <a href="javascript:;" class="prev" @click="prev">
            < </a>
                <!--右侧按钮-->
                <a href="javascript:;" class="next" @click="next"> > </a>
                <!-- 核心的 -->
                <ul :style="listStyle">
                    <!-- 添加最后一张图片的克隆（放在最前面） -->
                    <li>
                        <a href="javascript:;">
                            <img :src="imgArr[imgArr.length - 1]" alt="最后一张">
                        </a>
                    </li>

                    <li v-for="(imgsrc, index) in imgArr" :key="index">
                        <a href="javascript:;">
                            <img :src="imgsrc" :alt="'轮播图' + (index + 1)" :class="{ active: realIndex === index }"></a>
                    </li>

                    <!-- 添加第一张图片的克隆（放在最后面） -->
                    <li>
                        <a href="javascript:;">
                            <img :src="imgArr[0]" alt="第一张">
                        </a>
                    </li>
                </ul>
                <!-- 小圆圈 -->
                <ol class="pormo-nav">
                    <li v-for="(imgsrc, index) in imgArr" :key="index" @click="goToSlide(index)"
                        :class="{ current: realIndex === index }"></li>
                </ol>
    </div>
</template>

<script>
export default {
    name: 'HomeView',
    data() {
        return {
            imgArr: ["/lbt01.jpg", "/lbt02.jpg", "/lbt03.jpg"],
            currentIndex: 1,  // 真实的索引（包含克隆图片）
            timer: null,  // 存储定时器
            intervaltimer: 3000,//定时器秒数
            transitionEnabled: true, // 跳转动画
            flag: true, // 节流阀，防止轮播图按钮连续点击造成播放过快
        }
    },
    computed: {
        // 总图片数量（真实图片+2张克隆）
        totalImages() {
            return this.imgArr.length + 2;
        },

        // 计算图片盒子的transform样式
        listStyle() {
            return {
                transform: `translateX(-${this.currentIndex * (100 / this.totalImages)}%)`, // 改用百分比
                transition: this.transitionEnabled ? 'transform 0.5s ease-in-out' : 'none',//是否有跳转动画
                width: `${this.totalImages * 100}%` // 宽度百分比
            }
        },
        // 用户看到的真实索引（0~2），小圆圈的索引
        realIndex() {
            if (this.currentIndex === 0) {
                // 当显示克隆的最后一张时，跳转到imgArr实际的最后一张
                return this.imgArr.length - 1;//3-2=2
            } else if (this.currentIndex === this.totalImages - 1) {
                // 当显示克隆的第一张时，跳转到imgArr实际的第一张
                return 0;
            } else {
                return this.currentIndex - 1;// 正常情况
            }
        }
    },
    methods: {
        // 左右按钮
        prev() {
            if (this.flag) {
                this.flag = false;
                if (this.currentIndex == 0) {
                    this.transitionEnabled = false;// 禁用动画
                    this.currentIndex = this.imgArr.length;  // 到第一张时跳到最后一张
                    // 下一帧恢复动画，setTimeout只调用一次
                    setTimeout(() => {
                        this.transitionEnabled = true;
                    }, 10);
                } 
                this.currentIndex--;  // 正常上一张
                this.flag = true;// 打开节流阀

                // console.log('上一张，当前索引:', this.realIndex, '图片:', this.imgArr[this.realIndex]);
            }
        },
        next() {

            if (this.flag) {
                this.flag = false;
                if (this.currentIndex == this.totalImages-1) {
                    this.transitionEnabled = false;// 禁用动画
                    this.currentIndex = 1;
                    // 下一帧恢复动画，setTimeout只调用一次
                    setTimeout(() => {
                        this.transitionEnabled = true;  // 开动画
                    }, 10)
                }
                this.currentIndex++;
                this.flag = true;// 打开节流阀

                // console.log('下一张，当前索引:', this.realIndex, '图片:', this.imgArr[this.realIndex]);
            }
        },
        //跳转图片
        goToSlide(index) {
            this.currentIndex = index + 1;
            // console.log('跳转到第', index + 1, '张');
        },
        //自动轮播 clearInterval(this.timer);// 停止定时器
        autoPlay() {
            clearInterval(this.timer);// 停止定时器
            //箭头函数没有自己的 this，它会继承父级作用域的 this。
            //在 JavaScript 中，function有自己的 this绑定，会指向 window或 undefined（严格模式）。
            this.timer = setInterval(() => {
                this.next();
            }, this.intervaltimer)
        },
        //鼠标滑进停止播放
        stopPlay() {
            console.log('鼠标滑进函数触发');
            clearInterval(this.timer);// 停止定时器
            this.timer = null;
        },
        // 鼠标滑出播放
        starPlay() {
            console.log('鼠标滑出函数触发');
            this.autoPlay();
        }

    },
    mounted() {
        // 组件加载后开始自动轮播
        this.autoPlay()
    },
    beforeUnmount() {
        // 组件销毁前清除定时器
        this.autoPlay();
        this.timer = null;
    },
    
}
</script>

<style scoped>
/* 组件内部样式 */
/* 整个轮播盒子 */
.lunbotu-promo {
    /* max-width: 420px; */
    flex: 0 0 530px;
    width: 530px;
    height: 160px;
    position: relative;
    overflow: hidden;
    /* 确保容器可以接收鼠标事件 */
    pointer-events: auto;
}

.lunbotu-promo ul {
    width: 300%;
    display: flex;
    height: 100%;
    transition: transform 0.5s ease-in-out;
}

.lunbotu-promo ul li {
    list-style-type: none;
    /* flex: 0 0 100%; */
    width: 100%;
    height: 100%;
}

.lunbotu-promo ul li a {
    width: 100%;
    height: 100%;
    display: block;
}

.lunbotu-promo ul li img {
    width: 100%;
    height: 100%;
    /* object-fit: cover;
    display: block; */
}

/* 按钮 */
.lunbotu-promo .prev,
.lunbotu-promo .next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(000, 000, 000, 0.3);
    font-size: 20px;
    text-decoration: none;
    color: #fff;
    width: 30px;
    height: 30px;
    text-align: center;
    z-index: 10;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.lunbotu-promo:hover .prev,
.lunbotu-promo:hover .next {
    opacity: 1;
}

.lunbotu-promo .prev {
    left: 0;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}

.lunbotu-promo .next {
    right: 0;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}

/* 圆圈 */
ol.pormo-nav {
    background: rgba(255, 255, 255, 0.3);
    z-index: 10;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-85%);
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.lunbotu-promo:hover ol.pormo-nav {
    opacity: 1;
}

ol.pormo-nav li {
    width: 5px;
    height: 5px;
    border-radius: 5px;
    border: 1px solid #333;
    float: left;
    margin: 0 2px;
    cursor: pointer;
}

ol.pormo-nav li.current {
    background: #e4393c;
    border-color: #e4393c;
}

/* 响应式样式 - 直接应用到类上 */
@media screen and (max-width: 1600px) {
    .lunbotu-promo {
        width: 512px;
        flex: 0 0 512px;
    }
}

@media screen and (max-width: 1400px) {
    .lunbotu-promo {
        width: 420px;
        flex: 0 0 420px;
    }
}

@media screen and (max-width: 1366px) {
    .lunbotu-promo {
        width: 400px;
        flex: 0 0 400px;
    }
}

@media screen and (max-width: 1280px) {
    .lunbotu-promo {
        width: 363px;
        flex: 0 0 363px;
    }
}

@media screen and (max-width: 1024px) {
    .lunbotu-promo {
        width: 265px;
        flex: 0 0 265px;
    }
}
</style>