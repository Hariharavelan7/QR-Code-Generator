import { useState } from "react"

export const QrCode = () => {
  const [img,setImg] = useState();
  const [loading,setLoading] = useState(false)
  const [qrdata,setqrdata] = useState("")
  const [qrsize,setqrsize] = useState("")

  async function generateQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`
      setImg(url);
    } catch (error) {
      console.log("Error generating QR Code",error);
    }
    finally {
      setLoading(false)
    }
  }

  function downloadQR() {
    fetch(img).then((response)=>response.blob()).then((blob)=>{
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download="qrCode.png";
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }).catch((error)=>{
      console.error("Error downloading QR Code",error)
    })
  }
  return (
    <div className="app-container">
      <h2>QR CODE GENERATOR</h2>

      {img && <img src={img} alt="Please Enter Data" className="pic" />}

      <div className="container">
        <input type="text" id="dataInput" value={qrdata} onChange={(e)=>setqrdata(e.target.value)} required/>

        <label htmlFor="dataInput" className="input-label">Data for QRCode </label>
        <input type="text" id="sizeInput" value={qrsize} onChange={(e)=>setqrsize(e.target.value)} required/>

        <label htmlFor="sizeInput" className="input-label1">Pixels resolutions (example.500) </label>

        <button className="generate-button" disabled={loading} onClick={generateQR}>Generate QR Code</button>
        <button className="download-button" onClick={downloadQR}>Download QR Code</button>
      </div>
    </div>
  )
}
