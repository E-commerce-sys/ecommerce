import Instagram from "../../assets/icons/Icon-instagram.svg";
import Linkedin from "../../assets/icons/Icon-Linkedin.svg";
import Twitter from "../../assets/icons/Icon-Twitter.svg";


function Employees({ img, name, role, className = "" }) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="w-[250px] h-[270px] relative bg-[rgb(var(--color-grey))] group overflow-hidden rounded-lg flex justify-center items-end">
        <img
          src={img}
          className="h-[95%] w-auto object-contain object-top transition-transform duration-300"
        />
      </div>

      <div className="w-full px-15">
        <p className="font-semibold text-[16px] text-[rgb(var(--color-text-main))]">{name}</p>
        <p className="text-[14px] text-[rgb(var(--color-text-main-3))]">{role}</p>
        <div className="flex gap-4 mt-2">
          <img src={Twitter} className="invert size-[24px]"/>
          <img src={Instagram} className="invert size-[24px]"/>
          <img src={Linkedin} className="invert size-[24px]"/>
        </div>
      </div>
    </div>
  );
}

export default Employees