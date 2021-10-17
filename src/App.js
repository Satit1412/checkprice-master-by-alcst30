import React, { useState, useEffect, useRef } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "./firebase";
import "./App.css";

function App() {
  const getitem = useRef();
  const [art, setArt] = useState("XXXXXX");
  const [price, setPrice] = useState("XXX");
  const [descr, setDescr] = useState("XXXXXXXX");
  const [datemodified, setDatemodified] = useState(
    "อัปเดตราคาล่าสุด : | xx/x/xxxx | xx:xx:xx |"
  );

  function handleSubmit(e) {
    e.preventDefault();
    const finalitem = convertitem(getitem.current.value);
    console.log(finalitem);
    onValue(
      ref(database, "0/" + finalitem + "/0"),
      (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          setArt(data.art);
          setDescr(data.dscr);
          setPrice(Number(data.price).toLocaleString());
        } else {
          setArt("XXXXXX");
          setDescr("XXXXXXXX");
          setPrice("XXX");
        }
      },
      {
        onlyOnce: true,
      }
    );

    getitem.current.value = "";
  }

  useEffect(() => {
    const getdatemodi = ref(database, "1/datemodified");
    onValue(getdatemodi, (snapshot) => {
      const data = snapshot.val();
      setDatemodified(data);
      if (data != null) {
        setDatemodified("อัปเดตราคาล่าสุด : " + data);
      }
    });
  }, []);

  function convertitem(inputdata) {
    let converttokey = null;
    if (inputdata === undefined) {
      return "";
    } else if (inputdata.length === 13 && inputdata.substring(0, 2) === "25") {
      converttokey = inputdata.substring(6, 12);
    } else if (inputdata.length === 8 && inputdata.substring(0, 1) === "2") {
      converttokey = inputdata.substring(1, 7);
    } else if (
      inputdata.length === 13 &&
      (inputdata.substring(0, 2) === "21" ||
        inputdata.substring(0, 2) === "28" ||
        inputdata.substring(0, 2) === "29")
    ) {
      converttokey = inputdata.substring(0, 6) + "0000000";
    } else {
      converttokey = inputdata;
    }
    if (converttokey.substring(0, 1) === "0" && converttokey.length === 6) {
      return parseInt(converttokey).toString();
    } else {
      return converttokey;
    }
  }

  return (
    <div className="flex">
      <div className="item-descr">
        <span>{descr}</span>
      </div>
      <div className="item-price">
        <span id="lblprice">{price}</span>
        <span className="spanprice">.-</span>
      </div>
      <div className="item-art">
        <span id="lblart">รหัสสินค้า : {art}</span>
        <form className="form" onSubmit={handleSubmit}>
          <input ref={getitem} autoFocus={true} className="maininput"></input>
        </form>
      </div>
      <div className="item-lastupdate">
        <span id="lbllastupdate">{datemodified}</span>
      </div>
    </div>
  );
}

export default App;
