<template>
  <div class="pagination">
    <!-- 结构 上 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 结构 中 -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-if="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo', page)"
      :class="{active:pageNo==page}"
    >
      {{ page }}
    </button>

    <!-- 结构 下 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //计算出连续显示的起始页和结束页
    startNumAndEndNum() {
      //结构参数
      let { pageNo, totalPage, continues } = this;
      //定义两个初始值
      let start = 0,
        end = 0;
      //出现异常情况
      if (continues > totalPage) {
        //进入判断，代表总页数小于连续显示分页数   连续分页为5页，但是总页数只有4页
        start = 1;
        end = totalPage;
      } else {
        //进入判断，代表显示总页数一定大于连续显示分页数
        //连续显示页为5 即如下情况 当前页为 10   8 9 10 11 12  当前页为8   6 7 8 9 10
        //连续显示页为7 即如下情况 当前页为 10  7 8 9 10 11 12 13  当前页为8  5 6 7 8 9 10 11
        //计算开始页和结束页  start = pageNo-parseInt(continues/2)
        //连续显示页为5,当前页为 10 start = 10 - parseInt(5 / 2)  ==> 8  end = 10 + parseInt(5 / 2)  ==> 12
        //连续显示页为7,当前页为 10 start = 10 - parseInt(7 / 2)  ==>  7 end = 10 + parseInt(7 / 2)  ==> 13
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        //特殊情况 start为负数的情况  即 start = 1 - parseInt(5 / 2)  ==> -1 、2 - parseInt(5 / 2)  ==> 0
        //开始页不能为负数或者0
        if (start < 1) {
          //进入判断，纠正start和end的值
          // 当前页为1 1 2 3 4 5   当前页为2  1 2 3 4 5
          start = 1;
          end = continues;
        }
        //结束页不能大于总页数
        if (end > totalPage) {
          //进入判断，纠正start和end的值
          //当前页为 31   27 28 29 30 31   当前页为30     27 28 29 30 31
          start = totalPage - continues + 1;
          end = totalPage;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
  .active {
    background-color: skyblue;
  }
}
</style>
