const path = require('path');

const { createReadStream } = require('fs');
const { readExcelStream } = require('./../utils')
const XLSX = require('xlsx');

const getCatalogs = new Promise((resolve, _) => {
  const catalogsStream = createReadStream(path.join(__dirname, './../data/Catalogos_0412.xlsx'));

  readExcelStream(catalogsStream, (wb) => {
    const catalog = {}

    catalog.origin = mapper(XLSX.utils.sheet_to_json(wb.Sheets['Catálogo ORIGEN']));
    catalog.sector = mapper(XLSX.utils.sheet_to_json(wb.Sheets['Catálogo SECTOR']));
    catalog.sex = mapper(XLSX.utils.sheet_to_json(wb.Sheets['Catálogo SEXO']));
    catalog.typePacient = mapper(XLSX.utils.sheet_to_json(wb.Sheets['Catálogo TIPO_PACIENTE']));
    catalog.yesNo = mapper(XLSX.utils.sheet_to_json(wb.Sheets['Catálogo SI_NO']));
    catalog.nacionality = mapper(XLSX.utils.sheet_to_json(wb.Sheets['Catálogo NACIONALIDAD']));
    catalog.result = mapper(XLSX.utils.sheet_to_json(wb.Sheets['Catálogo RESULTADO']));

    resolve(catalog);
  });
})

const mapper = (list, key = 'CLAVE') => list.reduce((prev, current) => prev.set(current[key], current), new Map())

exports.getCatalogs = getCatalogs;