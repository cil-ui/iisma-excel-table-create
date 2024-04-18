import React, { useState, useRef } from 'react';
const XLSX = require('xlsx')

const Home = () => {
    const [excelData, setExcelData] = useState([]);
    const [fileName,setFileName] = useState(null);
    const tableRef = useRef(null);

    const handleFile = async (e) => {
        const file = e.target.files[0];
        setFileName(file.name);
        const data = await file.arrayBuffer();
        var workbook = XLSX.read(data)
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(worksheet)
        setExcelData(jsonData)
    }

    const copyTableToClipboard = () => {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(tableRef.current);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();
    };

  return (
    <div>
        <div className='pl-2'>
            <h1 className='title'>Generate Table</h1>
            <h2 className='subtitle'>Make Template with excel file</h2>
        </div>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <h3>Parse Excel</h3>
                    
                    <div className="file has-name">
                    <label className="file-label">
                        <input className="file-input" type="file" accept='.xlsx, .xls' onChange={(e) => handleFile(e)}/>
                        <span className="file-cta">
                            <span className="file-label">
                                Choose a file…
                            </span>
                        </span>
                        <span className='file-name'>
                        {fileName && (
                        <p> FileName: <span>{fileName}</span></p>
                        )}
                        </span>
                    </label>
                    </div>
                </div>
                {excelData.length > 0 && (
                    <div className='table-container'>
                    <button className='button is-success mb-2'onClick={copyTableToClipboard}>Copy Table</button>
                    <table ref={tableRef} className="table is-bordered is-fullwidth">
                        <thead>
                          <tr>
                              <th>No</th>
                              <th>Nama Mahasiswa</th>
                              <th>Universitas</th>
                              <th>Negara Tujuan</th>
                              <th>Mata Kuliah</th>
                          </tr>
                        </thead>
                        {excelData.map((eData, index)=>(
                          <tbody>
                          <tr key={index}>
                              <td rowspan="3">{index+1}</td>
                              <td rowspan="3">{eData.Nama}</td>
                              <td>{`1. ${eData.Univ1}`}</td>
                              <td>{`1. ${eData.negara1}`}</td>
                              <td>
                                  {`1. ${eData.matkul11}`}<br/>
                                  {`2. ${eData.matkul12}`}<br/>
                                  {`3. ${eData.matkul13}`}<br/>
                                  {`4. ${eData.matkul14}`}<br/>
                              </td>
                          </tr>
                          
                          <tr>
                              <td>{`2. ${eData.Univ2}`}</td>
                              <td>{`2. ${eData.negara2}`}</td>
                              <td>
                                  {`1. ${eData.matkul21}`}<br/>
                                  {`2. ${eData.matkul22}`}<br/>
                                  {`3. ${eData.matkul23}`}<br/>
                                  {`4. ${eData.matkul24}`}<br/>
                              </td>
                          </tr>
                          
                          <tr>
                              <td>{`3. ${eData.Univ3}`}</td>
                              <td>{`3. ${eData.negara3}`}</td>
                              <td>
                                  {`1. ${eData.matkul31}`}<br/>
                                  {`2. ${eData.matkul32}`}<br/>
                                  {`3. ${eData.matkul33}`}<br/>
                                  {`4. ${eData.matkul34}`}<br/>
                              </td>
                          </tr>
                      </tbody>
                          ))}
                    </table>
                </div>
                )}
                <button className='button is-success is-fullwidth'onClick={copyTableToClipboard}>Copy Table</button>
            </div>
        </div>
    </div>
  )
}

export default Home