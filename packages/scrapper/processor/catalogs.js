const {readExcelStream, convertArrayToMap} = require('./../utils')
const {sheet_to_json} = require('xlsx').utils;

const main =  (stream) => {
  return new Promise((resolve, _) => {
    readExcelStream(stream, (wb) => {
      resolve({
        origin: convertArrayToMap(sheet_to_json(wb.Sheets['Catálogo ORIGEN'])),
        sector: convertArrayToMap(sheet_to_json(wb.Sheets['Catálogo SECTOR'])),
        sex: convertArrayToMap(sheet_to_json(wb.Sheets['Catálogo SEXO'])),
        typePacient: convertArrayToMap(sheet_to_json(wb.Sheets['Catálogo TIPO_PACIENTE'])),
        yesNo: convertArrayToMap(sheet_to_json(wb.Sheets['Catálogo SI_NO'])),
        nacionality: convertArrayToMap(sheet_to_json(wb.Sheets['Catálogo NACIONALIDAD'])),
        result: convertArrayToMap(sheet_to_json(wb.Sheets['Catálogo RESULTADO']))
      })
    });
  })
}

exports.main = main;