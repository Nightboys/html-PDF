const html_to_pdf = require("html-pdf-node");
const fs = require("fs");
const path = require("path");
const args = process.argv.slice(2);

function get_path(str) {
  return path.isAbsolute(str) ? str : path.join(__dirname, str);
}

// 脚本参数
const argsMap = {
  url: "", // html 地址
  name: "", // 目标文件名
  targetPath: "./", // 目标文件地址
  cityName: '天津轨道交通集团有限公司'
};

// 打印参数
const options = {
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
  displayHeaderFooter: true,

  headerTemplate: `
  <div style="color: #111111;margin: 0 auto;width:14.5cm;font-size: 2.5mm;border-bottom: 0.1mm solid #d6d6d6;padding-bottom: 0.5mm;">
      <span class='title'></span>
	</div>
  `,

  // headerTemplate: `
  // <div  style="width: 12cm; margin: 0 auto; color: black; border-top: solid black 0.5mm; font-size: 2.5mm; padding-top: 5px; text-align: right;">
  //   <span class="title date url pageNumber"></span>
  // </div>
  // `,

  footerTemplate: `
    <div style="color: #111111;width: 14.5cm; margin: 0 auto; color: black; border-top: 0.1mm solid #d6d6d6; font-size: 2.5mm; padding-top: 0.5mm; text-align: right;">
      <span class="pageNumber"></span>
    </div>
  `,
  printBackground: true,  //打印背景图形
};

args.forEach((arg) => {
  const t = arg.split("=");
  argsMap[t[0]] = t[1];
});

if (!argsMap.url) {
  console.error("没有提供文件路径");
  return -1;
}

const _targetPath = get_path(argsMap.targetPath);

const distFileName =
  (argsMap.name || "html_to_pdf_" + new Date().valueOf()) + ".pdf";
const file = {
  url: argsMap.url,
};
const distLocation = _targetPath + distFileName;

async function savePdf() {
  try {
    const output = await html_to_pdf.generatePdf(file, options);
    fs.writeFile(distLocation, output, "binary", function (err) {
      if (err) {
        console.error("文件保存失败", err);
        return -1;
      } else {
        console.log(distFileName + " 文件已保存于 " + _targetPath);
        return 0;
      }
    });
  } catch (e) {
    console.error(e);
    return -1;
  }
}

savePdf();
