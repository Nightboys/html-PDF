<template>
  <form class="menu-columns-third" @click.stop v-on:submit.prevent="onSubmit">
    <div class="menu-content">
      <div class="menu-main" v-scroll-fix>
        <ul>
          <li
            :class="[
              o.extraClass,
              {
                'menu-active': i === index,
                'menu-has-selected': o.hasSelected,
                'menu-lines': o.line > 1,
              },
            ]"
            @click="index = i"
            v-for="(o, i) in list"
            :key="i"
          >
            {{ o.name }}
          </li>
        </ul>
      </div>

      <div class="menu-second" v-scroll-fix>
        <ul>
          <li :class="{ 'menu-selected-item': list[index].selectAll }">
            <div>
              <label :for="'selectAll' + index">
                <input
                  class="needsclick"
                  :id="'selectAll' + index"
                  type="checkbox"
                  v-model="list[index].selectAll"
                  @change="clickAll(list[index])"
                />
                {{ list[index].selectAllName }}
              </label>
            </div>
          </li>
          <li
            v-for="(item, idx) in list[index].list"
            :key="idx"
            :class="[item.extraClass, { 'menu-selected-item': item.selected, 'menu-lines': item.line > 1 }]"
          >
            <div>
              <a
                v-if="item.list && item.list.length"
                @click="item.open = !item.open"
                class="menu-arrow"
                :class="{ 'menu-open': item.open }"
              >
                <span></span>
              </a>
              <label :for="item.name + idx + index">
                <input
                  class="needsclick"
                  type="checkbox"
                  :id="item.name + idx + index"
                  v-model="item.selected"
                  @change="checkList(list[index], item)"
                />
                {{ item.name }}
                <span v-if="item.list && item.list.length" :id="item.name + idx + index">市本级</span>
              </label>
              <!-- <a
                v-if="item.list && item.list.length"
                @click="item.open = !item.open"
                class="menu-arrow"
                :class="{ 'menu-open': item.open }"
              ></a> -->
            </div>

            <!--<transition name="third">-->
            <ul v-if="item.open">
              <li :class="{ 'menu-selected-item': item.selectAll }">
                <label :for="'sSelectAll' + index + idx">
                  <input
                    class="needsclick"
                    :id="'sSelectAll' + index + idx"
                    type="checkbox"
                    v-model="item.selectAll"
                    @change="clickAll(item)"
                  />
                  {{ item.selectAllName }}
                </label>
              </li>

              <li
                v-for="(node, k) in item.list"
                :key="k"
                :class="[node.extraClass, { 'menu-selected-item': node.selected, 'menu-lines': node.line > 1 }]"
              >
                <label :for="node.name + idx + index + k">
                  <input
                    class="needsclick"
                    type="checkbox"
                    :id="node.name + idx + index + k"
                    v-model="node.selected"
                    @change="checkList(list[index], item)"
                  />
                  {{ node.name }}
                </label>
              </li>
            </ul>
            <!--</transition>-->
          </li>
        </ul>
      </div>
    </div>

    <div class="menu-btns">
      <a @click="$emit('menuReset', idx)">重置</a>
      <!--<a @click="cancel">取消</a>-->
      <button type="submit">确认</button>
    </div>
  </form>
</template>

<script>
import scrollFix from '../director/scrollFix';

export default {
  props: {
    clist: Array,
    idx: Number,
  },
  directives: {
    scrollFix,
  },
  data() {
    return {
      list: this.handleData(),
      index: 0,
    };
  },
  methods: {
    onSubmit() {
      let selectList = [];
      this.list.forEach((d) => {
        if (d.selectAll && d.value) {
          selectList.push(d);
        } else {
          d.list &&
            d.list.forEach((o) => {
              if (o.list && o.selectAll && o.value) {
                selectList.push(o);
              } else {
                o.list &&
                  o.list.forEach((obj) => {
                    if (o.selectAll && o.value) {
                      selectList.push(obj);
                    } else {
                      obj.selected && selectList.push(obj);
                    }
                  });
              }

              o.selected && selectList.push(o);
            });
        }
      });

      this.$emit('menuSubmit', { idx: this.idx, list: this.list, selectList });
    },
    cancel() {
      this.$parent.cancel();
    },
    menuStatusChange(options) {
      this.$parent.menuStatusChange(
        $.extend(
          {
            idx: this.idx,
            list: this.list,
          },
          options
        )
      );
    },
    clickAll(obj) {
      // console.log(obj, 'obj');
      this.$nextTick(() => {
        obj.list.forEach((o) => {
          o.selected = obj.selectAll;
          if (o.list) {
            o.list.forEach((val) => {
              val.selected = obj.selectAll;
            });
          }
        });

        this.calcCheckAll(this.list[this.index]);

        this.menuStatusChange({ changeGroup: this.list[this.index] });
      });
      this.$emit('menuChange', this.idx);
    },
    checkList(o, item) {
      this.$nextTick(() => {
        this.calcCheckAll(o);

        this.menuStatusChange({ changeGroup: this.list[this.index], item });
      });
      this.$emit('menuChange', this.idx);
    },
    calcCheckAll(o) {
      // console.log('columnthird calcCheckAll', o);

      let selectAll = true,
        hasSelected = false;

      o.list.forEach((obj) => {
        if (!obj.selected) {
          selectAll = false;
        } else {
          hasSelected = true;
        }

        if (obj.list) {
          let sSelectAll = true;

          obj.list.forEach((v) => {
            if (!v.selected) {
              sSelectAll = false;
              selectAll = false;
            } else {
              hasSelected = true;
            }
          });

          obj.selectAll = sSelectAll;
        }
      });

      o.hasSelected = hasSelected;
      o.selectAll = selectAll;
    },
    handleData() {
      // console.log('columnthird handleData')
      // console.log('list',this.clist)
      //debugger

      let arr = $.extend(true, [], this.clist);

      arr.forEach((o) => {
        this.calcCheckAll(o);
      });

      // console.log('handleData arr')
      // console.log(arr)

      return arr;
    },
  },
  watch: {
    clist: {
      deep: true,
      handler() {
        //console.log('watch clist')
        this.list = this.handleData();
      },
    },
  },
};
</script>

<style lang="less">
.menu-columns-third {
  background: #fff;
  flex: auto;
  display: flex;
  flex-direction: column;
  font-size: 0.24rem;
  color: #333;
  border-top: 1px solid #dfdfdf;
  height: 100%;

  .menu-content {
    flex: auto;
    display: flex;
    height: 1px;

    .menu-main {
      flex: none;
      width: 2.66rem;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;

      ul {
        li {
          line-height: 0.7rem;
          padding: 0 0.1rem 0 0.28rem;
          border-bottom: 1px solid #dfdfdf;
          height: 0.7rem;

          &.menu-lines {
            line-height: 0.35rem;
          }

          &.menu-active {
            background: #f6f6f6;
          }

          &.menu-has-selected {
            color: #1482f0;
          }
        }
      }
    }

    .menu-second {
      flex: auto;
      background: #f6f6f6;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;

      @keyframes max-height {
        0% {
          max-height: 0;
        }
        100% {
          max-height: 8rem;
        }
      }

      .third-enter-active {
        animation: max-height 0.2s;
        overflow: hidden;
      }

      .third-leave-active {
        animation: max-height 0.2s reverse;
        overflow: hidden;
      }

      ul {
        li {
          border-bottom: 1px solid #dfdfdf;
          min-height: 0.7rem;
          ul {
            border-top: 1px solid #dfdfdf;

            li {
              // padding: 0 0.1rem 0 0.88rem;
              padding: 0 0.24rem 0 0.88rem;

              &:last-of-type {
                border-bottom: none;
              }

              label {
                padding-left: 0.1rem;

                input {
                  left: auto;
                  // right: 0.12rem;
                  right: 0rem;
                }
              }
            }
          }

          > div {
            display: flex;
            // padding: 0 0.1rem 0 0.32rem;

            padding: 0rem 0.24rem 0rem 0rem;
            position: relative;
            > label {
              span {
                position: absolute;
                right: 0.42rem;
              }
            }
            > a {
              display: block;
              position: relative;
              flex: none;
              // width: 0.6rem;
              width: 0.36rem;
              span {
                display: block;
                position: absolute;
                width: 0.8rem;
                height: 100%;
                top: 0;
                left: 0;
                // background-color: aqua;
                z-index: 10;
              }

              &:after {
                content: '';
                position: absolute;
                top: 40%;
                left: 80%;
                width: 0.1rem;
                height: 0.1rem;
                transform: rotate(-45deg);
                border-left: 1px solid #1482f0;
                border-bottom: 1px solid #1482f0;
                transition: all 0.3s;
              }

              &.menu-open {
                &:after {
                  top: 45%;
                  transform: rotate(135deg);
                }
              }
            }
          }

          &.menu-selected-item {
            > div,
            > label {
              color: #1482f0;
            }
          }

          &.menu-lines {
            label {
              line-height: 0.35rem;
            }
          }

          label {
            display: block;
            line-height: 0.38rem;
            flex: auto;
            overflow: hidden;
            position: relative;
            // padding: 0.16rem 0 0.16rem 0.42rem;
            padding: 0.16rem 0.42rem 0.16rem 0.24rem;

            input {
              position: absolute;
              top: 50%;
              right: 0;
              transform: translateY(-50%);

              &:after {
                background-color: #f6f6f6 !important;
              }
            }
          }
        }
      }
    }
  }
}
</style>
