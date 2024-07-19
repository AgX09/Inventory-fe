import InputQuantity from "./InputQuantity";
import InputText from "./InputText";

export default function ArrivalComp() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 w-full justify-between items-center">
        <div className="">
          <InputText label="Item Name" />
          
        </div>
        <div>
          <InputQuantity label="Quantity"/>
        </div>
      </div>
    </>
  );
}
