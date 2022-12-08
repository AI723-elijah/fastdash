import React from 'react';
import { Button } from 'antd';
import ReactExport from 'react-export-excel';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const DownloadExcel = ({ products, selected }) => {
  const dataSource = products.filter(p => selected.indexOf(p.productID) > -1);
  return (
    <ExcelFile element={<Button>Download Products</Button>}>
      <ExcelSheet data={dataSource} name='Products'>
        <ExcelColumn label='Name' value='name'/>
        <ExcelColumn label='Price' value='price'/>
        <ExcelColumn label='SKU' value='sku'/>
        <ExcelColumn label='UPC' value='upc'/>
        <ExcelColumn label='Description' value='description'/>
        <ExcelColumn label='Status' value='status'/>
        <ExcelColumn label='Quantity' value='quantity'/>
      </ExcelSheet>
    </ExcelFile>
  );
}

export default DownloadExcel;
