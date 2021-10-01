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
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-w="6"
          class="p-3"
        >
          <vs-card>
            <div slot="header">
              <div class="flex justify-between ...">
                <span class="text-xl">วางข้อความไฟล์ BILLTRAN</span>
              </div>
            </div>
            <div>
              <div>
                <vs-textarea
                  height="300px"
                  label="วางข้อความไฟล์ BILLTRAN ลงที่นี้"
                  v-model="textarea_opservice"
                />
              </div>
            </div>
          </vs-card>
        </vs-col>
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-w="6"
          class="p-3"
        >
          <vs-card>
            <div slot="header">
              <div class="flex justify-between ...">
                <span class="text-xl">วางข้อความไฟล์ OPSERVICES</span>
              </div>
            </div>
            <div>
              <div>
                <vs-textarea
                  height="300px"
                  label="วางข้อความไฟล์ OPSERVICES ลงที่นี้"
                  v-model="textarea_billtran"
                />
              </div>
            </div>
          </vs-card>
        </vs-col>
      </vs-row>
      <vs-row vs-justify="center">
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-w="12"
          class="p-3"
        >
          <vs-card>
            <div slot="header">
              <div class="flex justify-between ...">
                <span class="text-xl">ผลลัพธ์ประมวลผลไฟล์ opservice ใหม่</span>
                <div class="">
                  <vs-button
                    @click="onClickProcessLine"
                    color="danger"
                    type="filled"
                    >คลิกเพื่อตรวจสอบ</vs-button
                  >
                  <vs-button
                    @click="onClickProcessLine"
                    color="success"
                    type="filled"
                    >คลิกเพื่อคัดลอก</vs-button
                  >
                </div>
              </div>
            </div>
            <div>
              <div>
                <vs-textarea
                  height="300px"
                  :readonly="true"
                  label="ดูผลลัพธ์ประมวลผลไฟล์ opservice ใหม่ที่นี้ "
                  v-model="textarea_result"
                />
              </div>
            </div>
          </vs-card>
        </vs-col>
      </vs-row>
    </div>
  </div>
</template>

<script>
// import convert from "xml-js";
export default {
  name: "LinedTextarea",
  mounted() {
    this.textarea_opservice = "";
    this.textarea_opservice_json = {};
    this.textarea_billtran = "";
    this.textarea_billtran_json = {};
  },
  data() {
    return {
      activeItem: "",
      textarea_result: "",
      textarea_opservice: "",
      textarea_billtran: "",
    };
  },
  // watch: {
  //   // When left area grows/shrinks e.g. 9 => 10; 100 => 99
  //   textarea_opservice(val, oldVal) {
  //     if (val !== oldVal) {
  //       // const x2js = new X2JS();
  //       // this.textarea_opservice_json = x2js.xml_str2json(this.textarea_opservice)
  //       // console.log(this.textarea_opservice_json);
  //       // var result1 = convert.xml2json(this.textarea_opservice, {compact: true, spaces: 4});
  //       // console.log(result1);
  //       // this.$nextTick(() => this.calculateCharactersPerLine());
  //     }
  //   },
  //   textarea_billtran(val, oldVal) {
  //     if (val !== oldVal) {
  //       console.log(val);
  //     }
  //   },
  // },
  methods: {
    async onClickProcessLine() {
      // const x2js = new X2JS();
      // const t = x2js.xml_str2json(this.textarea_opservice)
      this.textarea_opservice_json = JSON.parse(
        convert.xml2json(this.textarea_opservice, { compact: true, spaces: 4 })
      );
      console.log(this.textarea_opservice_json.ClaimRec.BillItems._text);
      this.textarea_billtran_json = JSON.parse(
        convert.xml2json(this.textarea_billtran, { compact: true, spaces: 4 })
      );
      // console.log(this.textarea_billtran_json);
      const result = convert.js2xml(this.textarea_opservice_json); 
      console.log(result);
      console.log(this.textarea_opservice_json);

    },
    // async onClickProcessLine() {
    //   this.results = [];
    //   var text = this.content;
    //   var lines = text.split(/\r?\n/);
    //   console.log(lines);
    //   console.log(lines.length);
    //   await lines.map((line, index) => {
    //     let number = 0;
    //     for (var i = 0; i < line.length; i++) {
    //       if (line.charAt(i) == "|") {
    //         number = number + 1;
    //       }
    //     }
    //     if (number != 12) {
    //       this.results.push({
    //         number: number,
    //         index: index + 1,
    //         line: line,
    //       });
    //     }
    //   });
    //   console.log(this.results);
    // },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@1,800&display=swap");

#app {
  font-family: "Sarabun", sans-serif;
}
</style>
