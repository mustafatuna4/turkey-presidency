import "./App.css";
import { useState, useRef, useEffect } from "react";
import turkeyCities from "./cities";
import TurkeyMap from "turkey-map-react";
import React from "react";
import Popup from "reactjs-popup";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";
import PresidentList from "./components/PresidentList";
import { TwitterIcon, TwitterShareButton } from "react-share";
import html2canvas from "html2canvas";
import PresidentVoteList from "./components/PresidentVoteList";
import PartyVotesProgressBar from "./components/PartyVotesProgressBar";
import { RxCross2 } from "react-icons/rx";
import { BsDownload } from "react-icons/bs";
function App() {
  const shareButton = useRef(null);
  const [url, setUrl] = useState();
  let img = "";
  const [openPopup, setOpenPopup] = useState(false);
  const [leader, setLeader] = useState(null);
  const [cities, setCities] = useState(turkeyCities);
  const [plateNo, setPlateNo] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [partyVotes, setPartyVotes] = useState([40, 55, 2, 3]);
  const imageRef = useRef(null);
  const onClick = async () => {
    if (url === undefined) {
      const newUrl = await convertDivToImage();
      setUrl(newUrl);
    }
  };
  useEffect(() => {
    if (url !== undefined) {
      console.log("url baj", url);
      shareButton.current.click();
      setUrl();
    }
  }, [url]);
  const convertDivToImage = async () => {
    const style = document.createElement("style");
    imageRef.current.appendChild(style);
    style.sheet?.insertRule(
      "body > div:last-child img { display: inline-block; }"
    );

    const canvas = await html2canvas(imageRef.current, {
      scrollX: 0,
      scrollY: 0,
      letterRendering: true,
    });
    style.remove();
    console.log(canvas);
    const imgDataUrl = canvas.toDataURL("image/png");
    let temp = dataURItoBlob(imgDataUrl);
    img = imgDataUrl.substring("data:image/png;base64,".length);
    const uid = v4();
    const storageRef = ref(storage, `/${uid}`);
    await uploadBytes(storageRef, temp);

    const imageLink = await getDownloadURL(storageRef);
    console.log(imageLink);
    return imageLink + ".png";
  };

  function dataURItoBlob(dataURI) {
    var byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }
  const handleDownload = async () => {
    const style = document.createElement("style");
    imageRef.current.appendChild(style);
    style.sheet?.insertRule(
      "body > div:last-child img { display: inline-block; }"
    );

    const canvas = await html2canvas(imageRef.current, {
      scrollX: 0,
      scrollY: 0,
      letterRendering: true,
    });
    style.remove();
    await download(canvas);
  };
  const download = function (canvas) {
    const link = document.createElement("a");
    link.download = "seçimtahmin.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const setVotes = (votes) => {
    console.log(votes, "botes baj");
    setPartyVotes(votes);
  };

  const renderCity = (cityComponent, city) => {
    let curCity = cities.find((c) => c.plaka === city.plateNumber);
    cityComponent.props.key = city.id;
    cityComponent.props["party"] = curCity.party;
    return cityComponent;
  };

  const handleClick = (plateNumber) => {
    setOpenPopup(true);
    const clickedCity = cities.find((c) => c.plaka === plateNumber);
    setCityName(clickedCity.il_adi);

    console.log(cityName, "cityName baj");
    console.log(plateNumber, "plateNumber baj");
    setPlateNo((plateNo) => {
      console.log(plateNumber);
      return plateNumber;
    });

    console.log(plateNo, "plateno baj");
  };
  const voteLeader = (value) => {
    const plateNumber = plateNo;
    let citiesTemp = [...cities];
    console.log(cities, "bakk");
    const clickedCity = cities.find((c) => c.plaka === plateNumber);
    const id = cities.findIndex((c) => c.plaka === plateNumber);
    clickedCity.party = value;
    cities[id] = clickedCity;

    console.log(cities[id], "cities[id] baj");
    console.log(leader, "leader baj");
    setCities(citiesTemp);
    console.log(
      cities.find((c) => c.cityId === plateNumber),
      "paryy baj"
    );
    setLeader(null);
  };
  return (
    <div className="App">
      <p>
        Merhaba! Aşağıdaki haritayı veya oy oranlarını değiştirip kendi
        tahmininizi yapabilirsiniz. İndirme butonuna basarak tahmini indirip
        paylaşın!
      </p>
      <TwitterShareButton
        ref={shareButton}
        openShareDialogOnClick={url !== undefined}
        url={`${url}`}
        onClick={onClick}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <BsDownload
        className="cursor--button"
        onClick={handleDownload}
        size={29}
      ></BsDownload>
      <div ref={imageRef}>
        <TurkeyMap
          className="map"
          showTooltip
          cityWrapper={renderCity}
          onClick={({ plateNumber }) => handleClick(plateNumber)}
        ></TurkeyMap>
        <Popup
          open={openPopup}
          position="right center"
          onClose={() => setOpenPopup(false)}
          modal
        >
          {(close) => (
            <div className="popup-container">
              <h2>{cityName}</h2>
              <button
                className="close"
                onClick={() => {
                  setOpenPopup(false);
                  close();
                }}
              >
                <RxCross2 size={20} color="red"></RxCross2>
              </button>
              <PresidentList
                voteLeader={voteLeader}
                setLeader={setLeader}
                setOpenPopup={setOpenPopup}
              ></PresidentList>
            </div>
          )}
        </Popup>
        <PresidentVoteList
          partyVotes={partyVotes}
          setPartyVotes={setVotes}
        ></PresidentVoteList>
        <div>
          <PartyVotesProgressBar props={partyVotes}></PartyVotesProgressBar>
        </div>
      </div>
    </div>
  );
}

export default App;
