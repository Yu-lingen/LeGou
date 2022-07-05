<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="enterCategory" @mouseleave="leaveCategory">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                :class="{ cur: curIndex === index }"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: curIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
//引入Vuex的mapState方法
import { mapState } from "vuex";
//引入防抖与节流，lodaash
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      curIndex: -1,
      show: true,
    };
  },
  computed: {
    //使用mapState映射数据到导航栏组件中的计算属性里
    ...mapState({
      //这是一个简写形式的函数，每次用到这个计算属性时，函数会自动执行一次
      categoryList: state => state.home.categoryList,
    }),
  },
  methods: {
    //通过throttle实现防抖
    changeIndex: throttle(function (index) {
      //index是鼠标以上某一个一级分类的元素的索引值
      //如果用户移动鼠标过快，且鼠标移入的回调函数中需要完成大量操作
      //导致浏览器没有足够的时间处理，就会出现卡顿的情况，所以要进行节流操作
      this.curIndex = index;
    }, 50),
    //路由跳转传参
    goSearch(event) {
      //目标是路由跳转，利用编程式路由跳转 + 事件委派来实现
      //事件委派存在的问题：如果将事件委派给父元素，则需要判断点击的是a标签，而不是兄弟标签{h3,dt,d1,em}
      //通过自定义属性解决

      //获取点击的事件对象
      let element = event.target;
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;

      //传参方法,需要传递query参数给search路由组件
      //第一个参数为location,目标路由
      let location = { name: "search" };
      //第二个参数为query,具体到那级的id
      let query = { categoryName: categoryname };
      //判断是否是a标签，通过自定义属性。data-categoryname来判断，如果在event.taget.dataset中携带categoryname,则是a标签
      if (categoryname) {
        //判断是属于哪级别标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
      } else return;
      //拼串操作，把两个参数拼接一起
      location.query = query;
      if (this.$route.params) location.params = this.$route.params;
      //编程式路由导航跳转
      this.$router.push(location);
    },
    //动态决定category组件是否显示与隐藏
    //当鼠标移入的时候，（无论在home还是search组件中）TypeNav组件显示
    enterCategory() {
      this.show = true;
    },
    //当鼠标移出的时候，且位于search组件时，隐藏TypeNav组件
    leaveCategory() {
      this.curIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
  mounted() {
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: rgb(192, 189, 189);
        }
      }
    }
    //设置进入时，动画样式
    //进入前
    .sort-enter {
      height: 0px;
    }
    //进入后
    .sort-enter-to {
      height: 461px;
      overflow: hidden;
    }
    //进入过程中的动画效果
    .sort-enter-active {
      transition: all 0.3s linear;
    }
  }
}
</style>>
