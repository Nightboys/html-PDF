var html_to_pdf = require('html-pdf-node');
var fs = require("fs");
let options = {
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--allow-file-access-from-file",
  ],
  format: "A4",
  // height: 1123, //pdf插件打印内容高度：595* 952, A4纸：794×1123
  // width: 794,
  // landscape: true,
  // scale: 2, //缩放0.1-2之间
  margin: {
    top: "15mm",
    bottom: "15mm",
    left: 0,
    right: 0,
  },
  displayHeaderFooter: true, //是否展示页眉页尾
  // 页眉模板
  headerTemplate: `
 <div style="color: #111111;margin: 0 auto;width:14.5cm;font-size: 2.5mm;border-bottom: 0.1mm
solid #d6d6d6;padding-bottom: 0.5mm;">
    <span class='title'></span>
 </div>
 `,
  // headerTemplate: `
  // <div style="width: 12cm; margin: 0 auto; color: black; border-top: solid black 0.5mm; fontsize: 2.5mm; padding-top: 5px; text-align: right;">
  // <span class="title date url pageNumber totalPages"></span>
  // </div>
  // `,
  // 页尾模板
  footerTemplate: `
 <div style="color: #111111;width: 14.5cm; margin: 0 auto; border-top: 0.1mm solid
#d6d6d6; font-size: 2.5mm; padding-top: 0.5mm; text-align: right;">
    <span class="pageNumber"></span>/<span class="totalPages"></span>
 </div>
 `,
  printBackground: true, //打印背景图形
};

function printPDF(param) {
  let file = param.file || [{ url: "https://example.com", name: 'example.pdf' }];
  let distLocation = param.distLocation || ('./' + file[0].name);  //pdf文件保存地址

  // 生成PDF文件并保存至当前文件夹
  html_to_pdf.generatePdfs(file, options).then(output => {
    console.log("PDF Buffer:-", output); // PDF Buffer:- [{url: "https://example.com", name: "example.pdf", buffer: <PDF buffer>}]

    // fs.writeFile('文件路径'，'要写入的内容'，['编码']，'回调函数');
    fs.writeFile(distLocation, output[0].buffer, "binary", function (err) {
      if (err) {
        console.error("文件保存失败", err);
      } else {
        console.log(" 文件已保存！");
      }
    });
  });
}

//执行打印
printPDF({
  file: [{ url: "F:/项目文件/企业预警通app/mobile/hf/bondReports/html/pages/test.html", name: 'test.pdf' }],
  distLocation: './test.pdf'
});

// export default {
//   printPDF
// }
