import logo from "../../logo.svg";

export default function Header() {
  return (
    <div className="flex py-4 justify-center items-center gap-2">
      <div className="bg-gray-800 p-1 rounded-full">
        <img src={logo} className="w-8" alt="logo" />
      </div>
      <p className="font-medium">XYZ ENGINE</p>
    </div>
  );
}
