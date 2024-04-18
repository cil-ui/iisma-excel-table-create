// import axios from 'axios';
import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
const XLSX = require('xlsx')
// const baseUrl = process.env.REACT_APP_BASE_URL;

const Home = () => {
    const [excelData, setExcelData] = useState([]);
    const [fileName,setFileName] = useState(null)
    // const [msg, setMsg] = useState('');
    // const navigate = useNavigate();

    const handleFile = async (e) => {
        // const reader = new FileReader();
        // reader.readAsBinaryString(e.target.files[0])
        // reader.onload = (e) => {
        //     const data = e.target.result;
        //     const workbook = XLSX.read(data, {type: "binary"})
        //     const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        //     const jsonData = XLSX.utils.sheet_to_json(worksheet)
        //     setExcelData(jsonData)
        //     console.log(excelData);
        // }
        const file = e.target.files[0];
        setFileName(file.name);
        // console.log(fileName);
        const data = await file.arrayBuffer();
        var workbook = XLSX.read(data)

        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(worksheet)
        setExcelData(jsonData)
    }

   

  return (
    <div>
        <div className='pl-2'>
            <h1 className='title'>Generate Table</h1>
            <h2 className='subtitle'>Make Template with excel file</h2>
        </div>
        <div className="card is-shadowless">
            {/* <p>{msg}</p> */}
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
                {excelData.length >= 0 && (
                    <div className='table-container'>
                    <table className="table is-bordered is-fullwidth">
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
                                    <ul>
                                      <li rowspan="3">{`1. ${eData.matkul11}`}</li>
                                      <li rowspan="3">{`2. ${eData.matkul12}`}</li>
                                      <li rowspan="3">{`3. ${eData.matkul13}`}</li>
                                      <li rowspan="3">{`4. ${eData.matkul14}`}</li>
                                    </ul>
                                  </td>
                              </tr>
                              
                              <tr>
                                  <td >{`2. ${eData.Univ2}`}</td>
                                  <td >{`2. ${eData.negara2}`}</td>
                                  <td>
                                    <ul>
                                      <li rowspan="3">{`1. ${eData.matkul21}`}</li>
                                      <li rowspan="3">{`2. ${eData.matku22}`}</li>
                                      <li rowspan="3">{`3. ${eData.matku23}`}</li>
                                      <li rowspan="3">{`4. ${eData.matku24}`}</li>
                                    </ul>
                                  </td>
                              </tr>
                              
                              <tr>
                                  <td >{`3. ${eData.Univ3}`}</td>
                                  <td >{`3. ${eData.negara3}`}</td>
                                  <td>
                                    <ul>
                                      <li rowspan="3">{`1. ${eData.matkul31}`}</li>
                                      <li rowspan="3">{`2. ${eData.matkul32}`}</li>
                                      <li rowspan="3">{`3. ${eData.matkul33}`}</li>
                                      <li rowspan="3">{`4. ${eData.matkul34}`}</li>
                                    </ul>
                                  </td>
                              </tr>
                             
                          </tbody>
                          ))}
                        
                    </table>
                </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Home