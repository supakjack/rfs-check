<template>
  <div>
    <div id="app">
      <div id="nav">
        <div>
          <vs-navbar v-model="activeItem" class="nabarx">
            <div slot="title">
              <div class="flex">
                <div class="flex-initial ...">
                  <img
                    src="@/assets/hh-logo.jpeg"
                    style="max-width: 5rem"
                    alt=""
                  />
                </div>
                <div class="flex-initial mt-6">
                  <vs-navbar-title>
                    <span class="text-2xl">โรงพยาบาลหัวหิน</span>
                  </vs-navbar-title>
                </div>
              </div>
            </div>
          </vs-navbar>
        </div>
      </div>
      <vs-row vs-justify="center" class="mt-5">
        <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <vs-card>
            <div slot="header">
              <div class="flex justify-between ...">
                <span class="text-xl">วางข้อความเพื่อตรวจสอบ</span>
                <vs-button
                  @click="onClickProcessLine"
                  color="danger"
                  type="filled"
                  >คลิกเพื่อตรวจสอบ</vs-button
                >
              </div>
            </div>
            <div>
              <div class="lined-textarea">
                <div
                  class="lined-textarea__lines"
                  v-if="!disabled"
                  :style="{ 'padding-right': longestWidth + 'px' }"
                >
                  <div class="lined-textarea__lines__inner" ref="lines">
                    <p
                      v-for="(line, index) in lines"
                      :key="index"
                      class="lined-textarea__lines__line"
                      :class="{
                        'lined-textarea__lines__line--invalid':
                          invalidLines.includes(line),
                      }"
                      v-html="line"
                    ></p>
                  </div>
                </div>
                <textarea
                  :disabled="disabled"
                  :placeholder="placeholder"
                  class="lined-textarea__content"
                  :class="{
                    'lined-textarea__content--disabled': disabled,
                    'lined-textarea__content--wrap': !nowrap,
                    'lined-textarea__content--nowrap': nowrap,
                  }"
                  v-model="content"
                  v-on:scroll="scrollLines"
                  v-on:input="onInput"
                  v-on:mousedown="detectResize"
                  :style="styles"
                  ref="textarea"
                ></textarea>
                <div class="count-helper" ref="helper"></div>
              </div>
            </div>
          </vs-card>
        </vs-col>
      </vs-row>

      <vs-row vs-justify="center" class="mt-8">
        <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <vs-card>
            <div slot="header">
              <span class="text-xl">ผลลัพธ์</span>
            </div>
            <div>
              <div v-for="(item, index) in results" :key="index">
                <div class="mt-5" v-if="content">
                  <span class="text-xl"
                    >ตรวจพบข้อผิดพลาด '|' มีจำนวน :
                    <span class="text-red-900 text-3xl">
                      {{ item.number }}</span
                    >
                    (ต้องมี 12 เท่านั้น)
                    <br />
                    ณ บรรทัดที่ :
                    <span class="text-red-900 text-3xl">
                      {{ item.index }}
                    </span>
                    <br />
                    ข้อความ :
                    <span class="text-red-900 text-3xl"> {{ item.line }} </span>
                    <hr />
                  </span>
                </div>
              </div>
              <div class="mt-5" v-if="!content || results.length == 0">
                <span class="text-xl">
                  ไม่พบข้อผิดพลาด (กดปุ่มตรวจสอบซ้ำเพื่อตรวจสอบใหม่)
                  <hr />
                </span>
              </div>
            </div>
          </vs-card>
        </vs-col>
      </vs-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "LinedTextarea",
  mounted() {
    this.content = this.value;
    this.syncScroll();
    this.calculateCharactersPerLine();
  },
  data() {
    return {
      results: [],
      content: "",
      widthPerChar: 8, // Hard coded, ajust when necessary
      numPerLine: 1,
      previousWidth: 0,
      scrolledLength: 0,
    };
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    nowrap: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    styles: {
      type: Object,
      default: () => {
        return {
          height: "300px",
        };
      },
    },
    value: {
      type: String,
      default: "",
    },
    validate: {
      type: Function,
      default: () => true,
    },
  },
  computed: {
    invalidLines() {
      const lineNumbers = [];
      this.content.split("\n").forEach((line, index) => {
        if (!this.validate(line)) {
          lineNumbers.push(index + 1);
        }
      });
      return lineNumbers;
    },
    lines() {
      if (this.content === "") return [1];
      const lineNumbers = [];
      let num = 1;
      // Number of lines extended. Seems to work with pre-wrap (has problem with dash)
      function getWrapTimes(sentence, width) {
        if (width <= 0) {
          // Protect against infinite loop
          console.warn(
            "Please set the min-width of textarea to allow at least one character per line."
          );
          return sentence.length + 1; // Seems browser would add one additional space
        }
        const words = sentence.split(" ");
        let currentLine = 1;
        let spaceLeft = width;
        words.forEach((word) => {
          while (spaceLeft === width && word.length >= spaceLeft) {
            currentLine++;
            word = word.slice(width);
          }
          if (spaceLeft === width) {
            spaceLeft -= word.length;
            return;
          }
          if (word.length + 1 > spaceLeft) {
            currentLine++;
            spaceLeft = width;
          }
          spaceLeft -= spaceLeft === width ? word.length : word.length + 1;
        });
        return spaceLeft === width ? currentLine - 1 : currentLine;
      }
      this.content.split("\n").forEach((line) => {
        const wrapTimes = getWrapTimes(line, this.numPerLine) - 1;
        lineNumbers.push(num);
        for (let i = 0; i < wrapTimes; i++) {
          lineNumbers.push("&nbsp;");
        }
        num++;
      });
      return lineNumbers;
    },
    longestWidth() {
      for (let i = this.lines.length - 1; i >= 0; i--) {
        if (this.lines[i] === "&nbsp;") continue;
        return (this.lines[i] + "").length * this.widthPerChar + 10; // 10px base padding-right
      }
    },
  },
  watch: {
    // When left area grows/shrinks e.g. 9 => 10; 100 => 99
    longestWidth(val, oldVal) {
      if (val !== oldVal) {
        this.$nextTick(() => this.calculateCharactersPerLine());
      }
    },
    nowrap() {
      this.calculateCharactersPerLine();
    },
    value(val) {
      if (val !== this.content) {
        this.content = val;
      }
    },
    content(val) {
      if (!val) {
        this.results = [];
      }
    },
  },
  methods: {
    async onClickProcessLine() {
      this.results = [];
      var text = this.content;
      var lines = text.split(/\r?\n/);
      console.log(lines);
      console.log(lines.length);
      await lines.map((line, index) => {
        let number = 0;
        for (var i = 0; i < line.length; i++) {
          if (line.charAt(i) == "|") {
            number = number + 1;
          }
        }
        if (number != 12) {
          this.results.push({
            number: number,
            index: index + 1,
            line: line,
          });
        }
      });

      console.log(this.results);
    },
    calculateCharactersPerLine() {
      // May be +-1 off real value >_<
      if (this.nowrap) {
        this.numPerLine = Number.MAX_SAFE_INTEGER;
        return;
      }
      const textarea = this.$refs.textarea;
      const styles = getComputedStyle(textarea);
      const paddingLeft = parseFloat(styles.getPropertyValue("padding-left"));
      const paddingRight = parseFloat(styles.getPropertyValue("padding-right"));
      const fontSize = styles.getPropertyValue("font-size");
      const fontFamily = styles.getPropertyValue("font-family");
      const width = textarea.clientWidth - paddingLeft - paddingRight;
      const helper = this.$refs.helper;
      helper.style.fontSize = fontSize;
      helper.style.fontFamily = fontFamily;
      helper.innerHTML = "";
      for (let num = 1; num < 999; num++) {
        helper.innerHTML += "a";
        if (helper.getBoundingClientRect().width > width) {
          this.numPerLine = num - 1;
          break;
        }
      }
    },
    detectResize() {
      const textarea = this.$refs.textarea;
      const { clientWidth: w1, clientHeight: h1 } = textarea;
      const detect = () => {
        const { clientWidth: w2, clientHeight: h2 } = textarea;
        if (w1 !== w2 || h1 !== h2) {
          this.calculateCharactersPerLine();
        }
      };
      const stop = () => {
        this.calculateCharactersPerLine();
        document.removeEventListener("mousemove", detect);
        document.removeEventListener("mouseup", stop);
      };
      document.addEventListener("mousemove", detect);
      document.addEventListener("mouseup", stop);
    },
    onInput() {
      this.$emit("input", this.content);
      this.recalculate();
    },
    recalculate() {
      const textarea = this.$refs.textarea;
      const width = textarea.clientWidth;
      if (width !== this.previousWidth) {
        this.calculateCharactersPerLine();
      }
      this.previousWidth = width;
    },
    scrollLines(e) {
      this.scrolledLength = e.target.scrollTop;
      this.syncScroll();
    },
    syncScroll() {
      this.$refs.lines.style.transform = `translateY(${-this
        .scrolledLength}px)`;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@1,800&display=swap");

#app {
  font-family: "Sarabun", sans-serif;
}
.lined-textarea {
  display: flex;
  font-size: 13px;
  line-height: 150%;
  font-family: Helvetica, monospace;
}
.lined-textarea__lines {
  background-color: #f0f0f0;
  border: 1px solid #d7e2ed;
  border-radius: 10px 0 0 10px;
  border-right-width: 0;
  padding: 15px 10px 15px 15px;
  overflow: hidden;
  position: relative;
}
.lined-textarea__lines__inner {
  position: absolute;
}
.lined-textarea__lines__line {
  text-align: right;
}
.lined-textarea__lines__line--invalid {
  font-weight: bold;
  color: red;
}
.lined-textarea__content {
  border: 1px solid #d7e2ed;
  border-radius: 0 10px 10px 0;
  border-left-width: 0;
  margin: 0;
  line-height: inherit;
  font-family: monospace;
  padding: 15px;
  width: 100%;
  overflow: auto;
}
.lined-textarea__content--wrap {
  white-space: pre-wrap;
}
.lined-textarea__content--nowrap {
  white-space: pre;
}
@supports (-ms-ime-align: auto) {
  .lined-textarea__content--nowrap {
    white-space: nowrap;
  }
}
.lined-textarea__content--disabled {
  border-radius: 10px;
  border-left-width: 1px;
}
.lined-textarea__content:focus {
  outline: none;
}
.count-helper {
  position: absolute;
  visibility: hidden;
  height: auto;
  width: auto;
}
</style>