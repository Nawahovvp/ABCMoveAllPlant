let sortKey = "CumPercent", sortDir = "asc";
let allData = [], filteredData = [];
let mode = "all", abcFilter = "", movingFilter = "";
let currentPage = 1;
const rowsPerPage = 25;
let users = [];
let loggedUser = null;
let inventoryUrl;
let selectedPlant = "";
/* ★ ตะกร้า */
let cartItems = [];
const userSheetID = '1eqVoLsZxGguEbRCC5rdI4iMVtQ7CK4T3uXRdx8zE3uw';
const userSheetName = 'EmployeeWeb';
const userUrl = `https://opensheet.elk.sh/${userSheetID}/${userSheetName}`;
const usageUrl = 'https://opensheet.elk.sh/1P8Frv1zvcuO3qt8seU-zMF0FV0TQHyKXLn9GNHVr6kI/MoveAllsum';
const mainsapUrl = 'https://opensheet.elk.sh/1CkfOIe2nDYBLs5aPGkPyZhOeqJkyS7UQ6tuMzxy-mfk/mainsap';
const avgValUrl = 'https://opensheet.elk.sh/1nwXDN6FjmXOHXzlxVv6y0Kv4peU9kjW3q20PAWsp6_4/Sheet1';
const statusUrl = 'https://opensheet.elk.sh/1yP1sq12fSXj00htJewUIugkQCaxA0smO2je7wtEISdw/Orders';
const locationUrl = 'https://opensheet.elk.sh/1x-B1xekpMm4p7fkKucvLjaewtp66uGIp8ZIxJJZAxMk/Sheet1';
const shelfUrl = 'https://opensheet.elk.sh/1KhwMIVL-E3XDixbxLT3o-Qg57-hvy_DW0y-v5oNMWDk/Shelf';
let locationMap = new Map();
let shelfOwnerMap = new Map();
const employeeUrl = 'https://opensheet.elk.sh/1eqVoLsZxGguEbRCC5rdI4iMVtQ7CK4T3uXRdx8zE3uw/Employee';
let employees = [];
const inventoryUrls = {
    '0301': 'https://opensheet.elk.sh/1x-B1xekpMm4p7fkKucvLjaewtp66uGIp8ZIxJJZAxMk/Sheet1',
    '0304': 'https://opensheet.elk.sh/1miQgObvPdIocjf2Mwn-GZxRvDZy0R5gIl1zhxMWvM-E/Sheet1',
    '0307': 'https://opensheet.elk.sh/1C9vfwtdIO-XjHrDkmp5cUahjmcJ3vk8pTzhFCgHBg1Q/Sheet1',
    '0309': 'https://opensheet.elk.sh/1ntRtlRIndxgEZ3udnh7Nj8LSQiaUdAeAg5j8qd_z8sA/Sheet1',
    '0311': 'https://opensheet.elk.sh/1OKDdqLY_TOjjfLJ58xFiq-WHIDbMrxMcDho6FO5Rq8o/Sheet1',
    '0312': 'https://opensheet.elk.sh/1ilYbVsCqA1cSoUnZwwULCmPkdakobICkyq5JpBJyyAU/Sheet1',
    '0313': 'https://opensheet.elk.sh/12FSbkYSB1zi6xo2WGAsM0jFyp3IkIywLFVF0Zn2axpE/Sheet1',
    '0319': 'https://opensheet.elk.sh/1pYJsp3ZVSwQ1h_Ayqp3BrMTsm-ZtLREU03Qw5WUtgAw/Sheet1',
    '0320': 'https://opensheet.elk.sh/1V5uhH1wekza4FLN2VqtVBfgIA1sbTY_mqq4ohnTmW_M/Sheet1',
    '0326': 'https://opensheet.elk.sh/1gtZLR5Tm574o5xRbdrRm9yFzRukGx_UAzUnoah36cxQ/Sheet1',
    '0366': 'https://opensheet.elk.sh/1NtRsaxPkeNb4sAcTm-Tn4oN-o5F6z_56S1nhTg7kvBc/Sheet1',
    '0369': 'https://opensheet.elk.sh/13NYKhEWkWLLnA2DZZEP-zZEz2r33-roUDPMSWoFR3Qk/Sheet1'
};
const lastUpdateApiBase = 'https://script.google.com/macros/s/AKfycbxwPojlkzA-QBknRpN6GIiuwxJo5cyBsVGgXQwneGenfsvSz9YuzuoNf2ZsrtxoKypE3Q/exec';
const lastUpdateApiByPlant = {
    '0304': `${lastUpdateApiBase}?id=1miQgObvPdIocjf2Mwn-GZxRvDZy0R5gIl1zhxMWvM-E`,
    '0307': `${lastUpdateApiBase}?id=1C9vfwtdIO-XjHrDkmp5cUahjmcJ3vk8pTzhFCgHBg1Q`,
    '0309': `${lastUpdateApiBase}?id=1ntRtlRIndxgEZ3udnh7Nj8LSQiaUdAeAg5j8qd_z8sA`,
    '0311': `${lastUpdateApiBase}?id=1OKDdqLY_TOjjfLJ58xFiq-WHIDbMrxMcDho6FO5Rq8o`,
    '0312': `${lastUpdateApiBase}?id=1ilYbVsCqA1cSoUnZwwULCmPkdakobICkyq5JpBJyyAU`,
    '0313': `${lastUpdateApiBase}?id=12FSbkYSB1zi6xo2WGAsM0jFyp3IkIywLFVF0Zn2axpE`,
    '0319': `${lastUpdateApiBase}?id=1pYJsp3ZVSwQ1h_Ayqp3BrMTsm-ZtLREU03Qw5WUtgAw`,
    '0320': `${lastUpdateApiBase}?id=1V5uhH1wekza4FLN2VqtVBfgIA1sbTY_mqq4ohnTmW_M`,
    '0326': `${lastUpdateApiBase}?id=1gtZLR5Tm574o5xRbdrRm9yFzRukGx_UAzUnoah36cxQ`,
    '0366': `${lastUpdateApiBase}?id=1NtRsaxPkeNb4sAcTm-Tn4oN-o5F6z_56S1nhTg7kvBc`,
    '0369': `${lastUpdateApiBase}?id=13NYKhEWkWLLnA2DZZEP-zZEz2r33-roUDPMSWoFR3Qk`
};
const sheetIds = {};
Object.keys(inventoryUrls).forEach(plant => {
    const url = inventoryUrls[plant];
    const parts = url.split('/');
    sheetIds[plant] = parts[3];
});
const plantNames = {
    '0301': 'นวนคร',
    '0303': 'SA-สงขลา',
    '0304': 'พระราม 3',
    '0305': 'ราชบุรี',
    '0307': 'สุราษฎร์',
    '0309': 'นครราชสีมา',
    '0310': 'SA-อุดร 1',
    '0311': 'ศรีราชา',
    '0312': 'พิษณุโลก',
    '0313': 'ภูเก็ต',
    '0315': 'SA-อยุธยา',
    '0319': 'ขอนแก่น',
    '0318': 'คลังวัตถุดิบ',
    '0320': 'ลำปาง',
    '0322': 'SA-อุดร 2',
    '0323': 'SA-ลำลูกกา',
    '0324': 'SA-ปัตตานี',
    '0326': 'วิภาวดี 62',
    '0362': 'SA-หนองแขม',
    '0363': 'SA-ปากเกร็ด',
    '0364': 'SA-บางบัวทอง',
    '0365': 'SA-สมุทรปราการ',
    '0366': 'เชียงใหม่',
    '0367': 'SA-ฉะเชิงเทรา',
    '0368': 'SA-ร้อยเอ็ด',
    '0369': 'ระยอง'
};
const OUT_OF_STOCK_MODE = "out_of_stock";
const OUT_OF_STOCK_WAIT_MODE = "out_of_stock_wait";
//
function toNumber(v) { return parseFloat((v || "0").toString().replace(/,/g, '')) || 0; }
function formatNumber(n) { return Number(n).toLocaleString('th-TH'); }
function formatCurrency(n) { return Number(n).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function formatShortCurrency(n) {
    if (n >= 1e9) return (n / 1e9).toFixed(2) + " พันล้าน";
    if (n >= 1e6) return (n / 1e6).toFixed(2) + " M";
    if (n >= 1e3) return (n / 1e3).toFixed(2) + " K";
    return n.toFixed(2);
}
function getOwnerName(userId) {
    switch (userId) {
        case '7556706': return 'ทศพล (แจ๊ค)';
        case '7512395': return 'ประวิทย์ (เอฟ)';
        case '7513338': return 'อติคุณ ()';
        case '7514198': return 'ทศพล (น๊อต)';
        case '7617585': return 'กิตติเทพ (เทพ)';
        case '7514499': return 'ธนพล (เบิร์ด)';
        case '7512147': return 'เสรีชัย (เบลล์)';
        case '7512141': return 'อาทิตย์ (ม่อน)';
        case '7513235': return 'ฤทธิพงษ์ (เป้)';
        case '7512424': return 'พิพัฒน์ (บัน)';
        case '7513032': return 'วิศรุต (แบงค์)';
        case '7832535': return 'ปรานต์ตะวัน ()';
        case '7834952': return 'นพดล ()';
        default: return userId || '';
    }
}
function calculateKeepQty(r) {
    const avg = r.AvgMonthly;
    if (r.Moving === "Dead" || r.Moving === "Slowly") return 1;
    if (r.Moving === "Slow" && r.ABCValue === "C") return Math.max(1, Math.round(avg * 60));
    if (r.Moving === "Slow" && r.ABCValue === "B") return Math.max(1, Math.round(avg * 60));
    if (r.Moving === "Medium" && r.ABCValue === "C") return Math.max(2, Math.round(avg * 60));
    if (r.Moving === "Slow" && r.ABCValue === "A") return Math.max(3, Math.round(avg * 60));
    if (r.Moving === "Medium" && r.ABCValue === "B") return Math.max(4, Math.round(avg * 60));
    if (r.Moving === "Fast" && r.ABCValue === "C") return Math.max(5, Math.round(avg * 60));
    if (r.Moving === "Medium" && r.ABCValue === "A") return Math.max(6, Math.round(avg * 75));
    if (r.Moving === "Fast" && r.ABCValue === "B") return Math.max(8, Math.round(avg * 90));
    if (r.Moving === "Fast" && r.ABCValue === "A") return Math.max(10, Math.round(avg * 120));
    return Math.max(1, Math.round(avg * 40));
}
/* ★ ฟังก์ชันตะกร้า */
function updateCartCount() {
    const badge = document.getElementById('cartCountBadge');
    if (!badge) return;
    badge.textContent = cartItems.length;
}
function addToCart(item) {
    const exist = cartItems.find(x => x.Material === item.Material && x.StorageBin === item.StorageBin);
    if (exist) {
        exist.Qty = (exist.Qty || 1) + 1;
    } else {
        cartItems.push({
            Material: item.Material,
            Description: item.Description,
            StorageBin: item.StorageBin,
            Qty: 1,
            Pack: 1
        });
    }
    updateCartCount();
}
/* ★ หา Employee ตามรหัสที่กรอก */
function updateEmployeeInfo() {
    const codeInput = document.getElementById('employeeCode');
    const nameLabel = document.getElementById('employeeNameLabel');
    const teamLabel = document.getElementById('employeeTeamLabel');
    if (!codeInput || !nameLabel || !teamLabel) return;
    const id = (codeInput.value || '').trim();
    if (!id) {
        nameLabel.textContent = '';
        teamLabel.textContent = '';
        return;
    }
    // หา row ที่ IDRec ตรงกับรหัสพนักงาน
    const emp = employees.find(e => (e.IDRec || '').toString().trim() === id);
    if (emp) {
        nameLabel.textContent = `ชื่อ: ${emp.Name || '-'}`;
        teamLabel.textContent = `ทีม: ${emp.Team || '-'}`;
    } else {
        nameLabel.textContent = 'ไม่พบรหัสพนักงานนี้';
        teamLabel.textContent = '';
    }
}
function renderCartTable() {
    const tbody = document.getElementById('cartTableBody');
    tbody.innerHTML = "";
    if (cartItems.length === 0) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 6;
        td.className = "cart-empty";
        td.textContent = "ยังไม่มีรายการในตะกร้า";
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }
    cartItems.forEach((item, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${idx + 1}</td>
            <td>${item.Material}</td>
            <td>${item.Description}</td>
            <td>${item.StorageBin}</td>
            <td></td>
            <td></td>
        `;
        const qtyInput = document.createElement('input');
        qtyInput.type = "number";
        qtyInput.min = "0";
        qtyInput.value = item.Qty ?? 1;
        qtyInput.addEventListener('input', () => {
            const v = parseFloat(qtyInput.value);
            item.Qty = isNaN(v) ? 0 : v;
        });
        const packInput = document.createElement('input');
        packInput.type = "number";
        packInput.min = "0";
        packInput.value = item.Pack ?? 1;
        packInput.addEventListener('input', () => {
            const v = parseFloat(packInput.value);
            item.Pack = isNaN(v) ? 0 : v;
        });
        tr.cells[4].appendChild(qtyInput);
        tr.cells[5].appendChild(packInput);
        tbody.appendChild(tr);
    });
}
function openCartModal() {
    renderCartTable();
    updateEmployeeInfo(); // ★ อัปเดตชื่อ/ทีมตามรหัสที่มีอยู่
    document.getElementById('cartModal').style.display = 'flex';
}
function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
}
function clearCart() {
    cartItems = [];
    updateCartCount();
    // ถ้าเปิด modal อยู่ ให้รีเฟรชตารางในตะกร้าด้วย
    const cartModal = document.getElementById('cartModal');
    if (cartModal && cartModal.style.display === 'flex') {
        renderCartTable();
    }
}
function printCart() {
    // ✅ ใช้ cartItems โดยตรง
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        alert("ไม่มีรายการในตะกร้า");
        return;
    }
    // อ่านรหัสพนักงานจากช่องใน Modal
    var empCode = document.getElementById("employeeCode")
        ? document.getElementById("employeeCode").value.trim()
        : "";
    // หา Name & Team จาก employees (Sheet Employee)
    var empName = "";
    var empTeam = "";
    if (empCode && Array.isArray(employees)) {
        var emp = employees.find(function (e) {
            return (e.IDRec || "").toString().trim() === empCode;
        });
        if (emp) {
            empName = emp.Name || "";
            empTeam = emp.Team || "";
        }
    }
    // ✅ เตรียมข้อมูลให้ชื่อฟิลด์ตรงกับโค้ด template เดิม
    var dataForPrint = cartItems.map(function (item) {
        return {
            Material: item.Material || "",
            จำนวน: item.Qty ? parseInt(item.Qty) || 1 : 1,
            Pack: item.Pack ? item.Pack : "",
            IDช่าง: empCode,
            Serial: "-", // ไม่ใช้ Serial = TRUE แล้ว
            Description: item.Description || "",
            Storagebin: item.StorageBin || "",
            ชื่อช่าง: empName,
            Unit: "Pc",
            แผนก: empTeam
        };
    });
    // เปิดหน้าต่างใหม่
    var win = window.open("", "_blank", "width=1024,height=768");
    // แปลงข้อมูลเป็น JSON ปลอดภัย (กัน < กลายเป็น tag)
    var jsonText = JSON.stringify(dataForPrint).replace(/</g, "&lt;");
    // ================== เขียน HTML หน้า Label ==================
    win.document.write("<!DOCTYPE html>");
    win.document.write("<html lang='th'>");
    win.document.write("<head>");
    win.document.write("<meta charset='UTF-8' />");
    win.document.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'/>");
    win.document.write("<title>Label 102x30 mm</title>");
    win.document.write("<script src='https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js'><\/script>");
    win.document.write("<script src='https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js'><\/script>");
    win.document.write("<style>");
    win.document.write("@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;700&display=swap');");
    win.document.write("body{font-family:'Noto Sans Thai',sans-serif;margin:0;padding:0;}");
    win.document.write(".container{display:block;width:106mm;}");
    win.document.write(".sticker{width:106mm;height:30mm;display:flex;flex-direction:row;background:white;box-sizing:border-box;margin-bottom:0;}");
    win.document.write(".label{width:53mm;height:30mm;box-sizing:border-box;padding:1mm;display:flex;flex-direction:column;justify-content:space-between;border-right:0.5px solid #ccc;}");
    win.document.write(".label:last-child{border-right:none;}");
    win.document.write(".row{display:flex;flex-direction:row;align-items:center;margin-bottom:1mm;}");
    win.document.write(".qr{width:10mm;height:10mm;margin-right:5mm;margin-left:3mm;}");
    win.document.write(".material{font-size:24px;font-weight:bold;text-align:left;margin:0;line-height:1;}");
    win.document.write(".technician{font-size:10px;text-align:left;margin:0;margin-right:2mm;line-height:1;}");
    win.document.write(".department{font-size:10px;text-align:left;margin:0;margin-right:2mm;line-height:1;}");
    win.document.write(".description{font-size:10px;font-weight:bold;text-align:left;line-height:1.2;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;word-wrap:break-word;margin:0;margin-left:2mm;}");
    win.document.write(".location{font-size:12px;font-weight:bold;text-align:left;margin-top:1px;margin-bottom:0;line-height:1.1;margin-left:2mm;}");
    win.document.write(".lot-line{display:flex;justify-content:space-between;font-size:12px;font-weight:bold;margin-top:0;margin-bottom:0;line-height:1.1;margin-left:2mm;margin-right:1mm;}");
    win.document.write(".lot{font-size:8px;text-align:left;line-height:1;margin:0;}");
    win.document.write(".barcode{margin-left:2mm;width:15mm !important;height:6mm !important;}");
    win.document.write(".print-button{position:fixed;top:10px;right:10px;padding:8px 16px;background-color:#4CAF50;color:white;border:none;border-radius:5px;cursor:pointer;z-index:1000;}");
    win.document.write(".print-button:hover{background-color:#45a049;}");
    win.document.write(".spinner-container{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,0.8);display:flex;justify-content:center;align-items:center;z-index:2000;}");
    win.document.write(".spinner{border:4px solid #f3f3f3;border-top:4px solid #4CAF50;border-radius:50%;width:40px;height:40px;animation:spin 1s linear infinite;}");
    win.document.write("@keyframes spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}");
    win.document.write("@media print{.print-button,.spinner-container{display:none;}body{margin:0;padding:0;}.container{width:102mm;margin:0;}.sticker{page-break-inside:avoid;margin:0;}}");
    win.document.write("</style>");
    win.document.write("</head>");
    win.document.write("<body>");
    win.document.write("<button class='print-button' onclick='window.print()'>Print Preview</button>");
    win.document.write("<div class='spinner-container' id='spinner'><div class='spinner'></div></div>");
    win.document.write("<div id='app'><p style='text-align:center;'>กำลังโหลดข้อมูล...</p></div>");
    // ================== JS ภายในหน้าพิมพ์ ==================
    win.document.write("<script>");
    win.document.write("var dataFromParent = " + jsonText + ";");
    win.document.write("function loadAndRender(){");
    win.document.write(" var cleanedData = dataFromParent || [];"); // ใช้ข้อมูลจาก parent");
    // ให้ spinner โชว์อย่างน้อย 3 วินาที เหมือนตัวอย่าง
    win.document.write(" setTimeout(function(){");
    win.document.write(" var sp = document.getElementById('spinner'); if(sp) sp.style.display='none';");
    win.document.write(" renderLabels(cleanedData);");
    win.document.write(" }, 3000);");
    win.document.write("}");
    win.document.write("function renderLabels(data){");
    win.document.write(" var app = document.getElementById('app');");
    win.document.write(" app.innerHTML = '<div class=\"container\"></div>';"); // ใช้ container width:106mm");
    win.document.write(" var container = app.querySelector('.container');");
    win.document.write(" var expandedData = [];");
    // ขยายตามจำนวนชิ้น (จำนวน)
    win.document.write(" data.forEach(function(row){");
    win.document.write(" var qty = Math.max(1, parseInt(row.จำนวน) || 1);");
    win.document.write(" for(var i=0;i<qty;i++){ expandedData.push(row); }");
    win.document.write(" });");
    // วาง 2 label ต่อ 1 sticker
    win.document.write(" for(var i=0;i<expandedData.length;i+=2){");
    win.document.write(" var sticker = document.createElement('div');");
    win.document.write(" sticker.className = 'sticker';");
    win.document.write(" var label1 = createLabel(expandedData[i]);");
    win.document.write(" sticker.appendChild(label1);");
    win.document.write(" if(i+1 < expandedData.length){");
    win.document.write(" var label2 = createLabel(expandedData[i+1]);");
    win.document.write(" sticker.appendChild(label2);");
    win.document.write(" } else {");
    win.document.write(" var emptyLabel = document.createElement('div');");
    win.document.write(" emptyLabel.className = 'label';");
    win.document.write(" emptyLabel.innerHTML = '<div class=\"description\">ไม่มีข้อมูล</div>';");
    win.document.write(" sticker.appendChild(emptyLabel);");
    win.document.write(" }");
    win.document.write(" container.appendChild(sticker);");
    win.document.write(" }");
    win.document.write("}");
    win.document.write("function createLabel(row){");
    win.document.write(" var label = document.createElement('div');");
    win.document.write(" label.className = 'label';");
    // แถวบน: QR + Material + ชื่อช่าง + แผนก
    win.document.write(" var rowDiv = document.createElement('div');");
    win.document.write(" rowDiv.className = 'row';");
    win.document.write(" var qrCanvas = document.createElement('canvas');");
    win.document.write(" qrCanvas.className = 'qr';");
    win.document.write(" rowDiv.appendChild(qrCanvas);");
    win.document.write(" var textContainer = document.createElement('div');");
    win.document.write(" textContainer.style.display = 'flex';");
    win.document.write(" textContainer.style.flexDirection = 'column';");
    win.document.write(" var materialDiv = document.createElement('div');");
    win.document.write(" materialDiv.className = 'material';");
    win.document.write(" materialDiv.textContent = row.Material || '';");
    win.document.write(" textContainer.appendChild(materialDiv);");
    win.document.write(" var technicianDiv = document.createElement('div');");
    win.document.write(" technicianDiv.className = 'technician';");
    win.document.write(" var techName = row['ชื่อช่าง'] || '';");
    win.document.write(" techName = techName.replace(/^นาย\\s+/, '');");
    win.document.write(" technicianDiv.textContent = techName;");
    win.document.write(" textContainer.appendChild(technicianDiv);");
    win.document.write(" var departmentDiv = document.createElement('div');");
    win.document.write(" departmentDiv.className = 'department';");
    win.document.write(" departmentDiv.textContent = row['แผนก'] || '';");
    win.document.write(" textContainer.appendChild(departmentDiv);");
    win.document.write(" rowDiv.appendChild(textContainer);");
    win.document.write(" label.appendChild(rowDiv);");
    // Description
    win.document.write(" var desc = document.createElement('div');");
    win.document.write(" desc.className = 'description';");
    win.document.write(" desc.textContent = row.Description || '';");
    win.document.write(" label.appendChild(desc);");
    // บรรทัด Loc + Barcode
    win.document.write(" var locLine = document.createElement('div');");
    win.document.write(" locLine.style.display = 'flex';");
    win.document.write(" locLine.style.alignItems = 'center';");
    win.document.write(" locLine.style.fontSize = '12px';");
    win.document.write(" locLine.style.fontWeight = 'bold';");
    win.document.write(" locLine.style.lineHeight = '1.1';");
    win.document.write(" locLine.style.marginLeft = '2mm';");
    win.document.write(" locLine.style.marginTop = '1px';");
    win.document.write(" locLine.style.marginBottom = '0';");
    win.document.write(" var locText = document.createElement('span');");
    win.document.write(" locText.textContent = 'Loc: ' + (row.Storagebin || '');");
    win.document.write(" locLine.appendChild(locText);");
    win.document.write(" var barcodeCanvas = document.createElement('canvas');");
    win.document.write(" barcodeCanvas.className = 'barcode';");
    win.document.write(" locLine.appendChild(barcodeCanvas);");
    win.document.write(" label.appendChild(locLine);");
    // บรรทัด Lot
    win.document.write(" var now = new Date();");
    win.document.write(" var formattedDate = ");
    win.document.write(" now.getFullYear().toString().slice(2) +");
    win.document.write(" ('0' + (now.getMonth() + 1)).slice(-2) +");
    win.document.write(" ('0' + now.getDate()).slice(-2) +");
    win.document.write(" ('0' + now.getHours()).slice(-2) +");
    win.document.write(" ('0' + now.getMinutes()).slice(-2);");
    win.document.write(" var lot = document.createElement('div');");
    win.document.write(" lot.className = 'lot-line';");
    win.document.write(" var lotSpan = document.createElement('span');");
    win.document.write(" lotSpan.textContent = 'Lot: ' + formattedDate + ' (' + (row.จำนวน || 1) + ') ' + (row.Pack || '') + ' ' + (row.Unit || '');");
    win.document.write(" lot.appendChild(lotSpan);");
    win.document.write(" label.appendChild(lot);");
    // สร้าง QR
    win.document.write(" if (typeof QRCode !== 'undefined') {");
    win.document.write(" QRCode.toCanvas(qrCanvas, row.Material || 'N/A', {");
    win.document.write(" width: 40,");
    win.document.write(" height: 40,");
    win.document.write(" margin: 0,");
    win.document.write(" errorCorrectionLevel: 'L'");
    win.document.write(" }, function(err){ if(err) console.error('QR Error:', err); });");
    win.document.write(" }");
    // สร้าง Barcode
    win.document.write(" if (typeof JsBarcode !== 'undefined' && row.Material) {");
    win.document.write(" JsBarcode(barcodeCanvas, row.Material, {");
    win.document.write(" format: 'CODE128',");
    win.document.write(" width: 1,");
    win.document.write(" height: 15,");
    win.document.write(" displayValue: false,");
    win.document.write(" margin: 0");
    win.document.write(" }, function(err){ if(err) console.error('Barcode Error:', err); });");
    win.document.write(" }");
    win.document.write(" return label;");
    win.document.write("}");
    win.document.write("loadAndRender();");
    win.document.write("<\/script>");
    win.document.write("</body></html>");
    win.document.close();
}
/* =================== เดิม =================== */
async function loadUsers() {
    try {
        const res = await fetch(userUrl);
        users = await res.json();
    } catch (e) {
        console.error(e);
        alert("ไม่สามารถโหลดข้อมูลผู้ใช้ได้");
    }
}
/* ★ โหลดข้อมูล Employee */
async function loadEmployees() {
    try {
        const res = await fetch(employeeUrl);
        employees = await res.json();
        // console.log('employees', employees);
    } catch (e) {
        console.error(e);
        // ถ้าโหลดไม่ได้ ไม่ต้อง alert เพื่อไม่ให้รบกวนการใช้งานหลัก
    }
}
function checkLogin() {
    const remembered = localStorage.getItem('rememberedUser');
    if (remembered) {
        loggedUser = JSON.parse(remembered);
        showUserMenu();
        document.getElementById('plantSelection').style.display = 'block';
        return true;
    }
    const sessionUser = sessionStorage.getItem('loggedUser');
    if (sessionUser) {
        loggedUser = JSON.parse(sessionUser);
        showUserMenu();
        document.getElementById('plantSelection').style.display = 'block';
        return true;
    }
    return false;
}
function showLogin() { document.getElementById('loginModal').style.display = 'flex'; }
function hideLogin() { document.getElementById('loginModal').style.display = 'none'; }
function login() {
  const idUser = document.getElementById('idUserInput').value.trim();
  const password = document.getElementById('passwordInput').value.trim();
  const remember = document.getElementById('rememberMe').checked;

  // ใช้ IDRec แทน
  const user = users.find(u => (u.IDRec || '').toString().trim() === idUser);

  // password = 4 ตัวท้ายของ IDRec
  if (user && password === idUser.slice(-4)) {
    loggedUser = {
      IDUser: idUser,
      Name: user.Name || 'ไม่ระบุ',
      Team: user.Team || '',
      Position: user.ตำแหน่ง || '-',
      Department: user.หน่วยงาน || '-'
    };

    if (remember)
      localStorage.setItem('rememberedUser', JSON.stringify(loggedUser));
    else
      sessionStorage.setItem('loggedUser', JSON.stringify(loggedUser));

    hideLogin();
    showUserMenu();
    document.getElementById('plantSelection').style.display = 'block';
  } else {
    document.getElementById('loginError').textContent =
      'User หรือ Password ไม่ถูกต้อง';
  }
}

function logout() {
    localStorage.removeItem('rememberedUser');
    sessionStorage.removeItem('loggedUser');
    loggedUser = null;
    cartItems = []; // ★ เคลียร์ตะกร้าเมื่อ logout
    updateCartCount();
    document.getElementById('userMenu').style.display = 'none';
    document.getElementById('menuBtn').style.display = 'none';
    document.getElementById("mainCardsSection").style.display = "none";
    document.getElementById("summarySection").style.display = "none";
    document.getElementById("controlsSection").style.display = "none";
    document.getElementById("tableSection").style.display = "none";
    document.getElementById("pagination").style.display = "none";
    document.getElementById('plantSelection').style.display = "none";
    document.getElementById('backBtn').style.display = "none";
    showLogin();
}
function showUserMenu() {
    document.getElementById('menuBtn').style.display = 'block';
    document.getElementById('userID').textContent = `รหัส: ${loggedUser.IDUser}`;
    document.getElementById('userName').textContent = `ชื่อ: ${loggedUser.Name}`;
    document.getElementById('userPosition').textContent = `ตำแหน่ง: ${loggedUser.Position}`;
    document.getElementById('userDepartment').textContent =`หน่วยงาน: ${loggedUser.Department}`;
}
document.getElementById('menuBtn').addEventListener('click', () => {
    const menu = document.getElementById('userMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
document.getElementById('logoutBtn').addEventListener('click', logout);
document.getElementById('loginBtn').addEventListener('click', login);
// =========================
// ✅ HELP MODAL CONTROL
// =========================
function openHelp() {
    const m = document.getElementById('helpModal');
    if (m) m.style.display = 'flex';
    // ปิดเมนู userMenu ด้วย (กันซ้อน)
    const menu = document.getElementById('userMenu');
    if (menu) menu.style.display = 'none';
}
function closeHelp() {
    const m = document.getElementById('helpModal');
    if (m) m.style.display = 'none';
}
const helpBtn = document.getElementById('helpBtn');
if (helpBtn) helpBtn.addEventListener('click', openHelp);
const helpCloseBtn = document.getElementById('helpCloseBtn');
if (helpCloseBtn) helpCloseBtn.addEventListener('click', closeHelp);
// คลิกพื้นที่ดำเพื่อปิด
const helpModal = document.getElementById('helpModal');
if (helpModal) {
    helpModal.addEventListener('click', (e) => {
        if (e.target === helpModal) closeHelp();
    });
}
// กด ESC เพื่อปิด
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeHelp();
});
async function init() {
    await loadUsers();
    await loadEmployees(); // ★ โหลดพนักงานเพิ่ม
    if (!checkLogin()) showLogin();
    const plantSelect = document.getElementById('plantSelect');
    Object.keys(inventoryUrls).sort().forEach(p => {
        const name = plantNames[p] || p;
        plantSelect.add(new Option(`${p} - ${name}`, p));
    });
    /* ★ ผูก event ตะกร้ารวม */
    document.getElementById('cartMainBtn').addEventListener('click', openCartModal);
    document.getElementById('cartCloseBtn').addEventListener('click', closeCartModal);
    document.getElementById('cartPrintBtn').addEventListener('click', printCart);
    document.getElementById('cartClearBtn').addEventListener('click', clearCart); // ★
    const empCodeInput = document.getElementById('employeeCode');
    if (empCodeInput) {
        empCodeInput.addEventListener('input', updateEmployeeInfo);
        empCodeInput.addEventListener('blur', updateEmployeeInfo);
    }
}
init();
document.getElementById('viewBtn').addEventListener('click', () => {
    selectedPlant = document.getElementById('plantSelect').value;
    if (!selectedPlant) { alert('กรุณาเลือก Plant'); return; }
    inventoryUrl = inventoryUrls[selectedPlant];
    if (!inventoryUrl) { alert('ไม่มีข้อมูลสำหรับ Plant นี้'); return; }
    document.getElementById('plantSelection').style.display = 'none';
    document.getElementById('backBtn').style.display = 'block';
    loadData();
});
document.getElementById('backBtn').addEventListener('click', () => {
    document.getElementById('mainCardsSection').style.display = 'none';
    document.getElementById('summarySection').style.display = 'none';
    document.getElementById('controlsSection').style.display = 'none';
    document.getElementById('tableSection').style.display = 'none';
    document.getElementById('pagination').style.display = 'none';
    document.getElementById('backBtn').style.display = 'none';
    document.getElementById('plantSelection').style.display = 'block';
    allData = []; filteredData = []; mode = "all"; abcFilter = ""; movingFilter = ""; currentPage = 1;
    document.getElementById("searchInput").value = "";
    document.getElementById("statusFilter").value = "";
    document.getElementById("responsibleFilter").value = "";
    document.getElementById("plantFilter").disabled = false;
});
async function loadData() {
    const loader = document.getElementById("loader");
    const summarySection = document.getElementById("summarySection");
    const controlsSection = document.getElementById("controlsSection");
    const tableSection = document.getElementById("tableSection");
    loader.style.display = "block";
    summarySection.style.display = "none";
    controlsSection.style.display = "none";
    tableSection.style.display = "none";
    try {
        const [
            invRes, usageRes, mainsapRes, avgValRes, statusRes,
            locationRes, shelfRes
        ] = await Promise.all([
            fetch(inventoryUrl),
            fetch(usageUrl),
            fetch(mainsapUrl),
            fetch(avgValUrl),
            fetch(statusUrl),
            fetch(locationUrl),
            fetch(shelfUrl)
        ]);
        const inv = await invRes.json();
        const usage = await usageRes.json();
        const mainsap = await mainsapRes.json();
        const avgValData = await avgValRes.json();
        const statusData = await statusRes.json();
        const locationData = await locationRes.json();
        const shelfData = await shelfRes.json();
        const navanakornMap = new Map();
        locationData.forEach(r => {
            const mat = (r.Material || '').toString().trim();
            const navQty = toNumber(r.Unrestricted || r["Unrestricted"] || 0);
            if (mat) {
                navanakornMap.set(mat, navQty);
            }
        });
        const statusMap = new Map();
        statusData.forEach(r => {
            const plant = (r.Plant || '').toString().trim();
            const material = (r.Material || '').toString().trim();
            let status = '';
            const keys = Object.keys(r);
            const statusKeys = keys.filter(k =>
                k.toLowerCase().includes('statusmaterial') ||
                k.toLowerCase().includes('status material') ||
                k.toLowerCase().includes('สถานะวัสดุ')
            );
            if (statusKeys.length > 0) status = (r[statusKeys[0]] || '').toString().trim();
            else {
                const alt = keys.filter(k => k.toLowerCase().includes('status'));
                if (alt.length > 0) status = (r[alt[0]] || '').toString().trim();
            }
            if (plant && material) {
                const key = `${plant}-${material}`;
                if (status) statusMap.set(key, status);
            }
        });
        const avgValMap = new Map();
        avgValData.forEach(r => {
            const material = (r.Material || '').toString().trim();
            const avgVal = toNumber(r.AvgVal || r.AvgVAL || r.avgval || 0);
            if (material) avgValMap.set(material, avgVal);
        });
        const usageMap = new Map();
        usage.forEach(r => {
            const plant = (r.Plant || '').toString().trim();
            const material = (r.Material || '').toString().trim();
            if (!plant || !material) return;
            const key = `${plant}-${material}`;
            let qty4m = 0, qty6m = 0, thirtyDay = 0;
            const keys = Object.keys(r);
            const k4 = keys.filter(k => k.toLowerCase().includes('4m') || k.toLowerCase().includes('4 month') || k.toLowerCase().includes('qtyissu'));
            if (k4.length > 0) qty4m = toNumber(r[k4[0]] || 0);
            const k6 = keys.filter(k => k.toLowerCase().includes('6m') || k.toLowerCase().includes('6 month'));
            if (k6.length > 0) qty6m = toNumber(r[k6[0]] || 0);
            const k30 = keys.filter(k => k.toLowerCase().includes('30day') || k.toLowerCase().includes('30 day') || k.toLowerCase().includes('30'));
            if (k30.length > 0) thirtyDay = toNumber(r[k30[0]] || 0);
            usageMap.set(key, {
                Qty4Month: qty4m,
                Qty6Month: qty6m || Math.round(qty4m * 1.5),
                ThirtyDay: thirtyDay
            });
        });
        const mainsapMap = new Map();
        mainsap.forEach(r => {
            const mat = (r.Material || '').toString().trim();
            if (!mat) return;
            mainsapMap.set(mat, {
                Note: r['หมายเหตุ'] || '',
                MultiplyUnit: r['คูณหน่วย'] ? toNumber(r['คูณหน่วย']) : 1,
                Product: r.Product || ''
            });
        });
        locationMap = new Map();
        locationData.forEach(r => {
            const material = (r.Material || '').toString().trim();
            if (!material) return;
            const keys = Object.keys(r);
            const storageKey =
                keys.find(k => k.toLowerCase().includes('storage') && k.toLowerCase().includes('bin')) ||
                keys.find(k => k.toLowerCase().includes('storagebin')) ||
                keys.find(k => k.toLowerCase().includes('bin'));
            if (!storageKey) return;
            const loc = (r[storageKey] || '').toString().trim();
            if (loc) locationMap.set(material, loc);
        });
        shelfOwnerMap = new Map();
        shelfData.forEach(r => {
            const shelf = (r.Shelf || '').toString().trim();
            const userId = (r.UserID || r.UserId || r.userid || '').toString().trim();
            if (shelf && userId) shelfOwnerMap.set(shelf, userId);
        });
        allData = [];
        inv.forEach(r => {
            const plant = (r.Plant || '').toString().trim();
            const material = (r.Material || '').toString().trim();
            if (plant !== selectedPlant || !material) return;
            const key = `${plant}-${material}`;
            const usageInfo = usageMap.get(key) || { Qty4Month: 0, Qty6Month: 0, ThirtyDay: 0 };
            const main = mainsapMap.get(material) || { Note: '', MultiplyUnit: 1, Product: '' };
            const status = statusMap.get(key) || '';
            const avgVal = avgValMap.get(material) || 0;
            const qty4m = usageInfo.Qty4Month;
            const qty6m = usageInfo.Qty6Month;
            const thirtyDay = usageInfo.ThirtyDay;
            const unrestricted = toNumber(r.Unrestricted || r["Unrestricted stock"] || 0);
            const originalValue = toNumber(r["Value Unrestricted"] || r["Value unrestricted"] || 0);
            const description = r["Material description"] || '';
            const keys = Object.keys(r);
            let storageBin = '';
            const sk =
                keys.find(k => k.toLowerCase().includes('storage') && k.toLowerCase().includes('bin')) ||
                keys.find(k => k.toLowerCase().includes('storagebin')) ||
                keys.find(k => k.toLowerCase().includes('bin'));
            if (sk) storageBin = (r[sk] || '').toString().trim();
            let unit = r["Base Unit of Measure"] || '';
            if (!unit) {
                const uk = keys.find(k => k.toLowerCase().includes('unit') || k.toLowerCase().includes('uom'));
                if (uk) unit = (r[uk] || '').toString().trim();
            }
            const navanakornQty = navanakornMap.get(material) || 0;
            let value = avgVal > 0 ? unrestricted * avgVal : originalValue;
            const location = locationMap.get(material) || storageBin || '';
            const shelf = location ? location.substring(0, 3) : '';
            const ownerId = shelfOwnerMap.get(shelf) || '';
            const ownerName = getOwnerName(ownerId);
            allData.push({
                Plant: plant,
                Material: material,
                Description: description,
                StorageBin: storageBin,
                Unit: unit,
                Navanakorn: navanakornQty,
                Unrestricted: unrestricted,
                Value: value,
                Qty6Month: qty6m,
                Qty4Month: qty4m,
                ThirtyDay: thirtyDay,
                AvgDailyUse: qty4m / 120 || 0,
                AvgMonthly: qty4m / 4,
                SafetyStock: 0, ROP: 0, DOS: 0, RecommendedOrder: 0, Mean: 0,
                ABCValue: "", CumPercent: 0, Moving: "",
                ReturnQty: 0, ReturnValue: 0,
                Note: main.Note,
                MultiplyUnit: main.MultiplyUnit,
                Product: main.Product,
                AvgVal: avgVal,
                OriginalValue: originalValue,
                Status: status,
                Location: location,
                Shelf: shelf,
                OwnerId: ownerId,
                OwnerName: ownerName,
                ActualOrder: null, // ✅ ให้เป็น null แทน 0
                _actualOrderTouched: false // ยังไม่เคยแก้
            });
        });
        // หลังจากเติม allData เสร็จ
        loadActualOrdersFromLocalStorage();
        calcABCValue();
        const plantFilter = document.getElementById("plantFilter");
        plantFilter.innerHTML = '';
        const name = plantNames[selectedPlant] || selectedPlant;
        plantFilter.add(new Option(`${selectedPlant} - ${name}`, selectedPlant));
        plantFilter.disabled = true;
        const updateBtn = document.getElementById("updateBtn");
        if (sheetIds[selectedPlant]) {
            updateBtn.style.display = "inline-flex";
            updateBtn.onclick = () => {
                const sheetId = sheetIds[selectedPlant];
                const url = `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;
                window.open(url, '_blank');
            };
        } else {
            updateBtn.style.display = "none";
        }
        const lastLabel = document.getElementById("lastUpdateLabel");
        lastLabel.textContent = "";
        const apiUrl = lastUpdateApiByPlant[selectedPlant];
        if (apiUrl) {
            lastLabel.textContent = "กำลังตรวจสอบเวลาอัปเดต...";
            fetch(apiUrl)
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedTime) {
                        const dt = new Date(data.modifiedTime);
                        const thTime = dt.toLocaleString('th-TH', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        });
                        lastLabel.textContent = `อัปเดตล่าสุด: ${thTime}`;
                    } else {
                        lastLabel.textContent = "";
                    }
                })
                .catch(err => {
                    console.error('Error fetch modifiedTime', err);
                    lastLabel.textContent = "";
                });
        } else {
            lastLabel.textContent = "";
        }
        loader.style.display = "none";
        document.getElementById("mainCardsSection").style.display = "flex";
        document.getElementById("summarySection").style.display = "flex";
        document.getElementById("controlsSection").style.display = "flex";
        document.getElementById("tableSection").style.display = "block";
        document.getElementById("pagination").style.display = "flex";
        setDefaultAndCalculate();
    } catch (e) {
        loader.style.display = "none";
        alert("โหลดข้อมูลไม่สำเร็จ กรุณารีเฟรช");
        console.error(e);
    }
}
function calcABCValue() {
    const sorted = [...allData].sort((a, b) => b.Value - a.Value);
    const total = sorted.reduce((s, r) => s + r.Value, 0);
    let cum = 0;
    sorted.forEach(r => {
        cum += r.Value;
        const pct = total ? (cum / total) * 100 : 0;
        const orig = allData.find(x => x.Material === r.Material && x.Plant === r.Plant);
        if (orig) {
            orig.CumPercent = pct;
            orig.ABCValue = pct <= 70 ? "A" : pct <= 90 ? "B" : "C";
        }
    });
}
function recalculateStockFields(data, params) {
    data.forEach(r => {
        // =========================
        // 1) ค่าพื้นฐาน + แปลงเป็นตัวเลข
        // =========================
        const leadTime = Number(params?.leadTime ?? 5);
        const safetyDays = Number(params?.safety ?? 3);
        const coverDays = Number(params?.cover ?? 40);
        const qty4m = Number(r.Qty4Month || 0);
        const qty6m = Number(r.Qty6Month || 0); // เผื่ออยากใช้ต่อ
        const qty30d = Number(r.ThirtyDay || 0);
        const unrestricted = Number(r.Unrestricted || 0);
        const mul = Number(r.MultiplyUnit || 1);
        // avg ต่อวันจากแต่ละช่วงเวลา
        const avg4mDaily = qty4m / 120; // 4 เดือน = 120 วัน
        const avg30dDaily = qty30d / 30; // 30 วัน = 30 วัน
        // avg ต่อเดือนจาก 4 เดือน (ใช้จัด Moving)
        const avgMonthlyFrom4m = qty4m / 4;
        // =========================
        // 2) Moving Classification (ของเดิม แต่ชัดเจน)
        // =========================
        if (avgMonthlyFrom4m === 0) r.Moving = "Dead";
        else if (avgMonthlyFrom4m < 0.7) r.Moving = "Slowly";
        else if (avgMonthlyFrom4m < 12) r.Moving = "Slow";
        else if (avgMonthlyFrom4m < 30) r.Moving = "Medium";
        else r.Moving = "Fast";
        // เก็บไว้ให้ตารางใช้เหมือนเดิม
        r.AvgMonthly = avgMonthlyFrom4m;
        // =========================
        // 3) Weighted Weight (ฉลาดขึ้น)
        // - Fast ฟัง 30Day มากขึ้น
        // - Slow/Dead ฟัง 4M มากขึ้น
        // - ABC A ไวขึ้น, C ช้าลง
        // =========================
        let w4m = 0.70, w30 = 0.30;
        if (r.Moving === "Fast") { w4m = 0.50; w30 = 0.50; }
        if (r.Moving === "Medium") { w4m = 0.60; w30 = 0.40; }
        if (r.Moving === "Slow") { w4m = 0.80; w30 = 0.20; }
        if (r.Moving === "Slowly" || r.Moving === "Dead") { w4m = 0.90; w30 = 0.10; }
        // ปรับตาม ABC
        if (r.ABCValue === "A") { w4m -= 0.05; w30 += 0.05; }
        if (r.ABCValue === "C") { w4m += 0.05; w30 -= 0.05; }
        // clamp + normalize
        w4m = Math.max(0.05, Math.min(0.95, w4m));
        w30 = 1 - w4m;
        // =========================
        // 4) Outlier Guard (กัน 30Day พุ่ง)
        // ถ้า 30Day ต่อวัน > 4M ต่อวัน * limitMultiplier
        // ให้จำกัดไว้
        // =========================
        const limitMultiplier = 3; // ปรับได้ 2-4 ตามใจ
        let guarded30dDaily = avg30dDaily;
        if (avg4mDaily > 0 && avg30dDaily > avg4mDaily * limitMultiplier) {
            guarded30dDaily = avg4mDaily * limitMultiplier;
        }
        // =========================
        // 5) Seasonal Mode (เอาหมด)
        // แนวคิด: ถ้า 30Day "สูงกว่า" 4M มาก (แปลว่าช่วงนี้กำลังพีค)
        // ให้เพิ่มน้ำหนัก 30Day แบบชั่วคราว แต่ไม่ให้เกินเพดาน
        // =========================
        const seasonalTrigger = 1.8; // ถ้า 30Day > 4M * 1.8 ถือว่าพีค
        const seasonalBoostMax = 0.20; // เพิ่มน้ำหนัก 30Day สูงสุด +0.20
        if (avg4mDaily > 0) {
            const ratio = avg30dDaily / avg4mDaily;
            if (ratio >= seasonalTrigger) {
                // เพิ่ม w30 ตามระดับความพีค แต่ไม่เกิน seasonalBoostMax
                const boost = Math.min(seasonalBoostMax, (ratio - seasonalTrigger) * 0.10);
                w30 = Math.min(0.95, w30 + boost);
                w4m = 1 - w30;
            }
        }
        // =========================
        // 6) AvgDailyUse (ตัวหลักในการคำนวณสต๊อก)
        // =========================
        let avgDailyUse = (avg4mDaily * w4m) + (guarded30dDaily * w30);
        if (!isFinite(avgDailyUse) || avgDailyUse < 0) avgDailyUse = 0;
        r.AvgDailyUse = avgDailyUse;
        // =========================
        // 7) Mean (ฉลาดขึ้น)
        // เดิม: max(ThirtyDay, AvgMonthly)
        // ใหม่: Mean รายเดือน = (AvgMonthly 4M * w4m) + (30Day(ถือเป็น1เดือน) * w30)
        // =========================
        const avgMonthlyFrom30d = qty30d; // 30 วัน = 1 เดือน
        let meanMonthly = (avgMonthlyFrom4m * w4m) + (avgMonthlyFrom30d * w30);
        // guard Mean เหมือนกัน
        if (avgMonthlyFrom4m > 0 && avgMonthlyFrom30d > avgMonthlyFrom4m * limitMultiplier) {
            meanMonthly = (avgMonthlyFrom4m * w4m) + ((avgMonthlyFrom4m * limitMultiplier) * w30);
        }
        if (!isFinite(meanMonthly) || meanMonthly < 0) meanMonthly = 0;
        r.Mean = meanMonthly;
        // =========================
        // 8) Stockout Protection (เอาหมด)
        // ถ้า Fast/Medium แต่ของหมด → เพิ่ม SafetyDays ชั่วคราว
        // (เพื่อกันขาดช่วง lead time)
        // =========================
        let safetyDaysEffective = safetyDays;
        if (unrestricted === 0 && (r.Moving === "Fast" || r.Moving === "Medium")) {
            // เพิ่ม safety อีก 30% ของ coverDays (แต่ไม่ต่ำกว่า +3 วัน)
            const add = Math.max(3, Math.round(coverDays * 0.30));
            safetyDaysEffective = safetyDays + add;
            // ถ้าเป็น ABC A เพิ่มอีกนิด
            if (r.ABCValue === "A") safetyDaysEffective += 2;
        }
        // กัน safetyDaysEffective บาน
        safetyDaysEffective = Math.min(365, Math.max(0, safetyDaysEffective));
        // =========================
        // 9) SafetyStock / ROP / DOS
        // ใช้ AvgDailyUse ใหม่ + safetyDaysEffective
        // =========================
        const d = r.AvgDailyUse || 0;
        const safetyStock = d * safetyDaysEffective;
        const rop = (d * leadTime) + safetyStock;
        const dos = d > 0 ? (unrestricted / d) : 9999;
        r.SafetyStock = Math.round(safetyStock);
        r.ROP = Math.round(rop);
        r.DOS = dos > 9999 ? 9999 : Number(dos.toFixed(1));
        // =========================
        // 10) RecommendedOrder
        // ถ้าคงเหลือ < ROP → เติมให้ครอบคลุม coverDays
        // =========================
        let recommend = 0;
        if (unrestricted < rop) {
            const needed = d * coverDays; // ต้องมีให้ครอบคลุม coverDays
            recommend = needed - unrestricted; // ขาดเท่าไรเติมเท่านั้น
            if (recommend < 0) recommend = 0;
        }
        // ปัดตามแพ็ค
        if (mul > 0) recommend = Math.ceil(recommend / mul) * mul;
        r.RecommendedOrder = Math.round(recommend);
        // =========================
        // 11) สั่งจริง (ไม่ทับถ้า user เคยแก้)
        // =========================
        if (!r._actualOrderTouched) {
            if (r.ActualOrder == null || isNaN(r.ActualOrder)) {
                r.ActualOrder = r.RecommendedOrder;
            }
        }
        // =========================
        // 12) กฎตัดสั่งเดิมของคุณ (คงไว้ แต่ใช้ Mean ใหม่ที่นิ่งกว่า)
        // =========================
        if (r.Mean === 0 && (r.Moving === "Slow" || r.Moving === "Slowly")) r.RecommendedOrder = 0;
        if (qty30d === 0 && (r.Moving === "Slow" || r.Moving === "Slowly")) r.RecommendedOrder = 0;
        if (qty30d > qty4m && r.Moving === "Slowly") r.RecommendedOrder = 0;
        if (r.Moving === "Slowly" && qty30d === 1 && qty4m === 1) {r.RecommendedOrder = 0;

        }

        // =========================
        // 13) ReturnQty / ReturnValue (เดิม)
        // =========================
        const keepQty = calculateKeepQty(r);
        const returnQty = Math.max(0, unrestricted - keepQty);
        const unitPrice = unrestricted > 0 ? (Number(r.Value || 0) / unrestricted) : 0;
        r.ReturnQty = Math.round(returnQty);
        r.ReturnValue = returnQty * unitPrice;
    });
}
function populateOwnerFilter(dataList) {
    const sel = document.getElementById("responsibleFilter");
    const current = sel.value;
    sel.innerHTML = '<option value="">ทุกคน</option>';
    const owners = new Map();
    let hasEmpty = false;
    (dataList || allData).forEach(r => {
        if (r.OwnerId) {
            if (!owners.has(r.OwnerId)) owners.set(r.OwnerId, r.OwnerName || r.OwnerId);
        } else {
            hasEmpty = true;
        }
    });
    if (hasEmpty) {
        const optEmpty = document.createElement("option");
        optEmpty.value = "__EMPTY__";
        optEmpty.textContent = "(ค่าว่าง)";
        sel.appendChild(optEmpty);
    }
    Array.from(owners.entries())
        .sort((a, b) => a[1].localeCompare(b[1], 'th-TH'))
        .forEach(([id, name]) => {
            const opt = document.createElement("option");
            opt.value = id;
            opt.textContent = `${name} (${id})`;
            sel.appendChild(opt);
        });
    if (current && Array.from(sel.options).some(o => o.value === current)) {
        sel.value = current;
    } else {
        sel.value = "";
    }
}
function populateStatusFilter() {
    const statusFilter = document.getElementById("statusFilter");
    const current = statusFilter.value;
    statusFilter.innerHTML = '<option value="">ทุกสถานะ</option><option value="ไม่มีสถานะ">ไม่มีสถานะ</option>';
    const statusSet = new Set();
    allData.forEach(r => {
        if (r.Status && r.Status.trim() !== "") statusSet.add(r.Status.trim());
    });
    Array.from(statusSet).sort().forEach(s => {
        const opt = document.createElement("option");
        opt.value = s; opt.textContent = s;
        statusFilter.appendChild(opt);
    });
    if (current && Array.from(statusFilter.options).some(o => o.value === current)) {
        statusFilter.value = current;
    } else {
        statusFilter.value = "";
    }
}
function setDefaultAndCalculate() {
    document.getElementById("statusFilter").value = "";
    document.getElementById("searchInput").value = "";
    document.getElementById("responsibleFilter").value = "";
    mode = "all"; abcFilter = ""; movingFilter = "";
    populateStatusFilter();
    applyFiltersAndRender();
}
document.getElementById("tableHeader").addEventListener("click", e => {
    const col = e.target.closest("th[data-sort]");
    if (!col) return;
    const key = col.getAttribute("data-sort");
    if (sortKey === key) sortDir = sortDir === "asc" ? "desc" : "asc";
    else { sortKey = key; sortDir = "desc"; }
    applyFiltersAndRender();
});
function applyFiltersAndRender() {
    let data = [...allData];

    // 1. กรองเบื้องต้น (ไม่เอารายการที่ไม่เคยเบิกและไม่มีสต็อก)
    data = data.filter(r => !(r.Qty6Month === 0 && r.Unrestricted === 0));

    // 2. ค้นหา Material / Description
    const search = document.getElementById("searchInput").value.toLowerCase();
    if (search) {
        data = data.filter(r =>
            r.Material.toLowerCase().includes(search) ||
            r.Description.toLowerCase().includes(search)
        );
    }

    // 3. กรอง Status
    const statusVal = document.getElementById("statusFilter").value;
    if (statusVal) {
        if (statusVal === "ไม่มีสถานะ") {
            data = data.filter(r => !r.Status || r.Status.trim() === "");
        } else {
            data = data.filter(r => r.Status === statusVal);
        }
    }

    // 4. คำนวณ ROP, Safety, RecommendedOrder ใหม่ทุกครั้ง
    const params = {
        leadTime: parseInt(document.getElementById("leadTimeDays").value) || 5,
        safety: parseInt(document.getElementById("safetyDays").value) || 3,
        cover: parseInt(document.getElementById("coverDays").value) || 40
    };
    recalculateStockFields(data, params);

    // 5. แยกข้อมูลสำหรับคำนวณการ์ด (baseData) และแสดงในตาราง (viewData)
    let baseData = [...data];
    let viewData = [...data];

    // 6. โหมดพิเศษต่าง ๆ
    if (mode === "onlyOrder") {
        viewData = viewData.filter(r => Math.round(r.RecommendedOrder || 0) >= 1);
    }
    else if (mode === "returnable") {
        viewData = viewData.filter(r => (r.ReturnQty || 0) > 0);
    }
    else if (mode === "out_of_stock") {
        viewData = viewData.filter(r =>
            Number(r.Navanakorn || 0) > 0 && Number(r.Unrestricted || 0) === 0
        );
    }
    else if (mode === "out_of_stock_wait") {
        viewData = viewData.filter(r =>
            Number(r.Navanakorn || 0) === 0 && Number(r.Unrestricted || 0) === 0
        );
    }
    // โหมด afterReturn ยังไม่ใช้ในระบบนี้ (ถ้าต้องการเปิดใช้ค่อยเพิ่ม)

    // 7. กรองผู้รับคืน
    populateOwnerFilter(viewData);
    const ownerVal = document.getElementById("responsibleFilter").value;
    if (ownerVal) {
        if (ownerVal === "__EMPTY__") {
            viewData = viewData.filter(r => !r.OwnerId);
            baseData = baseData.filter(r => !r.OwnerId);
        } else {
            viewData = viewData.filter(r => r.OwnerId === ownerVal);
            baseData = baseData.filter(r => r.OwnerId === ownerVal);
        }
    }

    // 8. กรองตาม Option (สั่งจริง < > = แนะนำ, นวนคร =0 ฯลฯ)
    const diffVal = document.getElementById("orderDiffFilter").value;
    if (diffVal) {
        const matchDiff = (r) => {
            const nav = Number(r.Navanakorn || 0);
            const rec = Math.round(r.RecommendedOrder || 0);
            const act = Math.round(r.ActualOrder ?? 0);

            switch (diffVal) {
                case "nav0": return nav === 0;
                case "navgt0": return nav > 0;
                case "less": return act < rec;
                case "more": return act > rec;
                case "equal": return act === rec;
                case "actualgt0": return act > 0;
                default: return true;
            }
        };
        viewData = viewData.filter(matchDiff);
        baseData = baseData.filter(matchDiff);
    }

    // 9. คำนวณ ABC ใหม่ตามโหมด (สำคัญมาก!)
    if (mode === "onlyOrder") {
        calcABCForMode(viewData, "order");
    } else if (mode === "returnable") {
        calcABCForMode(viewData, "return");
    } else {
        // รวมโหมด normal, shortship, shortship_wait → ใช้ Value ปกติ
        calcABCForMode(viewData, "normal");
    }

    // 10. กรอง ABC / Moving เพิ่มเติม (หลังคำนวณ ABC แล้ว)
    if (abcFilter) {
        viewData = viewData.filter(r => r.ABCValue === abcFilter);
    }
    if (movingFilter) {
        viewData = viewData.filter(r => r.Moving === movingFilter);
    }

    // 11. จัดเรียง + แสดงผล
    filteredData = [...viewData];

    filteredData.sort((a, b) => {
        let x = a[sortKey] ?? 0;
        let y = b[sortKey] ?? 0;
        if (typeof x === "string") x = x.toLowerCase();
        if (typeof y === "string") y = y.toLowerCase();
        return sortDir === "asc" ? (x > y ? 1 : -1) : (x < y ? 1 : -1);
    });

    currentPage = 1;
    renderTable();
    renderPagination();
    updateAllCards(baseData, filteredData); // ส่ง baseData (ก่อนกรองโหมด) ไปคำนวณการ์ด Shortship
}
function calcABCForMode(data, modeType) {
    let sorted = [...data];
    // ✅ เลือกตัวเลขที่จะใช้จัดอันดับ + รวมมูลค่า
    const getVal = (r) => {
        if (modeType === "order") {
            return (r.RecommendedOrder || 0) * (r.Unrestricted > 0 ? (r.Value / r.Unrestricted) : 0);
        }
        if (modeType === "return") {
            return (r.ReturnValue || 0);
        }
        // ✅ normal = ใช้ Value จริง
        return (r.Value || 0);
    };
    // ✅ sort ตามค่าที่ใช้จริง
    sorted.sort((a, b) => getVal(b) - getVal(a));
    const total = sorted.reduce((s, r) => s + getVal(r), 0);
    let cum = 0;
    sorted.forEach(r => {
        const val = getVal(r);
        cum += val;
        const pct = total ? (cum / total) * 100 : 0;
        // เขียนกลับไปยัง object ตัวจริงใน data
        const orig = data.find(x => x.Material === r.Material && x.Plant === r.Plant);
        if (orig) {
            orig.CumPercent = pct;
            orig.ABCValue = pct <= 70 ? "A" : pct <= 90 ? "B" : "C";
        }
    });
}
function updateAllCards(baseData, filteredData) {
    const abc = { A: 0, B: 0, C: 0 }, cntABC = { A: 0, B: 0, C: 0 };
    const mov = { Fast: 0, Medium: 0, Slow: 0, Slowly: 0, Dead: 0 },
        cntMov = { Fast: 0, Medium: 0, Slow: 0, Slowly: 0, Dead: 0 };

    // === คำนวณ Shortship & Shortship Wait จาก baseData (ทั้งหมดก่อนกรอง) ===
    let shortshipValue = 0, shortshipCount = 0;
    let shortshipWaitValue = 0, shortshipWaitCount = 0;

    baseData.forEach(r => {
        const nav = Number(r.Navanakorn || 0);
        const stock = Number(r.Unrestricted || 0);
        const value = r.Value || 0;

        if (nav > 0 && stock === 0) {
            shortshipValue += value;
            shortshipCount++;
        } else if (nav === 0 && stock === 0) {
            shortshipWaitValue += value;
            shortshipWaitCount++;
        }
    });

    // อัปเดตการ์ด Shortship
    if (document.getElementById("valOutOfStock")) {
        document.getElementById("valOutOfStock").textContent = formatShortCurrency(shortshipValue);
        document.getElementById("countOutOfStock").textContent = shortshipCount;
    }
    if (document.getElementById("valOutOfStockWait")) {
        document.getElementById("valOutOfStockWait").textContent = formatShortCurrency(shortshipWaitValue);
        document.getElementById("countOutOfStockWait").textContent = shortshipWaitCount;
    }

    // === คำนวณ ABC / Moving จาก filteredData (ข้อมูลที่แสดงจริง) ===
    filteredData.forEach(r => {
        let valueToUse = 0;
        if (mode === "onlyOrder") {
            valueToUse = (r.RecommendedOrder || 0) * (r.Unrestricted > 0 ? r.Value / r.Unrestricted : 0);
        } else if (mode === "returnable") {
            valueToUse = r.ReturnValue || 0;
        } else {
            valueToUse = r.Value || 0;
        }

        if (r.ABCValue && abc.hasOwnProperty(r.ABCValue)) {
            abc[r.ABCValue] += valueToUse;
            cntABC[r.ABCValue]++;
        }
        if (r.Moving && mov.hasOwnProperty(r.Moving)) {
            mov[r.Moving] += valueToUse;
            cntMov[r.Moving]++;
        }
    });

    // อัปเดตการ์ด ABC
    document.getElementById("sumA").textContent = formatShortCurrency(abc.A);
    document.getElementById("sumB").textContent = formatShortCurrency(abc.B);
    document.getElementById("sumC").textContent = formatShortCurrency(abc.C);
    document.getElementById("countA").textContent = cntABC.A + " รายการ";
    document.getElementById("countB").textContent = cntABC.B + " รายการ";
    document.getElementById("countC").textContent = cntABC.C + " รายการ";

    // อัปเดตการ์ด Moving
    document.getElementById("valFast").textContent = formatShortCurrency(mov.Fast);
    document.getElementById("valMedium").textContent = formatShortCurrency(mov.Medium);
    document.getElementById("valSlow").textContent = formatShortCurrency(mov.Slow);
    document.getElementById("valSlowly").textContent = formatShortCurrency(mov.Slowly);
    document.getElementById("valDead").textContent = formatShortCurrency(mov.Dead);
    document.getElementById("countFast").textContent = cntMov.Fast + " รายการ";
    document.getElementById("countMedium").textContent = cntMov.Medium + " รายการ";
    document.getElementById("countSlow").textContent = cntMov.Slow + " รายการ";
    document.getElementById("countSlowly").textContent = cntMov.Slowly + " รายการ";
    document.getElementById("countDead").textContent = cntMov.Dead + " รายการ";

    // === การ์ดหลักบนสุด (มูลค่ารวม, Order, OverStock) ===
    let dataForMainCards;
    if (mode === "onlyOrder") {
        dataForMainCards = baseData.filter(r => Math.round(r.RecommendedOrder || 0) >= 1);
    } else if (mode === "returnable") {
        dataForMainCards = baseData.filter(r => (r.ReturnQty || 0) > 0);
    } else {
        dataForMainCards = baseData; // รวม shortship ทั้ง 2 โหมด
    }

    let totalStock = 0, orderItems = 0, orderValue = 0,
        returnCount = 0, totalReturnValue = 0, totalCount = 0;

    dataForMainCards.forEach(r => {
        totalCount++;
        const unitPrice = r.Unrestricted > 0 ? r.Value / r.Unrestricted : 0;

        if (mode === "onlyOrder") {
            totalStock += (r.RecommendedOrder || 0) * unitPrice;
        } else if (mode === "returnable") {
            totalStock += r.ReturnValue || 0;
        } else {
            totalStock += r.Value || 0;
        }

        const qty = Math.round(r.RecommendedOrder || 0);
        if (qty > 0) {
            orderItems++;
            orderValue += qty * unitPrice;
        }
        if (r.ReturnQty > 0) {
            returnCount++;
            totalReturnValue += r.ReturnValue || 0;
        }
    });

    document.getElementById("totalStockValue").textContent = formatShortCurrency(totalStock);
    document.getElementById("orderTotalValue").textContent = formatShortCurrency(orderValue);
    document.getElementById("totalCount").textContent = totalCount + " รายการ";
    document.getElementById("orderItemCount").textContent = orderItems;
    document.getElementById("returnItemCount").textContent = returnCount + " รายการ";
    document.getElementById("returnValue").textContent = formatShortCurrency(totalReturnValue);

    // === เบิก/เดือน + Stock Days (ใช้ baseData ทั้งหมด) ===
    let total_usage_4m_base = 0, totalStock_base = 0, totalReturnValue_base = 0;
    baseData.forEach(r => {
        totalStock_base += r.Value || 0;
        totalReturnValue_base += r.ReturnValue || 0;
        if (r.Unrestricted > 0) {
            const unit_price = r.Value / r.Unrestricted;
            total_usage_4m_base += (r.Qty4Month || 0) * unit_price;
        }
    });

    const monthly_withdrawal = total_usage_4m_base / 4 || 0;
    const daily_usage = total_usage_4m_base / 120 || 0;
    const stock_days = daily_usage > 0 ? Math.round(totalStock_base / daily_usage) : 'มาก';
    const after_stock_days = daily_usage > 0 ? Math.round((totalStock_base - totalReturnValue_base) / daily_usage) : 'มาก';

    document.getElementById("monthlyWithdrawalValue").textContent = formatShortCurrency(monthly_withdrawal);
    document.getElementById("stockDaysValue").textContent = stock_days > 9999 ? 'มาก' : stock_days;
    document.getElementById("afterStockDaysValue").textContent = after_stock_days > 9999 ? 'มาก' : after_stock_days;
}
function getStatusClass(status) {
    if (!status || status.trim() === '') return "status-other";
    const s = status.toLowerCase();
    if (s.includes('pending') || s.includes('รอดำเนินการ')) return "status-pending";
    if (s.includes('approved') || s.includes('อนุมัติ') || s.includes('approve')) return "status-approved";
    if (s.includes('rejected') || s.includes('ปฏิเสธ') || s.includes('reject')) return "status-rejected";
    if (s.includes('complete') || s.includes('เสร็จสิ้น') || s.includes('completed')) return "status-approved";
    if (s.includes('active') || s.includes('ใช้งาน')) return "status-approved";
    return "status-other";
}
function renderTable() {
    const container = document.getElementById("dataList");
    container.innerHTML = "";
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = filteredData.slice(start, end);
    if (pageData.length === 0) {
        container.innerHTML = `<tr><td colspan="30" style="text-align:center;padding:50px;color:#95a5a6;font-size:16px;">ไม่มีข้อมูลตามเงื่อนไข</td></tr>`;
        return;
    }
    pageData.forEach(r => {
        const orderQty = Math.round(r.RecommendedOrder || 0);
        const actual = Math.round(r.ActualOrder || 0);
        let orderClass;
        if (actual < orderQty) {
            orderClass = "order-less"; // แดง
        } else if (actual > orderQty) {
            orderClass = "order-more"; // น้ำเงิน
        } else {
            orderClass = "order-equal"; // เขียว
        }
        const statusClass = getStatusClass(r.Status);
        const displayStatus = r.Status && r.Status.trim() !== '' ? r.Status : "-";
        const ownerDisplay = r.OwnerName || (r.OwnerId || "-");
        const navClass = (Number(r.Navanakorn || 0) === 0) ? "nava-red" : "nava-orange";
        const navanakornHtml = `<span class="${navClass}">${formatNumber(r.Navanakorn || 0)}</span>`;
        let stockClass = "stock-green";
        if (r.Unrestricted == 0 && r.Moving === "Fast") {
            stockClass = "stock-red";
        }
        const unrestrictedHtml = `
            <span class="${stockClass}">${formatNumber(r.Unrestricted)}</span>
        `;
        const row = document.createElement("tr");
        row.innerHTML = `
    <td></td>
    <td>${r.Plant}</td>
    <td>${r.Material}</td>
    <td>${r.Description}</td>
    <td>${r.StorageBin}</td>
    <td>${navanakornHtml}</td>
    <td>${unrestrictedHtml}</td>
    <td><span class="value">${formatCurrency(r.Value)}</span></td>
    <td>${formatNumber(r.Qty6Month)}</td>
    <td>${formatNumber(r.Qty4Month)}</td>
    <td>${r.AvgMonthly.toLocaleString('th-TH', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</td>
    <td>${formatNumber(r.ThirtyDay)}</td>
    <td>${r.Mean.toLocaleString('th-TH', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</td>
    <td>${formatNumber(r.SafetyStock)}</td>
    <td>${formatNumber(r.ROP)}</td>
    <td>${r.DOS > 9999 ? 'มาก' : r.DOS.toFixed(1)}</td>
   <td>
    <span class="order-span ${orderClass}">
        ${formatNumber(orderQty)}
    </span>
</td>
    <!-- ★ คอลัม “สั่งจริง” -->
   <td>
    <input type="number"
           class="actual-order-input"
           min="0"
           value="${(r.ActualOrder ?? r.RecommendedOrder) ?? ''}"
           style="width:80px;padding:4px 6px;border-radius:6px;border:1px solid #ccd1ff;text-align:right;">
</td>
    <td>${r.Unit}</td>
    <td>${r.Note}</td>
    <td>${formatNumber(r.MultiplyUnit)}</td>
    <td>${r.Product}</td>
    <td><strong>${r.ABCValue}</strong></td>
    <td><span class="moving-${r.Moving.toLowerCase()}">${r.Moving}</span></td>
    <td><span class="return-qty">${formatNumber(r.ReturnQty)}</span></td>
    <td>${r.CumPercent.toFixed(1)}%</td>
    <td class="col-location">${r.Location || ''}</td>
    <td class="col-shelf">${r.Shelf || ''}</td>
    <td class="responsible-cell"><span class="responsible-user">${ownerDisplay}</span></td>
    <td><span class="${statusClass}">${displayStatus}</span></td>
`;
        const actualInput = row.querySelector('input.actual-order-input');
        if (actualInput) {
            actualInput.addEventListener('input', (e) => {
                const v = parseFloat(e.target.value);
                const act = isNaN(v) ? 0 : v;
                r.ActualOrder = act;
                r._actualOrderTouched = true; // ★ บอกว่า user เคยแก้แล้ว
                // ถ้าคุณมี localStorage ตามคำตอบก่อนหน้า
                if (typeof saveActualOrdersToLocalStorage === 'function') {
                    saveActualOrdersToLocalStorage();
                }
                // ★ อัปเดตสีของ "แนะนำสั่ง" ในแถวนี้ทันที
                const rec = Math.round(r.RecommendedOrder || 0);
                const span = row.querySelector('.order-span');
                if (span) {
                    span.classList.remove('order-less', 'order-more', 'order-equal');
                    let cls;
                    if (act < rec) cls = 'order-less';
                    else if (act > rec) cls = 'order-more';
                    else cls = 'order-equal';
                    span.classList.add(cls);
                }
            });
        }
        // ★ ปุ่มตะกร้าในคอลัมน์แรก
        const cartCell = row.cells[0];
        const cartBtn = document.createElement('button');
        cartBtn.className = "icon-btn";
        cartBtn.title = "เพิ่มลงตะกร้า";
        cartBtn.innerHTML = '<i class="fas fa-cart-plus"></i>';
        cartBtn.addEventListener('click', () => {
            addToCart({
                Material: r.Material,
                Description: r.Description,
                StorageBin: r.StorageBin
            });
        });
        cartCell.appendChild(cartBtn);
        container.appendChild(row);
    });
}
function renderPagination() {
  const p = document.getElementById("pagination");
  if (!p) return;              // ✅ กันพัง
  p.style.display = "flex";     // ✅ บังคับให้โชว์

  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  p.innerHTML = "";

  // ✅ ถ้ามีหน้าเดียว จะซ่อนก็ได้ (เลือกใช้)
  // if (totalPages <= 1) { p.style.display = "none"; return; }

  const createBtn = (text, page, disabled = false) => {
    const btn = document.createElement("button");
    btn.className = "page-btn";
    if (page === currentPage) btn.classList.add("active");
    btn.textContent = text;
    btn.disabled = disabled;

    if (!disabled) {
      btn.onclick = () => {
        currentPage = Math.min(totalPages, Math.max(1, page)); // ✅ กันหลุดช่วง
        renderTable();
        renderPagination();
      };
    }
    return btn;
  };

  p.appendChild(createBtn("<<", 1, currentPage === 1));
  p.appendChild(createBtn("<", currentPage - 1, currentPage === 1));
  p.appendChild(createBtn(currentPage, currentPage, true));
  p.appendChild(createBtn(">", currentPage + 1, currentPage === totalPages));
  p.appendChild(createBtn(">>", totalPages, currentPage === totalPages));
}

function getOrderStorageKey() {
    // ถ้าอยากแยกตาม Plant
    return 'abc_actual_orders_' + (selectedPlant || 'ALL');
}
function saveActualOrdersToLocalStorage() {
    const map = {};
    allData.forEach(r => {
        if (r._actualOrderTouched) { // เคยแก้แล้ว
            const key = `${r.Plant}-${r.Material}`;
            map[key] = Number(r.ActualOrder || 0);
        }
    });
    localStorage.setItem(getOrderStorageKey(), JSON.stringify(map));
}
function setActualOrderFromRecommended() {
    if (!Array.isArray(filteredData) || filteredData.length === 0) {
        Swal.fire({
            icon: "warning",
            title: "ไม่มีรายการ",
            text: "ไม่มีข้อมูลในหน้านี้ให้ตั้งค่า",
        });
        return;
    }
    // เฉพาะหน้าปัจจุบัน
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = filteredData.slice(start, end);
    if (pageData.length === 0) {
        Swal.fire({
            icon: "warning",
            title: "ไม่มีรายการ",
            text: "ไม่มีข้อมูลในหน้านี้ให้ตั้งค่า",
        });
        return;
    }
    // 🔔 Popup ยืนยันแบบ SweetAlert2
    Swal.fire({
        title: "ยืนยันการตั้งค่า?",
        text: `ต้องการตั้งค่า "สั่งจริง = แนะนำสั่ง" จำนวน ${pageData.length} รายการในหน้านี้หรือไม่?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
        confirmButtonColor: "#27ae60",
        cancelButtonColor: "#c0392b",
    }).then(result => {
        if (!result.isConfirmed) return;
        // ตั้งค่าจริง
        pageData.forEach(r => {
            r.ActualOrder = Math.round(r.RecommendedOrder || 0);
            r._actualOrderTouched = true;
        });
        saveActualOrdersToLocalStorage();
        const pageBefore = currentPage;
        applyFiltersAndRender();
        currentPage = pageBefore;
        renderTable();
        renderPagination();
        // Popup สำเร็จ
        Swal.fire({
            icon: "success",
            title: "สำเร็จ!",
            text: "ตั้งค่าตามแนะนำสั่งเรียบร้อยแล้ว",
            timer: 1500,
            showConfirmButton: false
        });
    });
}
function loadActualOrdersFromLocalStorage() {
    const txt = localStorage.getItem(getOrderStorageKey());
    if (!txt) return;
    let map;
    try {
        map = JSON.parse(txt) || {};
    } catch (e) {
        console.error('loadActualOrders error', e);
        return;
    }
    allData.forEach(r => {
        const key = `${r.Plant}-${r.Material}`;
        if (map[key] != null) {
            r.ActualOrder = map[key];
            r._actualOrderTouched = true; // เคยแก้แล้ว → อย่าให้ default ทับ
        }
    });
}
function exportToCSV() {
    const headers = [
        "Plant", "Material", "รายการอะไหล่", "Storage bin",
        "หน่วย", "นวนคร", "คงเหลือ", "มูลค่า", "ใช้ 6 เดือน", "ใช้ 4 เดือน",
        "เฉลี่ย/ด.", "30Day", "Mean", "Safety", "ROP", "DOS", "แนะนำสั่งซื้อ",
        "สั่งจริง", // ★ เพิ่ม
        "หมายเหตุ", "คูณหน่วย", "Product", "ABC", "Moving",
        "ส่งคืนได้ (ชิ้น)", "% สะสม",
        "Location", "Shelf", "ผู้รับคืน", "Status"
    ];
    let csv = "\uFEFF" + headers.join(",") + "\n";
    filteredData.forEach(r => {
        const row = [
            r.Plant, r.Material, (r.Description || "").replace(/"/g, '""'), r.StorageBin, r.Unit, r.Navanakorn || 0,
            r.Unrestricted, r.Value, r.Qty6Month, r.Qty4Month,
            r.AvgDailyUse.toFixed(1), r.ThirtyDay, r.Mean.toFixed(1), Math.round(r.SafetyStock), Math.round(r.ROP),
            r.DOS > 9999 ? "มาก" : r.DOS.toFixed(1), Math.round(r.RecommendedOrder),
            r.ActualOrder || 0, // ★ คอลัมสั่งจริง
            r.Note, r.MultiplyUnit, r.Product, r.ABCValue, r.Moving,
            r.ReturnQty, r.CumPercent.toFixed(2),
            r.Location || "", r.Shelf || "", r.OwnerName || r.OwnerId || "", r.Status || ""
        ];
        csv += row.map(v => `"${v}"`).join(",") + "\n";
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `ABC_Analysis_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
}
document.getElementById("cardTotalStock").onclick = () => { mode = "all"; abcFilter = ""; movingFilter = ""; applyFiltersAndRender(); };
document.getElementById("cardOrderItems").onclick = () => { mode = "onlyOrder"; abcFilter = ""; movingFilter = ""; applyFiltersAndRender(); };
document.getElementById("cardReturnValue").onclick = () => { mode = "returnable"; abcFilter = ""; movingFilter = ""; applyFiltersAndRender(); };
document.getElementById("cardOutOfStock").onclick = () => {
    mode = "out_of_stock";
    abcFilter = "";
    movingFilter = "";
    applyFiltersAndRender();
};

document.getElementById("cardOutOfStockWait").onclick = () => {
    mode = "out_of_stock_wait";
    abcFilter = "";
    movingFilter = "";
    applyFiltersAndRender();
};
document.getElementById("abcA").onclick = () => { abcFilter = "A"; movingFilter = ""; applyFiltersAndRender(); };
document.getElementById("abcB").onclick = () => { abcFilter = "B"; movingFilter = ""; applyFiltersAndRender(); };
document.getElementById("abcC").onclick = () => { abcFilter = "C"; movingFilter = ""; applyFiltersAndRender(); };
document.getElementById("cardFast").onclick = () => { movingFilter = "Fast"; abcFilter = ""; applyFiltersAndRender(); };
document.getElementById("cardMedium").onclick = () => { movingFilter = "Medium"; abcFilter = ""; applyFiltersAndRender(); };
document.getElementById("cardSlow").onclick = () => { movingFilter = "Slow"; abcFilter = ""; applyFiltersAndRender(); };
document.getElementById("cardSlowly").onclick = () => { movingFilter = "Slowly"; abcFilter = ""; applyFiltersAndRender(); };
document.getElementById("cardDead").onclick = () => { movingFilter = "Dead"; abcFilter = ""; applyFiltersAndRender(); };
document.getElementById("plantFilter").addEventListener("change", applyFiltersAndRender);
document.getElementById("statusFilter").addEventListener("change", applyFiltersAndRender);
document.getElementById("responsibleFilter").addEventListener("change", applyFiltersAndRender);
["leadTimeDays", "safetyDays", "coverDays", "searchInput"].forEach(id => {
    document.getElementById(id).addEventListener("input", applyFiltersAndRender);
});
document.getElementById("orderDiffFilter").addEventListener("change", applyFiltersAndRender);
document.getElementById("setActualBtn").addEventListener("click", setActualOrderFromRecommended);
document.getElementById("exportBtn").onclick = exportToCSV;
document.addEventListener('click', function (e) {
  const menu = document.getElementById('userMenu');
  const btn = document.getElementById('menuBtn');

  if (!menu || !btn) return;

  // ถ้าเมนูเปิดอยู่ และคลิกนอกเมนู + ปุ่ม
  if (
    menu.style.display === 'block' &&
    !menu.contains(e.target) &&
    !btn.contains(e.target)
  ) {
    menu.style.display = 'none';
  }
});
