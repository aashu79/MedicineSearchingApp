import "./style.css";

const MedicineCard = ({ item }) => {
  const { brandName, genericName, companyName, divisionName, strength } = item;
  return (
    <div class="notification">
      <div class="notiglow"></div>
      <div class="notiborderglow"></div>
      <div class="notititle">
        Brand Name:{" "}
        <span style={{ color: "green", fontWeight: "600" }}>{brandName}</span>
      </div>
      <div class="notibody">
        Available Strength:{" "}
        <span
          style={{ color: "black", fontWeight: "500", whiteSpace: "nowrap" }}
        >
          {strength.map((item) => {
            return item + "/";
          })}
        </span>
      </div>
      <div class="notibody">
        Generic Name:{" "}
        <span style={{ color: "blue", fontWeight: "600" }}>{genericName}</span>
      </div>
      <div class="notibody">
        Division Name:{" "}
        <span style={{ color: "black", fontWeight: "600" }}>
          {divisionName}
        </span>
      </div>
      <div class="notibody">
        Company Name:{" "}
        <span style={{ color: "purple", fontWeight: "600" }}>
          {companyName}
        </span>
      </div>
    </div>
  );
};

export default MedicineCard;
