(function (global) {
    const overrides = global.plantCalculationOverrides || {};

    // ปรับสูตรสำหรับ Plant 0301 ได้ที่ไฟล์นี้โดยไม่ต้องแก้ app.js
    overrides["0301"] = {
        calcABCValue: ({ allData, defaultCalcABCValue }) => defaultCalcABCValue(),
        calculateKeepQty: (row, { defaultCalculateKeepQty }) => defaultCalculateKeepQty(row),
        recalculateStockFields: ({ data, params, plantCode, helpers }) => {
            const { defaultRecalculateStockFields } = helpers;
            return defaultRecalculateStockFields(data, params);
        }
    };

    global.plantCalculationOverrides = overrides;
})(typeof window !== "undefined" ? window : globalThis);
