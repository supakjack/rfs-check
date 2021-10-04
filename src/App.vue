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
                  v-model="textarea_billtran"
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
                  v-model="textarea_opservice"
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
import convert from "xml-js";
export default {
  name: "LinedTextarea",
  mounted() {
    this.textarea_opservice = "";
    this.textarea_opservice_json = {};
    this.textarea_billtran = "";
    this.textarea_billtran_json = {};
    this.find_billtran_b = [];
    this.arr_OPServices = [];
  },
  data() {
    return {
      activeItem: "",
      textarea_result: "",
      textarea_opservice: "",
      textarea_billtran: "",
      find_billtran_b: [],
      arr_OPServices: [],
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
      this.textarea_billtran_json = JSON.parse(
        convert.xml2json(this.textarea_billtran, { compact: true, spaces: 4 })
      );
      const arr_BillItems = this.textarea_billtran_json.ClaimRec.BillItems._text.split(
        /\r?\n/
      );
      // console.log(arr_BillItems);

      this.find_billtran_b = await arr_BillItems.filter((row) => {
        const columns = row.split("|");
        if (columns[2] == "B") {
          return row;
        }
      });

      // console.log(this.find_billtran_b);

      this.textarea_opservice_json = JSON.parse(
        convert.xml2json(this.textarea_opservice, { compact: true, spaces: 4 })
      );
      // console.log(this.textarea_opservice_json);
      this.arr_OPServices = this.textarea_opservice_json.ClaimRec.OPServices._text.split(
        /\r?\n/
      );
      // console.log(this.find_billtran_b);
      // console.log(this.arr_OPServices);

      // let set_push = [];

      // this.arr_OPServices.map((OPService, index) => {
      //   this.find_billtran_b.find((b) => {
      //     const columns = b.split("|");
      //     if (OPService.includes(columns[0])) {
      //       console.log(index);
      //       set_push = [
      //         ...set_push,
      //         {
      //           index_op: index,
      //           data: b,
      //         },
      //       ];
      //       return b;
      //     }
      //   });
      // });

      // console.log(set_push);
      const new_ap = [];
      this.arr_OPServices.map((OPService, index) => {
        let last = "";
        new_ap.push(OPService);
        this.find_billtran_b.map((b) => {
          const columns = b.split("|");
          if (OPService.includes(columns[0]) && last != columns[0]) {
            // console.log(index);
            last = columns[0];
            new_ap.push(b);
          }
        });
      });

      this.textarea_result = this.textarea_opservice_json;
      this.arr_OPServices = new_ap;
      // console.log(this.arr_OPServices);

      this.textarea_result.ClaimRec.OPServices._text = "";
      this.arr_OPServices.map((op) => {
        this.textarea_result.ClaimRec.OPServices._text =
          this.textarea_result.ClaimRec.OPServices._text + op + "\n";
      });

      // console.log(this.textarea_result);

      var result = convert.json2xml(this.textarea_result, {
        compact: true,
        spaces: 4,
      });
      console.log(result);
      this.textarea_result = result;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@1,800&display=swap");

#app {
  font-family: "Sarabun", sans-serif;
}
</style>
